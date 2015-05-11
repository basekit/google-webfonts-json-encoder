'use strict';

function validate(args, config) {
    return Object.keys(args).every((argName) => {
        return validateArg(args[argName], config[argName]);
    });
}

function validateArg(argValue, config) {
    const argValues = Array.isArray(argValue) ? argValue : argValue.split(',');

    if (config && config.available) {
        return argValues.every((value) => {
            return config.available.some((validValue) => {
                return validValue == value;
            });
        });
    } else {
        return true;
    }
}

exports.validate = validate;
