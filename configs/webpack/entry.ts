import { Configuration } from 'webpack';

import { Env } from '../env';
import { MAIN_PATH, MAIN_HOT_PATH } from '../paths';

type Entry = Configuration['entry'];

const config: Entry = {
  main: MAIN_PATH,
};

const hmrConfig: Entry = [
  'react-hot-loader/patch',
  MAIN_HOT_PATH,
];

export function entry(env: string): Entry {
  if (env === Env.HMR) {
    return hmrConfig;
  }

  return config;
}
