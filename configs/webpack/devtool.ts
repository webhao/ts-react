import { Options } from 'webpack';

import { Env } from '../env';

export function devtool(env: string): Options.Devtool {
  if (env === Env.Development || env === Env.HMR) {
    return 'cheap-module-eval-source-map';
  } else if (env === Env.Production) {
    return false;
  } else {
    return 'source-map';
  }
}
