#!/bin/bash
echo "FRONT 빌드"
DOCKER_BUILDKIT=1 docker build --build-arg "API_URL=${API_URL}" --build-arg "AES_SECRET_KEY=${AES_SECRET_KEY}" -f builder/Dockerfile -t $DOCKER_IMAGE:$DOCKER_IMAGE_TAG  --progress=plain .