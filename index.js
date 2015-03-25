#!/usr/bin/env node

'use strict';
const config = require('./config'),
      validate = require('./lib/argsValidator').validate;

var argv = require('yargs')
    .usage('Usage: $0 [options] <family name>')
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
    .option('v', {
        alias: 'variant',
        demand: false,
        default: config.variant.default,
        describe: 'specify variants to download: regular,300,400,...',
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
    .demand(1)
    .argv;

validate(argv, config);
