import { resolve } from 'path';

export const resolveSource = function (file: string) {
  return resolve(SRC_PATH, file);
};

export const resolveModule = function (file: string) {
  return resolve(NM_PATH, file);
};

export const SRC_PATH = resolve(__dirname, '../src');

export const DIST_PATH = resolve(__dirname, '../dist');

export const NM_PATH = resolve(__dirname, '../node_modules');

export const ASSETS_PATH = resolveSource('assets');

export const MAIN_PATH = resolveSource('main.tsx');

export const MAIN_HOT_PATH = resolveSource('main-hot.tsx');

export const STYLES_PATH = resolveSource('styles/styles.scss');

export const TSCONFIG_PATH = resolve(__dirname, '../tsconfig.json');

export const POSTCSS_CONFIG_PATH = resolve(__dirname, 'postcss.config.js');

export const TEMPLATE_PATH = resolveSource('index.html');

export const TS_CUSTOM_TRANSFORMER_PATH = resolve(__dirname, 'ts-custom-transformer.js');
