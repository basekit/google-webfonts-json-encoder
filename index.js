#!/usr/bin/env node

'use strict';
const config = require('./config'),
    commandParser = require('./lib/commandParser'),
    fontListLoader = require('./lib/fontListLoader'),
    cmdOpt2ReqOptConverter = require('./lib/cmdOpt2ReqOptConverter'),
    fontRequester = require('./lib/fontRequester');

var options = commandParser.parse(config),
    fontList = fontListLoader.loadList(options.list),
    reqOptions = cmdOpt2ReqOptConverter.convert({
        format: options.format,
        fonts: fontList,
        subset: options.subset
    });

fontRequester.download(reqOptions);
