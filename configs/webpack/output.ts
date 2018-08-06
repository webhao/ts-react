import { Output } from 'webpack';

import { Env } from '../env';
import { DIST_PATH } from '../paths';

const config: Output = {
  path: DIST_PATH,
  pathinfo: true,
  filename: 'js/[name].js',
  chunkFilename: 'js/[name].js',
};

export function output(env: string, publicPath: string = '') {
  config.publicPath = publicPath;

  if (env === Env.Production) {
    config.pathinfo = false;
    config.filename = 'js/[name].[chunkhash:8].js';
    config.chunkFilename = 'js/[name].[chunkhash:8].js';
  }

  return config;
}
