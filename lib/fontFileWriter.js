'use strict';

const fs = require('fs');
const stream = require('stream');
const util = require('util');
const async = require('async');
const path = require('path');

function fontFileWriter (folder, filename) {
    this.folder = folder;
    this.files = {};
    this.baseFilename = folder + filename;
}

fontFileWriter.prototype.addFile = function (filename) {
    const key = extension(filename);
    if (typeof this.files[key] === 'undefined') {
        this.files[key] = [];
    }
    return getFont(fs.createReadStream(this.folder + filename)).then(function (json) {
        this.files[key].push(json);
    }.bind(this))
};

fontFileWriter.prototype.end = function (callback) {
    async.each(Object.keys(this.files), function (format, fCallback) {
        fs.writeFileSync(this.fontFilename(format), JSON.stringify(this.files[format]));
        console.log(this.fontFilename());
        fCallback();
    }.bind(this), (err) => {
        callback(err);
    });
};

fontFileWriter.prototype.fontFilename = function () {
    return this.baseFilename + '.json';
}

function getFont(file) {
    let data = [];
    let promise = new Promise((resolve, reject) => {
        file.on('end', () => {
            let content = jsonContent(data, file.path);
            resolve(content);
        });
        file.on('error', reject);
    });
    file.on('data', (chunk) => {
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
            dataType(filename) + ';charset=utf-8;base64,' + encodedContent + '); }'
    };
    return json;
}

function fontFamily(filename) {
    let family = path.basename(filename).match(/^.+?(?=\.(\d+|regular))/)[0].replace(/_/g, ' ');
    return toTitleCase(family);
}

function fontWeight(filename) {
    const weight = filename.match(/\w+?(?=\.(woff|ttf))/)[0];

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
    };

    return types[extension(filename)];
}

function extension(filename) {
    return filename.match(/(woff|ttf)$/)[0];
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

module.exports = {
    getFontFileWriter: getFontFileWriter
};
