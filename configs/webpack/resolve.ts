import { Resolve } from 'webpack';

import { Env } from '../env';
import { SRC_PATH, NM_PATH, resolveModule } from '../paths';

const config: Resolve = {
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  modules: [SRC_PATH, NM_PATH],
  alias: {
    // HACK: https://github.com/ReactTraining/react-router/issues/6203
    'react-router-dom': resolveModule('react-router-dom/umd/react-router-dom.js'),
  },
};

let unsafeCache = true;

export function resolve(env: string): Resolve {
  if (env === Env.Inspect || env === Env.Production) {
    unsafeCache = false;
  }

  return { unsafeCache, ...config }
}
