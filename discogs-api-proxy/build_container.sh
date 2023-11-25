#!/bin/bash

docker stop -t 1 dixonmusic-api

docker rm dixonmusic-api

docker build -t dixonmusic-api .

docker run -d -p 8033:8033 --name dixonmusic-api dixonmusic-api
