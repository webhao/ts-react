import webpack from 'webpack';

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

import { Env, Config } from '../env';
import { TSCONFIG_PATH, TEMPLATE_PATH, TS_CUSTOM_TRANSFORMER_PATH } from '../paths';

const commonPlugins: webpack.Plugin[] = [
  new CleanWebpackPlugin(['dist'], { root: process.cwd() }),
  new HappyPack({
    id: 'ts',
    threads: 2,
    loaders: [{
      loader: 'ts-loader',
      options: {
        configFile: TSCONFIG_PATH,
        happyPackMode: true,
        getCustomTransformers: TS_CUSTOM_TRANSFORMER_PATH,
      },
    }],
  }),
  new ForkTsCheckerWebpackPlugin({
    tsconfig: TSCONFIG_PATH,
    checkSyntacticErrors: true,
  }),
];

const developmentPlugins: webpack.Plugin[] = [
  new MiniCssExtractPlugin({
    filename: 'css/[name].css',
  }),
  new HtmlWebpackPlugin({
    template: TEMPLATE_PATH,
    templateParameters: { publicPath: Config.devPublicPath },
  }),
  new webpack.DefinePlugin({
    API_URL: JSON.stringify(Config.devApiUrl),
    PUBLIC_PATH: JSON.stringify(Config.devPublicPath),
  }),
];

const productionPlugins: webpack.Plugin[] = [
  new webpack.HashedModuleIdsPlugin(),
  new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash:8].css'
  }),
  new HtmlWebpackPlugin({
    template: TEMPLATE_PATH,
    templateParameters: { publicPath: Config.prodPublicPath },
    chunksSortMode: 'manual',
    chunks: ['runtime', 'polyfills', 'vendor', 'main'],
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  }),
  new ScriptExtHtmlWebpackPlugin({
    inline: ['runtime'],
  }),
  new webpack.DefinePlugin({
    API_URL: JSON.stringify(Config.prodApiUrl),
    PUBLIC_PATH: JSON.stringify(Config.prodPublicPath),
  }),
];

export function plugins(env: string) {
  if (env === Env.Production) {
    return commonPlugins.concat(productionPlugins);
  }

  if (env === Env.HMR) {
    commonPlugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return commonPlugins.concat(developmentPlugins);
}
