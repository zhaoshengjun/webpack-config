"use strict";
var chalk = require("chalk");
var yellow = chalk.yellow;
var green = chalk.green;
var outputFinalMessage = function () {
    console.log("\nSuccess! Created " + yellow('webpack.config.js') + " for you.\n\nFrom now on, just follow the following conventions:\n\n   * Put all your " + yellow('source') + " files in " + yellow('/src') + " folder\n   * Your final " + yellow('build') + " file will be in " + yellow('/dist') + " folder\n\nWe suggest that you begin by typing:  \n  " + green('npm i && npm start') + "\n\nHappy hacking!\n  ");
};
exports.outputFinalMessage = outputFinalMessage;
