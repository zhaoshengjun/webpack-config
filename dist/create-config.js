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
        config: path.join(templateFolder, 'default/webpack.config.js'),
        package: path.join(templateFolder, 'default/package.json')
    }
};
var appFolder = process.cwd();
var copyFile = function (sourceFile, targetFile, rename) {
    if (rename === void 0) { rename = true; }
    if (rename && pathExists.sync(targetFile)) {
        var _a = path.parse(targetFile), name_1 = _a.name, ext = _a.ext;
        var renameFile = path.join(path.dirname(targetFile), name_1 + '.old' + ext);
        fs.renameSync(targetFile, renameFile);
    }
    fs.copySync(sourceFile, targetFile);
};
var updatePackage = function () {
    var pkgFile = path.join(appFolder, 'package.json');
    if (pathExists.sync(pkgFile)) {
        var pkg = require(pkgFile);
        pkg.scripts = Object.assign({}, pkg.scripts, {
            "start": "webpack ",
            "build": "rimraf dist/ && webpack -p"
        });
        fs.writeFileSync(pkgFile, JSON.stringify(pkg, null, 2));
    }
    else {
        copyFile(templateFileFolder.DEFAULT.package, pkgFile, false);
    }
};
var createFolders = function () {
    fs.ensureDirSync(path.join(appFolder, 'src'));
    fs.ensureDirSync(path.join(appFolder, 'dist'));
};
var createConfig = function (configType) {
    if (configType === void 0) { configType = 'normal'; }
    console.log("Creating webpack.config.js for " + configType + " project...");
    console.log('cli path', module.filename);
    switch (configType) {
        case 'react':
        case 'angular':
        default:
            copyFile(templateFileFolder.DEFAULT.config, path.join(appFolder, 'webpack.config.js'));
            createFolders();
            updatePackage();
    }
};
exports.createConfig = createConfig;
