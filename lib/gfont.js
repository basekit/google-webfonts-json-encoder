'use strict';

function Gfont (values) {
    this._values = values;
}

Gfont.prototype = {
    constructor: Gfont,
    get family () {
        return this._values.family;
    },
    get id () {
        return this.family
            .toLocaleLowerCase()
            .replace(/\+|\s/g, '_');
    },
    get files () {
        return this._values.files;
    },
    getUrl: function (variant) {
        return this.files[variant];
    }
};

function getFont (values) {
    return new Gfont(values);
}

module.exports = {
    getFont: getFont
}
