#!/bin/bash

set -u

utils::finder() {
  echo "$(find "$1" -maxdepth 1 -type d | awk -F'/' '{print $2}' | sort -u)"
}

utils::changes() {
  echo "$(
    git diff $1 --name-only -- |                            # Get commits diff to check changed services
    grep -E -i -w "($2\/)\w+" |                             # Get only given paths
    awk -F'/' "!(\$$3 in seen){seen[\$$3]++; print \$$3}" | # Extract service names
    sort -u | xargs                                         # Normalize output
  )"
}

utils::banner() {
  msg="# $* #"
  edge=$(echo "$msg" | sed 's/./#/g')
  echo "$edge"
  echo "$msg"
  echo "$edge"
}

utils::label() {
  utils::banner $(echo "$1" | awk '{print toupper($0)}')
  echo ""
}

utils::contains() {
  local e
  for e in "${@:2}"; do [[ "$e" == "$1" ]] && echo "y" && return 0; done
  echo "n"
  return 1
}

utils::run_tests() {
  service=$1

  [ "$service" == "core" ] && return

  echo ""
  utils::label "test $service"

  if [[ ! -z "$(which travis_wait || exit 1)" ]]; then
    travis_wait bash -c "make test service=${service} REMOVE_LOG=1"
  else
    bash -c "make test service=${service} REMOVE_LOG=1"
  fi
}

# How tagging works?
#
# $1 - any service, e.g. user
# $2 - release tag, e.g. latest
# $3 - enable remote --sync with
#
# When ECR_REGISTRY is given it'll be used to pull/push, if --sync is given
# both repositories gets inverted, so the tag is made from REMOTE to LOCAL

utils::tag_image() {
  if [ "${3:-}" == "--sync" ] && [ ! -z "$ECR_REGISTRY" ]; then
    docker tag "$ECR_REGISTRY/$REPOSITORY-$1:$2" "$REPOSITORY/$1:$2"
  else
    if [ ! -z "$ECR_REGISTRY" ]; then
      docker tag "$REPOSITORY/$1" "$ECR_REGISTRY/$REPOSITORY-$1:$2"
    else
      docker tag "$REPOSITORY/$1" "$1:$2"
    fi
  fi
}

utils::pull_image() {
  if [ ! -z "$ECR_REGISTRY" ]; then
    docker pull "$ECR_REGISTRY/$REPOSITORY-$1"
  else
    docker pull "$REPOSITORY/$1"
  fi
}

utils::push_image() {
  if [ ! -z "$ECR_REGISTRY" ]; then
    docker push "$ECR_REGISTRY/$REPOSITORY-$1"
  else
    docker push "$REPOSITORY/$1"
  fi
}

utils::push_service() {
  utils::tag_image $1 latest
  utils::push_image "$1:latest"

  if [ ! -z "$2" ]; then
    utils::tag_image $1 $2
    utils::push_image "$1:$2"
  fi
}
