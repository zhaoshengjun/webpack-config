import * as chalk from 'chalk';

const yellow = chalk.yellow;
const green = chalk.green;

const outputFinalMessage = () =>{
  console.log(`
Success! Created ${yellow('webpack.config.js')} for you.

From now on, just follow the following conventions:

   * Put all your ${yellow('source')} files in ${yellow('/src')} folder
   * Your final ${yellow('build')} file will be in ${yellow('/dist')} folder

We suggest that you begin by typing:  
  ${green('npm i && npm start')}

Happy hacking!
  `);
};

export {outputFinalMessage};