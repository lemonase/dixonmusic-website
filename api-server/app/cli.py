import json
import os
from pprint import pprint

import requests

# Discogs API docs:
# https://www.discogs.com/developers

from dotenv import load_dotenv

load_dotenv()


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
    return data


def load_inventory(json_path):
    with open(json_path, "r") as f:
        d = json.load(f)
        return d


d = load_inventory("./res.json")
listings = d["listings"]
