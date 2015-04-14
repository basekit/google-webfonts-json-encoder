'use strict';

function convert(options, config) {
    const list = require('./fontListLoader').load(options.list, config);
    const fonts = require('./fontListParser').fontList({
        fonts: list,
        subsets: options.subset
    }, config);

    return {
        download: 'zip',
        formats: options.format,
        dest: options.dest,
        fonts: fonts
    };
}

exports.convert = convert;
