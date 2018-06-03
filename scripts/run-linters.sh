#!/bin/bash

set -e

if [ -z "$(which eclint || true)" ] || [ -z "$(which eslint || true)" ]; then
  yarn global add eclint eslint
fi

echo "-----> EditorConfig... "

# lint known files
eclint "**/*.{js,css,yml}"

echo "-----> ESLint... "

# lint javascript files
eslint "**/*.js"

echo "-----> All good!"
