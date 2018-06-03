#!/bin/bash

set -eu

source "$(dirname "$0")/dotenv.sh"

if [ ! -z "$ECR_REGISTRY" ]; then
  eval $(aws ecr get-login --no-include-email --region "$ECR_REGION")
else
  docker login -u="$DOCKER_USER" -p="$DOCKER_PASS"
fi
