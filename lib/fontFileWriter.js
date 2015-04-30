'use strict';

const fs = require('fs');
const stream = require('stream');
const util = require('util');
const async = require('async');

function fontFileWriter (folder, filename) {
    this.folder = folder;
    this.files = {};
    this.baseFilename = folder + filename.replace('.zip', '');
}

fontFileWriter.prototype.addFile = function (file) {
    const key = extension(file.path);
    if (typeof this.files[key] === 'undefined') {
        this.files[key] = [];
    }
    getFont(file).then(function (json) {
        this.files[key].push(json);
    }.bind(this), function (err) {
        console.log(err);
    });
};

fontFileWriter.prototype.end = function (callback) {
    async.each(Object.keys(this.files), function (format, fCallback) {
        fs.writeFile(this.fontFilename(format), JSON.stringify(this.files[format]), function (err) {
            fCallback(err);
        });
    }.bind(this), function (err) {
        callback(err);
    });
};

fontFileWriter.prototype.fontFilename = function (format) {
    return this.baseFilename + '.' + format + '.json';
}

function getFont(file) {
    let data = [];
    let promise = new Promise(function (resolve, reject) {
        file.on('end', function () {
            let content = jsonContent(data, file.path);
            resolve(content);
        });
        file.on('error', reject);
    });
    file.on('data', function (chunk) {
        data.push(chunk);
    });
    return promise;
}

function getFontFileWriter(folder, filename) {
    return new fontFileWriter(folder, filename);
}

function jsonContent(data, filename) {
    const encodedContent = Buffer.concat(data).toString('base64');
    const json = {
        'css': '@font-face { font-family: "' + fontFamily(filename) +
            '"; font-weight: ' + fontWeight(filename) + '; src: url(data:' +
            dataType(filename) + ';charset=utf-8;base64,' + encodedContent + ')'
    };

    return json;
}

function fontFamily(filename) {
    let family = filename.match(/^.+?(?=-v\d+?-)/)[0].replace(/-/g, ' ');
    return toTitleCase(family);
}

function fontWeight(filename) {
    const weight = filename.match(/\w+?(?=\.(woff|woff2|ttf|eot|svg|otf))/)[0];

    if (weight == 'regular') {
        return 'normal'
    } else {
        return weight;
    }
}

function dataType(filename) {
    const types = {
        'ttf': 'font/truetype',
        'woff': 'application/x-font-woff',
        'woff2': 'application/x-font-woff2',
        'svg': 'image/svg+xml',
        'eot': 'application/vnd.ms-fontobject',
        'otf': 'font/opentype'
    };

    return types[extension(filename)];
}

function extension(filename) {
    return filename.match(/\.(.+?)$/)[1];
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

module.exports = {
    getFontFileWriter: getFontFileWriter
};
