import url from 'url';
import {shell} from "electron";

export default function(remote, jetpack) {
    let fh = {};

    fh.jetpack = jetpack;
    fh.appPath = remote.app.getAppPath();
    fh.appDir = jetpack.cwd(fh.appPath);
    fh.path = jetpack.path;

    console.log('App directory: ' + fh.appPath);

    fh.loadJsonFile = function(filename, defaultValue = []) {
        if (fh.jetpack.exists(filename) === 'file')
            return fh.jetpack.read(filename, 'json');
    };

    fh.loadResource = function(filename, defaultValue = []) {
        if (fh.appDir.exists(filename) === 'file')
            return fh.appDir.read(filename, 'json');
    };

    fh.getFiles = function(path, options) {
        if (jetpack.exists(path) !== 'dir') return [];
        return jetpack.find(path, options)
            .map(path => jetpack.path(path));
    };

    fh.saveJsonFile = function(filename, value, minify = false) {
        fh.jetpack.write(filename, angular.toJson(value, !minify));
    };

    fh.getFileBase = function(filePath) {
        return filePath.match(/(.*[\\\/])?(.*)\.[^\\\/]+/)[2];
    };

    fh.getFileExt = function(filePath) {
        return filePath.match(/(.*[\\\/])?.*\.([^\\\/]+)/)[2];
    };

    fh.getFileName = function(filePath) {
        return filePath.match(/(.*[\\\/])?(.*)/)[2];
    };

    fh.getDirectory = function(filePath) {
        return filePath.match(/(.*)[\\\/].*/)[1];
    };

    fh.getDateModified = function(filename) {
        return fh.jetpack.inspect(filename, {times: true}).modifyTime;
    };

    fh.openUrl = function(url) {
        shell.openItem(url);
    };

    fh.pathToFileUrl = function(path) {
        return url.format({
            pathname: jetpack.path(path).replace(/\\/g, '/'),
            protocol: 'file:',
            slashes: true
        })
    };

    fh.selectDirectory = function(title, defaultPath) {
        let selection = remote.dialog.showOpenDialog({
            title: title,
            defaultPath: defaultPath,
            properties: ['openDirectory']
        });
        if (!selection) return defaultPath;
        return selection[0];
    };

    fh.saveFile = function(title, defaultPath, filters = []) {
        return remote.dialog.showSaveDialog({
            title: title,
            defaultPath: defaultPath,
            filters: filters
        });
    };

    return fh;
}
