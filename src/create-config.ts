import * as fs from 'fs-extra';
import * as path from 'path';
import * as pathExists from 'path-exists';

//need to go up 3 levels to get the package folder
const globalPath = path.dirname(path.dirname(module.filename)); 

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
    config: path.join(templateFolder,'default/'),
    package:path.join(templateFolder,'default/package.json')
  }
}

const appFolder = process.cwd();

const copyTemplateFolder = (srcFolder: string) => {
  console.log(srcFolder, ' ===> ', appFolder);
  fs.copySync(srcFolder, appFolder);
}

const updatePackage = (srcFile: string) => {
  let pkgFile = path.join(appFolder, 'package.json');
  let templatePkgFile = require(srcFile);
  if (pathExists.sync(pkgFile)) {
    let pkg = require(pkgFile);  
    pkg.scripts = Object.assign(
      {},
      pkg.scripts,
      templatePkgFile.scripts
    );
    fs.writeFileSync(pkgFile, JSON.stringify(pkg,null,2));
  } else {
    fs.copySync(srcFile, pkgFile);
  }
}


const createConfig = (configType: string = 'normal') => {    
  switch (configType) {
    case 'react':

    case 'angular':

    default:
      updatePackage(templateFileFolder.DEFAULT.package);
      copyTemplateFolder(templateFileFolder.DEFAULT.config);      
  }
}



export { createConfig };