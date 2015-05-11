'use strict';

const gfont = require('./gfont');
const api = require('./api');

function GfontCollection (fonts) {
    if (fonts) {
        this.gfonts = fonts;
    }
}

GfontCollection.prototype = {
    constructor: GfontCollection,

    get gfonts () {
        return this._collection;
    },

    set gfonts (fonts) {
        this._collection = [];
        for (let fontDef of fonts) {
           this._collection.push(gfont.getFont(fontDef));
        }
    },

    getFontById: function (fontId) {
        return this.gfonts.find((font) => {
            return font.id === fontId
        });
    }
};

function getFonts (fonts) {
    return new GfontCollection(fonts);
}

module.exports = {
    getFonts: getFonts
}
