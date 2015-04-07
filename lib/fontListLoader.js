'use strict';

function loadList(path) {
    const YAML = require('yamljs');
    var list;

    try {
        list = YAML.load(path);
    } catch (e) {
        throw 'Font list file not found';
    }

    try {
        validate(list);
    } catch (e) {
        throw 'Malformed font list';
    }

    return injectId(list.fonts);
}

function validate(list) {
    validateFontsKey(list);
    validateSubsets(list.fonts);
}

function validateFontsKey(list) {
    if (!list.fonts) {
        throw new Error;
    }
}

function validateSubsets(list) {
    Object.keys(list).forEach(function (fontSubset) {
        validateSubset(list[fontSubset]);
        validateFonts(list[fontSubset]);
    });
}

function validateSubset(fontSubset) {
    if (! fontSubset.subset.substr) {
        throw new Error;
    }
}

function validateFonts(fontSubset) {
    if (! Array.isArray(fontSubset.fonts)) {
        throw new Error;
    }
    fontSubset.fonts.forEach(function (fontFamily) {
        validateFontFamily(fontFamily);
    });
}

function validateFontFamily(fontFamily) {
    if (! (fontFamily.family.substr && fontFamily.size.substr)) {
        throw new Error;
    }
}

function injectId(fonts) {
    Object.keys(fonts).forEach(function (subset) {
        fonts[subset].fonts.forEach(function (fontFamily) {
            fontFamily.id = createId(fontFamily.family);
        });
    });
    return fonts;
}

function createId(fontName) {
    return fontName.toLocaleLowerCase().replace(/\+/g, '_');
}

module.exports = {
    loadList: loadList
};
