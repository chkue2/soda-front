#!/bin/bash


API_URL="https://pro-api.dev.priros.com" DOCKER_IMAGE=lawtalksoda DOCKER_IMAGE_TAG=latest ./build.sh
docker rmi -f $(docker images -f "dangling=true" -q) || true