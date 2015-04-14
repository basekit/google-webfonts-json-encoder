'use strict';

function parse(config) {
    const validate = require('./argsValidator').validate;
    let argv = require('yargs')
        .usage('Usage: $0 [options]')
        .option('s', {
            alias: 'subset',
            demand: false,
            default: config.subset.default,
            describe: 'specify subset to download',
            type: 'string'
        })
    .option('f', {
        alias: 'format',
        demand: false,
        default: config.format.default,
        describe: 'specify font format: ttf,woff,...',
        type: 'string'
    })
    .option('l', {
        alias: 'list',
        demand: false,
        default: config.list.default,
        describe: 'path to YAML with font list',
        type: 'string'
    })
    .option('d', {
        alias: 'dest',
        demand: false,
        default: __dirname,
        describe: 'path to destination folder',
        type: 'string'
    })
    .argv;

    validate(argv, config);

    return argv;
}

exports.parse =  parse;
