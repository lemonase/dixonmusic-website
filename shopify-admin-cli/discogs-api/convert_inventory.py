import json
import os
import sys
from pprint import pprint

import requests

# Discogs API docs:
# https://www.discogs.com/developers

from dotenv import load_dotenv
load_dotenv()


try:
    res_filename = sys.argv[1]
    jsonl_filename = sys.argv[2]
except:
    print("Please supply 2 filenames as argument. Ex: `python convert_inventory.py res.json res.jsonl`")
    sys.exit(1)


def fetch_inventory(user_name="dixonmusic",
                    api_token=os.environ.get("DIXONMUSIC_API_TOKEN"),
                    page=1,
                    per_page=100
                    ):
    api_url = f"https://api.discogs.com/users/{user_name}/inventory"

    query_params = {
        "token": api_token,
        "page": page,
        "per_page": per_page
    }
    res = requests.get(api_url, params=query_params)
    data = res.json()
    with open(res_filename, "w") as f:
        f.write(json.dumps(data))

    return data


def load_inventory(json_path):
    with open(json_path, "r") as f:
        d = json.load(f)
        return d


def write_jsonl_file(listings, filename):
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

            description_html = artist_html + title_html + format_html + condition_html + sleeve_condition_html + comments_html

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
    if not os.path.isfile(res_filename):
        fetch_inventory()


    data = load_inventory(res_filename)
    write_jsonl_file(data["listings"], jsonl_filename)


main()
