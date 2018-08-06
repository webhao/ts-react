import {
  entry,
  output,
  resolve,
  module,
  devtool,
  devServer,
  plugins,
  optimization,
} from './webpack';

if (!process.env.NODE_ENV) {
  throw new Error('Please specify the node env first!');
}

const env = process.env.NODE_ENV;

const config = {
  mode: 'none',
  entry: entry(env),
  output: output(env),
  resolve: resolve(env),
  module: module(env),
  devtool: devtool(env),
  plugins: plugins(env),
  optimization: optimization(env),
  ...devServer(env),
};

export default config;
