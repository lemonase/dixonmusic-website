## dixonmusic.net frontend

This project is created with [Vite](https://vitejs.dev/) and written with [React](https://reactjs.org/)

### Running dev server locally

To run dev server locally, run the following:

To install dependencies:

```sh
npm install
```

To run dev server (vite):

```sh
npm run dev
```

### Running dev server inside docker

Using docker images/container:

Build docker container

```sh
docker image build --file Dockerfile.dev --tag dixonmusic-frontend:dev .
```

Run docker container with bind mounts to the current directory (excluding `node_modules`)

```sh
docker container run --rm -p 5173:5173 -v ${PWD}:/home/node/app -v /home/node/app/node_modules dixonmusic-frontend:dev
```

### Running prod server inside docker

To build the production image run:

```sh
docker image build --file Dockerfile --tag dixonmusic-frontend:prod .
```

To get the `dist` folder on the host run:

```sh
docker cp $(docker run -d dixonmusic-frontend:prod):/usr/share/nginx/html dist/
```


To run the production (nginx) container run:

```sh
docker run -p 8080:80 dixonmusic-frontend:prod
```

