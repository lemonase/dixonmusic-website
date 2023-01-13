import json
import os
import pathlib
import sys
from pprint import pprint

import requests

from dotenv import load_dotenv
load_dotenv()

# Discogs API docs:
# https://www.discogs.com/developers


def fetch_inventory(data_directory,
                    user_name="dixonmusic",
                    api_token=os.environ.get("DIXONMUSIC_API_TOKEN"),
                    page=1,
                    per_page=100,
                    ):
    api_url = f"https://api.discogs.com/users/{user_name}/inventory"

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
        data = requests.get(next_url).json()
        if next_url is not last_url:
            next_url = data["pagination"]["urls"]["next"]
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
        if file == all_listings_filename:
            break
        with open(os.path.join(data_directory, file), "r") as f:
            data = json.load(f)
            all_listings.append(data["listings"])

    with open(os.path.join(data_directory, all_listings_filename), "w") as f:
        json.dump(all_listings, f)


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


def main():
    # get arguments for script
    try:
        data_directory = sys.argv[1]
        jsonl_filename = sys.argv[2]
    except:
        print("Please supply 2 arguments.\n\nThe first arg is an output directory for all the (JSON) inventory data from Discogs.\n\nThe second arg is a filename for the Shopify jsonl bulk file that can be uploaded.\n\nEx: `python convert_inventory.py ./discogs-api/data/ ./graph-ql/mutations/bulk_create/data/gql_product_input.jsonl`")
        sys.exit(1)

    # remove output file - as we open it in append mode later
    if os.path.isfile(jsonl_filename):
        os.remove(jsonl_filename)

    fetch_inventory(data_directory)
    join_listings_inventory(data_directory)

    # TODO: test this and make work with all_listings file
    # get json data from an inventory file
    # data = load_inventory_json(res_filename)
    # write_shopify_jsonl_file(data["listings"], jsonl_filename)


main()
