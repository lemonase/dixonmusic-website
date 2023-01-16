import binascii
import os
from pathlib import Path
from pprint import pprint
import json

import requests
import shopify


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
    do_shopify()
    # do_discogs()


main()
