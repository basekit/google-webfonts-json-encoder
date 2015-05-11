'use strict';

function load(path) {
    const YAML = require('yamljs');
    let list;

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
    for (let fontSubset of Object.keys(list)) {
        validateSubset(list[fontSubset]);
        validateFonts(list[fontSubset]);
    }
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

    for (let fontFamily of fontSubset.fonts) {
        validateFontFamily(fontFamily);
    }
}

function validateFontFamily(fontFamily) {
    if (! (fontFamily.family.substr && fontFamily.size.substr)) {
        throw new Error;
    }
}

function injectId(fonts) {
    for (let subset of Object.keys(fonts)) {
        fonts[subset].fonts.forEach((fontFamily) => {
            fontFamily.id = createId(fontFamily.family);
        });
    }
    return fonts;
}

function createId(fontName) {
    return fontName.toLocaleLowerCase().replace(/\+/g, '_');
}

exports.load= load;
