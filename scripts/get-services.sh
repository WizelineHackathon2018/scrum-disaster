#!/bin/bash

set -eu

IS_INCLUDED="y"

source "$(dirname "$0")/dotenv.sh"

GIT_DIFF="origin/master $TRAVIS_BRANCH"

if [ "$TRAVIS_BRANCH" == "master" ]; then
  GIT_DIFF="${TRAVIS_COMMIT_RANGE:-}"

  if [ ! -z "$GIT_DIFF" ]; then
    echo "-----> Setting git diff to commit range '$GIT_DIFF' comparision for push to master "
  fi
else
  echo "-----> Setting git diff to comparision with master vs '${TRAVIS_BRANCH}' "
  if [ "$TRAVIS" == "true" ]; then
    git remote set-branches --add origin master
    git fetch
  fi
fi

all_services=( $(utils::finder services) )
modified_protos=( $(utils::changes "$GIT_DIFF" protos 4) )
modified_services=( $(utils::changes "$GIT_DIFF" services 2) )

if [ -z "${modified_services:-}" ]; then
  modified_services=( ${all_services[@]} )
fi

echo "-----> Services available: ${all_services[@]}"
echo "-----> Services changed: ${modified_services[@]}"
