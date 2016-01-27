#!/bin/bash
# fail fast
set -e
set -o pipefail

npm install
curl -o ./lib/primus.js https://njslimaster-ckirmaster.rhcloud.com/primus/primus.js
