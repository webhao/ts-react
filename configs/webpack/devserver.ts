import { Configuration } from 'webpack-dev-server';

import { Env } from '../env';
import { ASSETS_PATH } from '../paths';

const config: Configuration = {
  contentBase: [ASSETS_PATH],
  watchContentBase: true,
  historyApiFallback: true,
  hot: false,
};

export function devServer(env: string) {
  if (env === Env.Production || env === Env.Inspect) {
    return;
  }

  if (env === Env.HMR) {
    config.hot = true;
  }

  return {
    devServer: config,
    cache: true,
    watch: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  };
}
