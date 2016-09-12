import * as fs from 'fs-extra';
import * as path from 'path';
import * as pathExists from 'path-exists';

//need to go up 3 levels to get the package folder
const globalPath = path.dirname(path.dirname(path.dirname(module.filename))); 

const templateFolder =path.join(globalPath,'template');
const templateFileFolder = {
  REACT: {
    config: path.join(templateFolder,'react/webpack.config.js'),
    package: path.join(templateFolder,'react/package.json')
  },
  ANGULAR: {
    config:path.join(templateFolder,'angular2/webpack.config.js'),
    package:path.join(templateFolder,'angular2/package.json')
  },
  DEFAULT: {
    config: path.join(templateFolder,'default/webpack.config.js'),
    package:path.join(templateFolder,'default/package.json')
  }
}

const appFolder = process.cwd();

const copyFile = (sourceFile: string, targetFile: string, rename: boolean = true) => {
  if (rename && pathExists.sync(targetFile)) {
    let {name,ext} = path.parse(targetFile);
    let renameFile = path.join(path.dirname(targetFile), name+'.old'+ext);
    fs.renameSync(targetFile, renameFile);
  }
  fs.copySync(sourceFile, targetFile);
}

const updatePackage = () => {
  let pkgFile = path.join(appFolder, 'package.json');
  if (pathExists.sync(pkgFile)) {
    let pkg = require(pkgFile);  
    pkg.scripts = Object.assign(
      {},
      pkg.scripts,
      {
        "start": "webpack ",
        "build":"rimraf dist/ && webpack -p"
      });
    fs.writeFileSync(pkgFile, JSON.stringify(pkg,null,2));
  } else {
    copyFile(templateFileFolder.DEFAULT.package, pkgFile,false);
  }
}

const createFolders = () => {
  fs.ensureDirSync(path.join(appFolder,'src'));
  fs.ensureDirSync(path.join(appFolder,'dist'));
} 

const createConfig = (configType: string = 'normal') => {
  console.log(`Creating webpack.config.js for ${configType} project...`);
  console.log('cli path',module.filename);  
  switch (configType) {
    case 'react':

    case 'angular':

    default:
      copyFile(templateFileFolder.DEFAULT.config, path.join(appFolder, 'webpack.config.js'));
      createFolders();
      updatePackage();
  }
}



export { createConfig };