'use strict';
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { pipeline } = require('stream');
const { promisify } = require('util');

// apiParams = { endpoint, apiParam, apiValue }
function requestList (apiParams) {
    const [url, params] = requestParams(apiParams);
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url, params);
            const data = await response.json();
            resolve(data.items);
        } catch (error) {
            reject(error);
        }
    });
}

async function requestFile (url, fileStream) {
    const streamPipeline = promisify(pipeline);
    const response = await fetch(url);
    await streamPipeline(response.body, fileStream);
}

function requestParams (apiParams) {
    let params = {
        method: 'GET',
    };

    const url = `${apiParams.endpoint}?${apiParams.keyParam}=${keyValue(apiParams.keyEnv)}`;

    if (!keyValue(apiParams.keyEnv)) {
        throw new Error('No Google API key found');
    }

    return [url, params];
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
