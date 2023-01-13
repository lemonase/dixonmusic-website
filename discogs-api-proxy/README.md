# Backend API Server for DixonMusic

The main purpose of this API is to act as a proxy for the [Discogs API](https://www.discogs.com/developers).

Eventually, I want to implement some caching mechanisms so that the client (Web Browser)
does not have to fetch directly from the discogs API on every single page load.

## Deploying

Building docker image:

```sh
docker build -t discogs-api-proxy .
```

Running docker image

```sh
docker run -d -p 8033:8033 discogs-api-proxy 
```
