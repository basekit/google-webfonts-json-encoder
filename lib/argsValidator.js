'use strict';

function validate(args, config) {
    return Object.keys(args).every(function (argName) {
        return validateArg(args[argName], config[argName]);
    });
}

function validateArg(argValue, config) {
    const argValues = Array.isArray(argValue) ? argValue : argValue.split(',');

    if (config && config.available) {
        return argValues.every(function (value) {
            return config.available.some(function (validValue) {
                return validValue == value;
            });
        });
    } else {
        return true;
    }
}

exports.validate = validate;
