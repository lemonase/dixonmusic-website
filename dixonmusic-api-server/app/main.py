from typing import Union
import json
import os

from fastapi import FastAPI
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
import requests
from dotenv import load_dotenv

load_dotenv()


def fetch_inventory(userName="dixonmusic",
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


origins = [
    "http://localhost",
    "https://localhost",
    "http://localhost:5173/",
    "http://dixonmusic.net",
    "https://dixonmusic.net",
]

middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=['*'],
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*']
    )
]


app = FastAPI(middleware=middleware)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/inventory/")
async def listings(page: Union[int, None] = 1,
                   per_page: Union[int, None] = 100,
                   ):
    return fetch_inventory(page=page, per_page=per_page)
