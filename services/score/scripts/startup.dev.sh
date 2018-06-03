#!/bin/bash

set -e

export FLASK_DEBUG=1
export FLASK_DEV=development

flask run -p 5000 --host=0.0.0.0
