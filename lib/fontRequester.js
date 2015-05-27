'use strict';

const api = require('./api');
const gfonts = require('./gfonts');
const async = require('async');
const fs = require('fs');
const ttf2woff = require('ttf2woff');
const fontWriter = require('./fontFileWriter');

function download (options) {
    return api.requestList(options.fontAPI)
        .then(downloadFonts.bind(null, options))
        .then(encodeFonts.bind(null, options))
        .catch((err) => {
            console.log(err);
            throw err;
        });
}

function encodeFonts (options) {
    const folder = destFolder(options);
    let fontFiles = {};
    let promise = new Promise(function (resolve, reject) {
        fs.readdir(folder, (err, files) => {
            for (let file of files) {
                const match = file.match(/(\w+)\.(\w+|\d+)\.(ttf|woff)$/);
                if (match) {
                    const fontId = match[1];
                    const variant = match[2];
                    const format = match[3];
                    if (!fontFiles[fontId]) {
                        fontFiles[fontId] = {};
                    }
                    if (!fontFiles[fontId][format]) {
                        fontFiles[fontId][format] = [];
                    }
                    fontFiles[fontId][format].push(file);
                }
            }
            async.each(Object.keys(fontFiles), (font, fontCallback) => {
                for (let format of Object.keys(fontFiles[font])) {
                    let writer = fontWriter.getFontFileWriter(folder, font + '.' + format)
                    async.each(fontFiles[font][format], function (file, callback) {
                        writer.addFile(file).then(callback);
                    }, function () {
                        writer.end(() => {});
                        fontCallback();
                    });
                }
            }, (err) => {
                err ? reject() : resolve();
            })
        });
    });
    return promise;
}

function downloadFonts (options, available) {
    const folder = destFolder(options);
    const requested = options.fonts;

    return new Promise((resolve, reject) => {
        if (!fs.existsSync(folder)) {
            return reject(new Error('Dest folder doesn\'t exist'));
        }
        let fonts = gfonts.getFonts(available);
        async.each(Object.keys(requested), (fontId, callback) => {
            const font = fonts.getFontById(fontId);
            const variants = requested[fontId].variants.split(',');
            async.each(variants, (variant, fileCallback) => {
                const url = font.getUrl(variant);
                const filename = folder + fontFilename(font, variant, 'ttf');
                if (!url) {
                    console.log('The variant ' + variant + ' doesn\'t exist for font ' + font.family);
                    return fileCallback();
                }
                const file = fs.createWriteStream(filename);
                file.on('close', () => {
                    const input = fs.readFileSync(filename);
                    const ttf = new Uint8Array(input);
                    try {
                        const woff = new Buffer(ttf2woff(ttf, {}).buffer);
                        fs.writeFile(folder + fontFilename(font, variant, 'woff'), woff, fileCallback);
                    } catch (e) {
                        let error = new Error('Woff encoding failed: ' + filename);
                        reject(error);
                        return fileCallback(error);
                    }
                });
                api.requestFile(url)
                    .pipe(file);
            }, (err) => {
                callback(err);
            });
        }, (err) => {
            if (err) {
                return reject(err);
            } else {
                resolve();
            }
        });
    });
}

function fontFilename (font, variant, format) {
    return font.id + '.' + variant + '.' + format;
}

function destFolder(options) {
    const folder = options.dest.charAt(options.dest.length - 1) === '/' ? options.dest : options.dest + '/';

    return folder;
}

exports.download = download;
