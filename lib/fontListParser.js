'use strict';

function fontList (options, config) {
    return require(parserPath(config)).fontList(options);
}

function parserPath (config) {
    return './' + config.fontListFormat + 'Parser';
}

exports.fontList = fontList;
