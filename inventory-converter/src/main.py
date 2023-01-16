import os
import sys
from pathlib import Path
from pprint import pprint
import json

import requests
import shopify


def fetch_inventory(data_directory,
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
            print(f"fetching: {next_url}")
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


def join_listings_inventory(data_directory):
    all_listings = []
    all_listings_filename = "all_listings.json"

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
        for l in listings:
            title = l["release"]["description"]
            artist = l["release"]["artist"]
            format = l["release"]["format"]

            condition = l["condition"]
            sleeve_condition = l["sleeve_condition"]
            comments = l["comments"]
            price = l["price"]["value"]

            artist_html = f"<b>Artist</b>: {artist}<br>"
            title_html = f"<b>Title</b>: {title}<br>"
            format_html = f"<b>Format</b>: {format}<br><br>"
            condition_html = f"<b>Condition</b>: {condition} <br>"
            sleeve_condition_html = f"<b>Sleeve Condition</b>: {sleeve_condition} <br>"
            comments_html = f"<b>Comments</b>: <p>{comments}</p> <br>"

            description_html = artist_html + title_html + format_html + \
                condition_html + sleeve_condition_html + comments_html

            try:
                image_uri = l["release"]["images"][0]["uri"]
            except:
                image_uri = l["release"]["thumbnail"]
            custom_product_type = l["release"]["format"]

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

    print(f"Executing file: {gql_path}")
    print(f"GraphQL Content:\n {gql_content}")
    print(f"GraphQL Variables: {gql_vars}")
    result = shopify.GraphQL().execute(query=gql_content, variables=gql_vars)
    print()
    print("-"*30)

    print("GraphQL Response:")
    pprint_json(result)
    return result


def do_shopify():
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

    gql_dir = Path('.') / 'src/gql'

    gql_first_three = Path(gql_dir /
                           'queries' /
                           'first_three.gql')

    gql_stage_uploads_create = Path(gql_dir /
                                    'mutations' /
                                    'stage_uploads_create.gql')

    shopify_exec_gql(gql_first_three, {})


def do_discogs():
    import discogs_client

    d = discogs_client.Client("Inventory Fetcher/0.1",
                              user_token=os.environ.get("DIXONMUSIC_API_TOKEN"))

    results = d.search('Stockholm By Night', type='release')
    breakpoint()


def main():
    from dotenv import load_dotenv
    load_dotenv()

    try:
        data_directory = sys.argv[1]
        jsonl_directory = sys.argv[2]
    except:
        print("Please supply 2 arguments.\n")
        print("The first arg is an output directory for all the (JSON) inventory data from Discogs.\n")
        print("The second arg is a filename for the Shopify jsonl bulk file that can be uploaded.\n")
        print("Ex: `python src/main.py ./data/discogs_data/ ./data/gql_data/`")
        sys.exit(1)

    jsonl_filename = os.path.join(jsonl_directory, "gql_product_input.jsonl")

    # remove output file - as we open it in append mode later
    if os.path.isfile(jsonl_filename):
        os.remove(jsonl_filename)

    fetch_inventory(data_directory)
    join_listings_inventory(data_directory)

    data = load_inventory_json(os.path.join(
        data_directory, "all_listings.json"))
    write_shopify_jsonl_file(data["listings"], jsonl_filename)

    # do_shopify()
    # do_discogs()


main()
