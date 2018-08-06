import { Module, Rule, NewLoader } from 'webpack';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

import { Env } from '../env';
import { NM_PATH, POSTCSS_CONFIG_PATH, STYLES_PATH } from '../paths';

const theme = require('../../src/styles/theme.json');

const sourceMapLoaderRule: Rule = {
  test: /\.js$/,
  enforce: 'pre',
  exclude: NM_PATH,
  loader: 'source-map-loader',
};

const fileLoaderRule: Rule = {
  test: /\.(jpe?g|png|gif|svg)$/,
  loader: 'file-loader',
  options: {
    name: 'images/[name].[ext]',
    publicPath: '',
  },
};

const fontLoaderRule: Rule = {
  test: /\.(eot|ttf|woff|woff2)$/,
  loader: 'file-loader',
  options: {
    name: 'fonts/[name].[ext]',
    publicPath: '../',
  },
};

const urlLoaderRule: Rule = {
  test: /\.(jpe?g|png|gif|svg)$/,
  loader: 'url-loader',
  options: {
    name: 'images/[hash:8].[ext]',
    publicPath: '',
    limit: 10000,
  },
};

const tsLoaderRule: Rule = {
  test: /\.tsx?$/,
  exclude: NM_PATH,
  loader: 'happypack/loader?id=ts',
};

const hotTsLoaderRule: Rule = {
  test: /\.tsx?$/,
  exclude: NM_PATH,
  use: ['react-hot-loader/webpack', 'happypack/loader?id=ts']
};

const styleLoader: Required<NewLoader> = {
  loader: 'style-loader',
  options: { sourceMap: true },
};

const cssLoader: Required<NewLoader> = {
  loader: 'css-loader',
  options: { sourceMap: true },
};

const cssModuleLoader: Required<NewLoader> = {
  loader: 'css-loader',
  options: {
    modules: true,
    camelCase: true,
    sourceMap: true,
    localIdentName: '[hash:base64:5]',
  },
};

const postcssLoader: Required<NewLoader> = {
  loader: 'postcss-loader',
  options: {
    config: { path: POSTCSS_CONFIG_PATH },
  },
};

const lessLoader: Required<NewLoader> = {
  loader: 'less-loader',
  options: {
    sourceMap: true,
    javascriptEnabled: true,
    modifyVars: theme,
  },
};

const sassLoader: Required<NewLoader> = {
  loader: 'sass-loader',
  options: { sourceMap: true },
};

const inlineModuleStyleRule: Rule = {
  test: /\.module.scss$/,
  exclude: [STYLES_PATH],
  use: [styleLoader, cssModuleLoader, sassLoader],
};

const inlineCssRule: Rule = {
  test: /\.css$/,
  use: [styleLoader, cssLoader],
};

const inlineLessRule: Rule = {
  test: /\.less$/,
  use: [styleLoader, cssLoader, lessLoader],
};

const inlineScssRule: Rule = {
  test: /\.scss$/,
  include: [STYLES_PATH],
  use: [styleLoader, cssLoader, sassLoader],
};

const extractCssRule: Rule = {
  test: /\.css$/,
  use: [MiniCssExtractPlugin.loader, cssLoader],
};

const extractLessRule: Rule = {
  test: /\.less$/,
  use: [MiniCssExtractPlugin.loader, cssLoader, lessLoader],
}

const extractScssRule: Rule = {
  test: /\.scss/,
  include: [STYLES_PATH],
  use: [MiniCssExtractPlugin.loader, cssLoader, sassLoader],
}

const devRules: Rule[] = [
  sourceMapLoaderRule,
  fontLoaderRule,
  fileLoaderRule,
  inlineModuleStyleRule,
  inlineCssRule,
  inlineLessRule,
  inlineScssRule,
];

const prodRules: Rule[] = [
  sourceMapLoaderRule,
  fontLoaderRule,
  urlLoaderRule,
  tsLoaderRule,
  inlineModuleStyleRule,
  extractCssRule,
  extractLessRule,
  extractScssRule,
];

export function module(env: string): Module {
  let rules: Rule[];

  if (env === Env.HMR) {
    rules = devRules.concat(hotTsLoaderRule);
  } else if (env === Env.Development) {
    rules = devRules.concat(tsLoaderRule);
  } else if (env === Env.Inspect) {
    rules = prodRules;
  } else {
    [styleLoader, cssLoader, cssModuleLoader, lessLoader, sassLoader].forEach(item => {
      item.options.sourceMap = false;
      if (item.loader === 'css-loader') {
        item.options.importLoaders = 1;
      }
    });

    [inlineModuleStyleRule, extractCssRule, extractLessRule, extractScssRule].forEach(item => {
      if (!Array.isArray(item.use)) {
        return;
      }
      item.use.splice(2, 0, postcssLoader);
    });

    rules = prodRules;
  }

  return { rules };
}
