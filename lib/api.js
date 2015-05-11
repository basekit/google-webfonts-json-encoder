'use strict';

const request = require('request');

// apiParams = { endpoint, apiParam, apiValue }
function requestList (apiParams) {
    return new Promise((resolve, reject) => {
        request(requestParams(apiParams), (err, response, body) => {
            if (err) {
                return reject(err);
            }
            resolve(JSON.parse(body).items);
        });
    });
}

function requestFile (url, callback) {
    return request(url, callback);
}

function requestParams (apiParams) {
    let params = {
        uri: apiParams.endpoint,
        method: 'GET',
        qs: {}
    };

    params.qs[apiParams.keyParam] = keyValue(apiParams.keyEnv);

    return params;
}

function keyValue (varName) {
    return process.env[varName];
}

function isOK (response) {
    return response.statusCode === 200;
}

module.exports = {
    requestList: requestList,
    requestFile: requestFile
};
