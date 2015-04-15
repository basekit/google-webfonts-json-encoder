'use strict';

const REQUEST_LIMIT = 5;
const API_ENDPOINT = 'https://google-webfonts-helper.herokuapp.com/api/fonts/';
const async = require('async');
const fs = require('fs');
const unzip = require('unzip2');
const request = require('request');

function download(options) {
    async.series([
        requestZippedFonts.bind(null, options),
        unzipFonts.bind(null, options)
    ]);
}

function unzipFonts(options, callback) {
    const folder = destFolder(options);

    fs.readdir(folder, function (err, files) {
        async.each(files, function (filename, unzipCallback) {
            if (/\.zip$/.test(filename)) {
                let zipPath = folder + filename;
                fs.createReadStream(zipPath)
                    .pipe(unzip.Parse())
                    .on('entry', writeFontFile.bind(null, folder))
                    .on('close', function () {
                        fs.unlink(zipPath, unzipCallback);
                    });
            }
        }, function (err) {
            callback(err);
        });
    });
}

function writeFontFile (folder, file) {
    let data = [];

    file.on('end', function () {
        let outputFilename = fontFilename(folder, file.path);
        fs.writeFile(outputFilename, jsonContent(data, file.path), function (err) {
            console.log(outputFilename);
        });
    })
        .on('data', function (chunk) {
            data.push(chunk);
        });
}

function jsonContent(data, filename) {
    const encodedContent = Buffer.concat(data).toString('base64');
    const json = '"css": "@font-face { font-family: \'' + fontFamily(filename) +
        '\'; font-weight: ' + fontWeight(filename) + '; src: url(data:' +
        dataType(filename) + ';charset=utf-8;base64,' + encodedContent + ')"';

    return json;
}

function fontWeight(filename) {
    const weight = filename.match(/\w+?(?=\.(woff|woff2|ttf|eot|svg|otf))/)[0];

    if (weight == 'regular') {
        return 'normal'
    } else {
        return weight;
    }
}

function fontFamily(filename) {
    let fontFamily = filename.match(/^.+?(?=-v\d+?-)/)[0].replace(/-/g, ' ');
    return toTitleCase(fontFamily);
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function dataType(filename) {
    const types = {
        'ttf': 'font/truetype',
        'woff': 'application/x-font-woff',
        'woff2': 'application/x-font-woff2',
        'svg': 'image/svg+xml',
        'eot': 'application/vnd.ms-fontobject',
        'otf': 'font/opentype'
    },
    extension = filename.match(/\.(.+?)$/)[1];

    return types[extension];
}

function fontFilename(folder, filename) {
    // Font files extracted include the font version number, we strip it away.
    // The regex should be /(?<=-)v\d+-/ to make sure we don't cut any fontname
    // which happens to include v and some digits in its name, but JS sucks and
    // doesn't support lookbehind assertions.
    // We strip the character subset as well.
    return folder + filename.replace(/v\d+-/, '').replace(/-*latin_*/, '')
        .replace(/-*latin-ext_*/, '').replace(/-*cyrillic_*/, '')
        .replace(/-*ext_cyrillic_*/, '') + '.json';
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
