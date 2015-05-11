'use strict';

function convert(options, config) {
    const list = require('./fontListLoader').load(options.list, config);
    const fonts = require('./fontListParser').fontList({
        fonts: list,
        subsets: options.subset
    }, config);

    return {
        download: 'zip',
        dest: options.dest,
        fonts: fonts,
        fontAPI: config.fontAPI
    };
}

exports.convert = convert;
