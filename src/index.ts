#!/usr/bin/env node

import {outputFinalMessage} from './message';
import { createConfig } from './create-config';
import * as yargs from 'yargs';
let pkg = require('../package.json');

yargs
  .usage('Usage: $0 [command] [options]')
  .command('init', 'Create webpack.config.js for you')
  // .option('react', {
  //   alias: 'r',
  //   describe: 'configuration for react app, including HMR (not ready yet)',
  // })
  // .option('angular', {
  //   alias: 'n',
  //   describe: 'configuration for angular2 app (not)',
  // })
  .help('help')
  .alias('h', 'help')
  .epilog(`v${pkg.version} Copyright 2016 Sam Zhao`);
var argv = yargs.argv;

if (argv.r) {
  createConfig('react');  
} else if (argv.n) {
  createConfig('angular');
} else {
  createConfig();
}

outputFinalMessage();