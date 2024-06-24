#!/bin/bash
echo "FRONT 빌드"
DOCKER_BUILDKIT=1 docker build --build-arg "API_URL=${API_URL}" -f builder/Dockerfile -t $DOCKER_IMAGE:$DOCKER_IMAGE_TAG  --progress=plain .