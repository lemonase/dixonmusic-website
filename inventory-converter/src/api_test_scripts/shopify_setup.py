import shopify
import os
from dotenv import load_dotenv
load_dotenv()


# shopify API setup
shop_url = "dixon-music.myshopify.com"
api_version = "2023-01"
access_token = os.environ.get("SHOPIFY_ADMIN_ACCESS_TOKEN")
session = shopify.Session(shop_url, api_version, access_token)
shopify.ShopifyResource.activate_session(session)

# Get the current shop
shop = shopify.Shop.current()

# get first product
product_1 = shopify.Product.find_first()

# get pages
page1 = shopify.Product.find()
if page1.has_next_page():
    page2 = page1.next_page()
