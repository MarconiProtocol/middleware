#!/bin/bash

set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd $DIR/..

npm install
"$(npm bin)"/pkg server.js --targets linux-x64 --output middleware
cp node_modules/scrypt/build/Release/scrypt.node .
cp node_modules/sha3/build/Release/sha3.node .
cp node_modules/websocket/build/Release/bufferutil.node .
cp node_modules/websocket/build/Release/validation.node .
