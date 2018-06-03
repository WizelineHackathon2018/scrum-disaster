#!/bin/bash

set -eu

IS_INCLUDED="y"

source "$(dirname "$0")/dotenv.sh"

# This push the images of modified services or all services if core is modified
if [ "$CI_FORCE" != "YES" ]; then
  if [ "$TRAVIS_BRANCH" != "master" ] || [ "$TRAVIS_EVENT_TYPE" == "pull_request" ]; then
    echo "-----> Skipping push images step"
    exit 0
  fi

  echo "-----> Pushing images on ${TRAVIS_BRANCH} ${TRAVIS_EVENT_TYPE}"
fi

source "$(dirname "$0")/get-services.sh"

tag="${TRAVIS_BUILD_ID:-}"
tag="${2:-$tag}"

if [ "$tag" == "latest" ]; then
  tag=""
fi

echo ""
echo "You are attempting to push '${tag:-latest}' as the current version"
echo "for '$REPOSITORY' images, we hope you know what you're doing..."
echo ""

all_services=( ${all_services[@]} )
modified_services=( ${modified_services[@]} )

for service in "${all_services[@]}"; do
  # push only when it's forced or it's marked as modified
  if [ "$CI_FORCE" == "YES" ] || [ "$(utils::contains $service "${modified_services[@]}")" == "$IS_INCLUDED" ]; then
    if ! utils::push_service "$service" "$tag"; then
      exit 1
    fi
  fi
done
