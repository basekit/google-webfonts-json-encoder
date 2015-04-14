'use strict';

function load (path, config) {
    return require(loaderPath(config)).load(path);
}

function loaderPath (config) {
    return './' + config.fontListFormat + 'Loader';
}

exports.load = load;
