import os
import sys
from pathlib import Path
from pprint import pprint
import json

import requests
import shopify


def fetch_discogs_inventory(data_directory,
                            user_name="dixonmusic",
                            api_token=os.environ.get("DIXONMUSIC_API_TOKEN"),
                            page=1,
                            per_page=100,
                            ):
    api_url = f"https://api.discogs.com/users/{user_name}/inventory"

    if not os.path.isfile(os.path.join(data_directory, "1_res.json")):
        # make first request to get pagination data
        query_params = {
            "token": api_token,
            "page": page,
            "per_page": per_page
        }
        data = requests.get(api_url, params=query_params).json()
        next_url = data["pagination"]["urls"]["next"]
        cur_page = data["pagination"]["page"]
        last_url = data["pagination"]["urls"]["last"]

        # write out json pages to files
        while write_inventory_file(data_directory, cur_page, data):
            # print(f"fetching: {next_url}")
            data = requests.get(next_url).json()
            if next_url is not last_url:
                try:
                    next_url = data["pagination"]["urls"]["next"]
                except KeyError as e:
                    break
                cur_page = data["pagination"]["page"]

        # write out last page
        data = requests.get(last_url).json()
        cur_page = data["pagination"]["page"]
        write_inventory_file(data_directory, cur_page, data)


def write_inventory_file(data_directory, cur_page, data):
    if not os.path.isdir(data_directory):
        os.makedirs(data_directory)

    output_file = os.path.join(
        data_directory, str(cur_page) + "_" + "res.json")
    # file exists - exit
    if os.path.isfile(output_file):
        return False
    else:
        with open(output_file, "w") as f:
            f.write(json.dumps(data))
        return True


def load_inventory_json(json_path):
    with open(json_path, "r") as f:
        d = json.load(f)
        return d


def join_discogs_listings(data_directory, all_listings_filename):
    all_listings = []

    if os.path.isfile(os.path.join(data_directory, all_listings_filename)):
        return

    for file in sorted(os.listdir(data_directory)):
        # print(f"joining {file}")
        if file == all_listings_filename:
            break
        with open(os.path.join(data_directory, file), "r") as f:
            data = json.load(f)
            all_listings.extend(data["listings"])

    output_json = {
        "listings": all_listings
    }

    with open(os.path.join(data_directory, all_listings_filename), "w") as f:
        json.dump(output_json, f)


def write_shopify_jsonl_file(listings, filename):
    with open(filename, "a") as f:
        for listing in listings:
            title = listing["release"]["description"]
            artist = listing["release"]["artist"]
            format = listing["release"]["format"]

            condition = listing["condition"]
            sleeve_condition = listing["sleeve_condition"]
            comments = listing["comments"]
            price = listing["price"]["value"]

            artist_html = f"<b>Artist</b>: {artist}<br>"
            title_html = f"<b>Title</b>: {title}<br>"
            format_html = f"<b>Format</b>: {format}<br><br>"
            condition_html = f"<b>Condition</b>: {condition} <br>"
            sleeve_condition_html = f"<b>Sleeve Condition</b>: {sleeve_condition} <br>"
            comments_html = f"<b>Comments</b>: <p>{comments}</p> <br>"

            description_html = artist_html + title_html + format_html + \
                condition_html + sleeve_condition_html + comments_html

            try:
                image_uri = listing["release"]["images"][0]["uri"]
            except:
                image_uri = listing["release"]["thumbnail"]
            custom_product_type = listing["release"]["format"]

            listing_obj = {
                "input": {
                    "title": title,
                    "descriptionHtml": description_html,
                    "customProductType": custom_product_type,
                    "images": [{"altText": title, "src": image_uri}],
                    "variants": {
                        "price": price
                    }
                }
            }

            f.write(json.dumps(listing_obj) + "\n")


def pprint_json(json_input):
    print(json.dumps(json.loads(json_input), indent=2))


def shopify_exec_gql(gql_path, gql_vars):
    gql_content = gql_path.read_text()
    return shopify.GraphQL().execute(query=gql_content, variables=gql_vars)


