#!/bin/bash

set -e

export FLASK_APP=main.py

flask run -p 5000
