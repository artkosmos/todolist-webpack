import path from 'path';
import type { Mode } from './types';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { type Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

require('dotenv').config();

interface envVariables {
  analyzer: boolean;
}

export default (env: envVariables) => {
  const isAnalyzerEnabled = env.analyzer;

  const config: Configuration & DevServerConfiguration = {
    mode: process.env.MODE as Mode,
    entry: {
      index: './src/index.tsx',
    },
    output: {
      filename: '[name].[contenthash].bundle.js',
      chunkFilename: '[name].[contenthash].chunk.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: '/',
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          nodeModulesVendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'node_modules',
            chunks: 'all',
          },
          default: false,
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: [/node_modules/, /\.test\.tsx?$/],
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|jpe?g)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'images',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    devServer: {
      hot: true,
      compress: true,
      port: 7000,
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Todolist&Webpack',
        filename: path.resolve(__dirname, 'dist', 'index.html'),
        template: path.resolve(__dirname, 'public', 'template.html'),
      }),
    ],
  };

  if (isAnalyzerEnabled) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};
