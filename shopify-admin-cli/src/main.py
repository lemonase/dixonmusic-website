import shopify
import binascii
import os


def do_shopify():
    # shopify.Session.setup(
    #     api_key=os.environ.get("SHOPIFY_API_KEY"),
    #     secret=os.environ.get("SHOPIFY_SECRET_API_KEY")
    # )

    shop_url = "dixon-music.myshopify.com"
    api_version = "2023-01"
    access_token = os.environ.get("SHOPIFY_ADMIN_ACCESS_TOKEN")

    session = shopify.Session(shop_url, api_version, access_token)
    shopify.ShopifyResource.activate_session(session)

    # shop = shopify.Shop.current()
    # product = shop.find()

    print(shopify.GraphQL().execute("{ shop { name id } }"))


def do_discogs():
    import discogs_client

    d = discogs_client.Client("Inventory Fetcher/0.1", user_token=os.environ.get("DIXONMUSIC_API_TOKEN"))

    results = d.search('Stockholm By Night', type='release')
    breakpoint()


def main():
    from dotenv import load_dotenv
    load_dotenv()
    do_shopify()
    # do_discogs()


main()
