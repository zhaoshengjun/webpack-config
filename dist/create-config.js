"use strict";
var fs = require("fs-extra");
var path = require("path");
var pathExists = require("path-exists");
var globalPath = path.dirname(path.dirname(module.filename));
var templateFolder = path.join(globalPath, 'template');
var templateFileFolder = {
    REACT: {
        config: path.join(templateFolder, 'react/webpack.config.js'),
        package: path.join(templateFolder, 'react/package.json')
    },
    ANGULAR: {
        config: path.join(templateFolder, 'angular2/webpack.config.js'),
        package: path.join(templateFolder, 'angular2/package.json')
    },
    DEFAULT: {
        config: path.join(templateFolder, 'default/'),
        package: path.join(templateFolder, 'default/package.json')
    }
};
var appFolder = process.cwd();
var copyTemplateFolder = function (srcFolder) {
    console.log(srcFolder, ' ===> ', appFolder);
    fs.copySync(srcFolder, appFolder);
};
var updatePackage = function (srcFile) {
    var pkgFile = path.join(appFolder, 'package.json');
    var templatePkgFile = require(srcFile);
    if (pathExists.sync(pkgFile)) {
        var pkg = require(pkgFile);
        pkg.scripts = Object.assign({}, pkg.scripts, templatePkgFile.scripts);
        fs.writeFileSync(pkgFile, JSON.stringify(pkg, null, 2));
    }
    else {
        fs.copySync(srcFile, pkgFile);
    }
};
var createConfig = function (configType) {
    if (configType === void 0) { configType = 'normal'; }
    switch (configType) {
        case 'react':
        case 'angular':
        default:
            updatePackage(templateFileFolder.DEFAULT.package);
            copyTemplateFolder(templateFileFolder.DEFAULT.config);
    }
};
exports.createConfig = createConfig;
