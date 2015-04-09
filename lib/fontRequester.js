'use strict';

const REQUEST_LIMIT = 5,
      API_ENDPOINT = 'https://google-webfonts-helper.herokuapp.com/api/fonts/',
      async = require('async'),
      fs = require('fs'),
      unzip = require('unzip2'),
      request = require('request');

function download(options) {
    async.series([
        requestZippedFonts.bind(null, options),
        unzipFonts.bind(null, options)
    ], function (err, results) {
        console.log('Serie finished');
    });
}

function unzipFonts(options) {
    const folder = destFolder(options);

    fs.readdir(folder, function (err, files) {
        async.each(files, function (filename, callback) {
            if (/\.zip$/.test(filename)) {
                fs.createReadStream(folder + filename)
                    .pipe(unzip.Parse())
                    .on('entry', function (entry) {
                         entry.pipe(fs.createWriteStream(folder + entry.path));
                    });
            }
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
