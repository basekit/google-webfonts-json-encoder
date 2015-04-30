'use strict';

const REQUEST_LIMIT = 5;
const API_ENDPOINT = 'https://google-webfonts-helper.herokuapp.com/api/fonts/';
const async = require('async');
const fs = require('fs');
const unzip = require('unzip2');
const request = require('request');
const fontWriter = require('./fontFileWriter');

function download(options) {
    async.series([
        requestZippedFonts.bind(null, options),
        unzipFonts.bind(null, options)
    ], function (err, results) {
        console.log('FINISH');
    });
}

function unzipFonts(options, callback) {
    const folder = destFolder(options);

    fs.readdir(folder, function (err, files) {
        async.each(files, function (filename, unzipCallback) {
            if (/\.zip$/.test(filename)) {
                let zipPath = folder + filename;
                let writer = fontWriter.getFontFileWriter(folder, filename);
                fs.createReadStream(zipPath)
                    .pipe(unzip.Parse())
                    .on('entry', writer.addFile.bind(writer))
                    .on('close', function () {
                        async.parallel([
                            writer.end.bind(writer),
                            fs.unlink.bind(null, zipPath)
                        ], function (err) {
                            unzipCallback(err);
                        });
                    });
            }
        }, function (err) {
            console.log('unzipFonts callback');
            callback(err);
        });
    });
}

function requestZippedFonts(options, callback) {
    const folder = destFolder(options);

    async.eachLimit(Object.keys(options.fonts), REQUEST_LIMIT, function (fontId, requestCallback) {
        const destZipFile = folder + fontId + '.zip';

        let req = request.get(requestUrl(options, fontId)),
            file = fs.createWriteStream(destZipFile);

        req.on('end', function () {
            requestCallback(null);
        })
            .on('error', function (error) {
                requestCallback(error);
            });

        file.on('error', function () {
                requestCallback(error);
        });

        req.pipe(file);
    }, function (err) {
        callback(err);
    });
}

function destFolder(options) {
    const folder = options.dest.charAt(options.dest.length - 1) === '/' ? options.dest : options.dest + '/';

    return folder;
}

function requestUrl(options, fontId) {
    const endPoint = API_ENDPOINT + fontId;

    return endPoint + requestParams(options, fontId);
}

function requestParams(options, fontId) {
    const downloadParam = '?download=' + options.download,
        formatParam = '&formats=' + options.formats,
        subsetParam = '&subsets=' + options.fonts[fontId].subsets,
        variantParam = '&variants=' + options.fonts[fontId].variants;

    return downloadParam + formatParam + subsetParam + variantParam;
}

exports.download = download;
