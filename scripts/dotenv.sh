#!/bin/bash

set -eu

dotenv="$(echo "$PWD")/.env"

if [ -f $dotenv ]; then
  export $(egrep -v '^#' "$dotenv" | xargs) > /dev/null 2>&1
fi

if [ ! -z "$(echo "$@" | grep -- "--force" || true)" ]; then
  CI_FORCE="YES"
fi

# fix defaults
ECR_REGISTRY="${ECR_REGISTRY:-}"
ECR_REGION="${ECR_REGION:-}"
REPOSITORY="${REPOSITORY:-}"
CI_FORCE="${CI_FORCE:-NO}"

source "$(dirname "$0")/utils.sh"

if [ -z "$REPOSITORY" ]; then
  echo "Missing project name, e.g. \`REPOSITORY=$(basename $PWD)\`"
  echo "Please setup a .env file here in $PWD"
  exit 1
fi

TRAVIS="${TRAVIS:-}"
TRAVIS_BRANCH="${TRAVIS_BRANCH:-$(git branch | grep '^*' | head -1 | tr '*' ' ' | xargs )}"
