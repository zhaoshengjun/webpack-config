#!/usr/bin/env node
"use strict";
var message_1 = require("./message");
var create_config_1 = require("./create-config");
var yargs = require("yargs");
yargs
    .usage('Usage: $0 [command] [options]')
    .command('init', 'Create webpack.config.js for you')
    .option('react', {
    alias: 'r',
    describe: 'configuration for react app, including HMR',
})
    .option('angular', {
    alias: 'n',
    describe: 'configuration for angular2 app',
})
    .help('help')
    .alias('h', 'help')
    .epilog('Copyright 2016 Sam Zhao');
var argv = yargs.argv;
if (argv.r) {
    create_config_1.createConfig('react');
}
else if (argv.n) {
    create_config_1.createConfig('angular');
}
else {
    create_config_1.createConfig();
}
message_1.outputFinalMessage();
