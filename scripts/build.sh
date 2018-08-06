#!/usr/bin/env bash

export NODE_ENV=$1
export TS_NODE_PROJECT="./configs/tsconfig.webpack.json"

webpack --config configs/webpack.config.ts --hide-modules --progress

if [ $1 == "production" ]
then
  webpack src/polyfills.js --mode=production -o=dist/js/polyfills.min.js
fi

cp -PR src/assets dist
