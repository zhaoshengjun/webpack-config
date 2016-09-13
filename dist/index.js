#!/usr/bin/env node
"use strict";
var message_1 = require("./message");
var create_config_1 = require("./create-config");
var yargs = require("yargs");
var pkg = require('../package.json');
yargs
    .usage('Usage: $0 [command] [options]')
    .command('init', 'Create webpack.config.js for you')
    .help('help')
    .alias('h', 'help')
    .epilog("v" + pkg.version + " Copyright 2016 Sam Zhao");
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
