#!/usr/bin/env node --harmony

'use strict';

const config = require('./config');
const commandParser = require('./lib/commandParser');
const cmdOpt2ReqOptConverter = require('./lib/cmdOpt2ReqOptConverter');
const fontRequester = require('./lib/fontRequester');
const options = commandParser.parse(config);
const reqOptions = cmdOpt2ReqOptConverter.convert(options, config);

fontRequester.download(reqOptions)
    .then(() => { process.exit(0); })
    .catch((err) => {
        process.exit(1);
    });

