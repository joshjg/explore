#!/usr/bin/env node

/* eslint-disable no-console, global-require, import/imports-first, import/newline-after-import */

require('dotenv').config();

import 'babel-polyfill';

import path from 'path';
import express from 'express';
import historyApiFallback from 'connect-history-api-fallback';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import knex from 'knex';
import { Model } from 'objection';

import knexfile from './knexfile';
import api from './api';

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server');
  const webpackConfig = require('../webpack.config');

  Model.knex(knex(knexfile.development));

  const server = express();
  server.use(express.static(path.join(__dirname, 'public')));

  server.use(cookieParser(process.env.AUTH_SECRET));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(session({
    secret: process.env.AUTH_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 600000,
    },
  }));

  server.use(api);

  server.listen(process.env.API_PORT, () => (
    console.log(chalk.green(`API listening on port ${process.env.API_PORT}`))
  ));

  const client = new WebpackDevServer(webpack(webpackConfig), {
    contentBase: '/build/',
    proxy: {
      '/api/**': {
        target: `http://localhost:${process.env.API_PORT}`,
        pathRewrite: { '^/api': '' },
      },
      '/public/**': {
        target: `http://localhost:${process.env.API_PORT}`,
        pathRewrite: { '^/public': '' },
      },
    },
    hot: true,
    historyApiFallback: true,
    stats: 'errors-only',
  });

  client.use('/', express.static(path.join(__dirname, '../build')));
  client.listen(process.env.PORT, () => (
    console.log(chalk.green(`Dev server listening on port ${process.env.PORT}`))
  ));
} else if (process.env.NODE_ENV === 'production') {
  Model.knex(knex(knexfile.production));
  const server = express();
  const RedisStore = require('connect-redis')(session);

  server.use(cookieParser(process.env.AUTH_SECRET));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(session({
    secret: process.env.AUTH_SECRET,
    store: new RedisStore({
      host: 'localhost',
      port: 6379,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 3600 * 24 * 30,
    },
  }));

  server.use(api);
  server.use(historyApiFallback());
  server.use('/public/', express.static(path.join(__dirname, 'public')));
  server.use('/', express.static(path.join(__dirname, '../build')));

  server.listen(process.env.PORT, () => (
    console.log(chalk.green(`Listening on port ${process.env.PORT}`))
  ));
}
