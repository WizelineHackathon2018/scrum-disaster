#!/bin/bash

set -eu

IS_INCLUDED="y"

source "$(dirname "$0")/get-services.sh"

all_services=( ${all_services[@]} )
modified_services=( ${modified_services[@]} )

for service in "${all_services[@]}"; do
  # build only when it's forced or it's marked as modified
  if [ "$CI_FORCE" == "YES" ] || [ "$(utils::contains $service "${modified_services[@]}")" == "$IS_INCLUDED" ]; then
    echo ""
    utils::label "build $service"
    if ! make build service="$service"; then
      exit 1
    fi
  else
    echo ""
    utils::label "pull $service"
    if ! utils::pull_image "$service:latest"; then
      exit 1
    else
      utils::tag_image "$service" latest --sync
    fi
  fi
done