def post_shopify_jsonl_data_and_run_mutate(gql_res, jsonl_filename):
    data = json.loads(gql_res)
    staged_data = data["data"]["stagedUploadsCreate"]["stagedTargets"][0]
    stage_url = staged_data["url"]
    stage_params = staged_data["parameters"]

    post_params = {}
    for i in stage_params:
        post_params[i["name"]] = (None, i["value"])
    post_params["file"] = open(jsonl_filename, 'rb')

    # files = {
    #     'key': (None, post_params["key"]),
    #     'x-goog-credential': (None, post_params['x-goog-credential']),
    #     'x-goog-algorithm': (None, post_params['x-goog-algorithm']),
    #     'x-goog-date': (None, post_params['x-goog-date']),
    #     'x-goog-signature': (None, post_params['x-goog-signature']),
    #     'policy': (None, post_params['policy']),
    #     'acl': (None, post_params['acl']),
    #     'Content-Type': (None, post_params['Content-Type']),
    #     'success_action_status': (None, post_params['success_action_status']),
    #     'file': open(jsonl_filename, 'rb'),
    # }

    res = requests.post(stage_url, files=files, headers={'User-Agent': 'curl/7.81.0'})

    
    bulk_mut_vars = {
        "mutation": "mutation call($input: ProductInput!) { productCreate(input: $input) { product {id title variants(first: 10) {edges {node {id title inventoryQuantity }}}} userErrors { message field } } }",
        "stagedUploadPath": post_params["key"],
    }
    shopify_bulk_mutation(gql_vars=bulk_mut_vars)


def create_shopify_staged_upload_and_post(jsonl_filename):
    gql_dir = Path('.') / 'src' / 'gql'
    gql_stage_uploads_create = gql_dir / 'mutations' / 'stage_uploads_create.gql'
    gql_res = shopify_exec_gql(gql_stage_uploads_create, {})
    print("Stage Post - Pre Mutate")
    pprint_json(gql_res)
    print("-"*20)
    post_shopify_jsonl_data_and_run_mutate(gql_res, jsonl_filename)


def shopify_bulk_mutation(gql_vars={}):
    gql_dir = Path('.') / 'src' / 'gql'
    gql_bulk_op_mut = gql_dir / 'mutations' / 'bulk_op_run_mutation.gql'
    return shopify_exec_gql(gql_bulk_op_mut, gql_vars)


def shopify_get_first_three():
    gql_dir = Path('.') / 'src' / 'gql'
    gql_first_three = Path(gql_dir / 'queries' / 'first_three.gql')
    return shopify_exec_gql(gql_first_three, {})


def shopify_check_bulk_op_count():
    gql_dir = Path('.') / 'src' / 'gql'
    gql = Path(gql_dir / 'queries' / 'check_bulk_op_count.gql')
    return shopify_exec_gql(gql, {})


def shopify_check_bulk_op_status():
    gql_dir = Path('.') / 'src' / 'gql'
    gql = Path(gql_dir / 'queries' / 'check_bulk_op_status.gql')
    return shopify_exec_gql(gql, {})


def do_shopify_setup():
    # shopify.Session.setup(
    #     api_key=os.environ.get("SHOPIFY_API_KEY"),
    #     secret=os.environ.get("SHOPIFY_SECRET_API_KEY")
    # )

    # shopify API setup
    shop_url = "dixon-music.myshopify.com"
    api_version = "2023-01"
    access_token = os.environ.get("SHOPIFY_ADMIN_ACCESS_TOKEN")
    session = shopify.Session(shop_url, api_version, access_token)
    shopify.ShopifyResource.activate_session(session)


def do_discogs_setup():
    import discogs_client
    d = discogs_client.Client("Inventory Fetcher/0.1",
                              user_token=os.environ.get("DIXONMUSIC_API_TOKEN"))
    results = d.search('Stockholm By Night', type='release')


def main():
    from dotenv import load_dotenv
    load_dotenv()

    try:
        data_directory = sys.argv[1]
        gql_directory = sys.argv[2]
    except:
        print("Please supply 2 arguments.\n")
        print("The first arg is an output directory for all the (JSON) inventory data from Discogs.\n")
        print("The second arg is a filename for the Shopify jsonl bulk file that can be uploaded.\n")
        print("Ex: `python src/main.py ./data/discogs_data/ ./data/gql_data/`")
        sys.exit(1)

    # do_shopify()
    # do_discogs()
    do_shopify_setup()

    jsonl_inventory = os.path.join(gql_directory, "gql_product_input.jsonl")

    # remove output file - as we open it in append mode later
    if os.path.isfile(jsonl_inventory):
        os.remove(jsonl_inventory)

    fetch_discogs_inventory(data_directory)
    join_discogs_listings(data_directory, "all_listings.json")
    all_inventory_json = load_inventory_json(
        os.path.join(data_directory, "all_listings.json"))
    write_shopify_jsonl_file(all_inventory_json["listings"], jsonl_inventory)

    create_shopify_staged_upload_and_post(jsonl_inventory)

    # pprint_json(shopify_get_first_three())

    # pprint_json(shopify_check_bulk_op_count())
    # pprint_json(shopify_check_bulk_op_status())


main()
