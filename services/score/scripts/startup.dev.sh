#!/bin/bash

set -e

export FLASK_APP=main.py
export FLASK_DEBUG=1

flask run -p 5000
