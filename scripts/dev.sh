#!/usr/bin/env bash

export NODE_ENV=$1
export TS_NODE_PROJECT="./configs/tsconfig.webpack.json"

webpack-dev-server --open --config configs/webpack.config.ts
