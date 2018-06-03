#!/bin/bash

set -e

if [ ! -z "${INTERACTIVE:-}" ]; then
  echo ""
  echo "Welcome to the interactive mode, please run \`npm run dev\`"
  echo "or whatever you want to debug this service. Enjoy your time!"
  echo ""

  tail -f /dev/null
else
  npm run dev
fi
