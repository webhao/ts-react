import webpack from 'webpack';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

import { Env } from '../env';

interface OptimizationPatch {
  splitChunks: {
    automaticNameDelimiter: string;
  }
}
type Optimization = webpack.Options.Optimization & OptimizationPatch;

const commonConfig: Optimization = {
  namedChunks: true,
  providedExports: true,
  removeAvailableModules: true,
  removeEmptyChunks: true,
  mergeDuplicateChunks: true,
  runtimeChunk: 'single',
  splitChunks: {
    chunks: "async",
    minSize: 30000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    name: true,
    automaticNameDelimiter: '-',
    cacheGroups: {
      vendors: {
        chunks: 'initial',
        test: (module: any, chunks: any[]) => {
          const moduleName = module.nameForCondition ? module.nameForCondition() : '';
          return /[\\/]node_modules[\\/]/.test(moduleName) && !chunks.some(({ name }) => name === 'polyfills');
        },
        priority: -10,
        name: 'vendor',
        reuseExistingChunk: true,
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true,
      },
    }
  },
}

const developmentConfig: Optimization = Object.assign({}, commonConfig, {
  nodeEnv: 'development',
  namedModules: true,
});

const productionConfig: Optimization = Object.assign({}, commonConfig, {
  nodeEnv: 'production',
  noEmitOnErrors: true,
  occurrenceOrder: true,
  concatenateModules: true,
  flagIncludedChunks: true,
  usedExports: true,
  sideEffects: true,
});

export function optimization(env: string) {
  if (env === Env.Development || env === Env.HMR) {
    return developmentConfig;
  }

  if (env === Env.Production) {
    productionConfig.minimize = true;
    productionConfig.minimizer = [
      new UglifyJsPlugin(<webpack.UglifyPluginOptions>{
        sourceMap: false,
        parallel: true,
        cache: true,
        uglifyOptions: {
          ecma: 5,
          safari10: true,
          compress: {
            pure_getters: true,
            pure_funcs: ['console.log', 'console.info'],
            passes: 3,
          },
          output: {
            ascii_only: true,
            comments: false,
            webkit: true,
          },
        },
      }),
    ];
  }

  return productionConfig;
}
