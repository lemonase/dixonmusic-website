# import discogs_client
import json
from pprint import pprint
import os

import requests
from dotenv import load_dotenv

load_dotenv()


def get_inventory(userName="dixonmusic",
                  apiToken=os.environ.get("DIXONMUSIC_API_TOKEN"),
                  page=1,
                  per_page=100
                  ):
    api_url = f"https://api.discogs.com/users/{userName}/inventory"

    query_params = {
        "token": os.environ.get("DIXONMUSIC_API_TOKEN"),
        "page": page,
        "per_page": per_page
    }
    res = requests.get(api_url, params=query_params)
    data = res.json()
    return data


def get_primary_image(images):
    if images is None:
        return None
    for image in images:
        if image.get("type") == "primary":
            return image

    return images[0]
