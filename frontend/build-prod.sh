# build prod nginx Dockerfile and copy out the vite build files
docker image build --file Dockerfile --tag dixonmusic-frontend:prod .
CID=$(docker run --rm -d dixonmusic-frontend:prod)
docker cp $CID:/usr/share/nginx/html dist/ && docker stop $CID
