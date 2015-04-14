'use strict';

function fontList(options) {
    let list = {};
    const fonts = options.fonts;
    const subsets = Array.isArray(options.subsets) ? options.subsets : options.subsets.split(',');

    Object.keys(fonts).forEach(function (subset) {
        if (includes(subsets, subset)) {
            addsubsetFontsToList(list, subset, fonts[subset].fonts);
        }
    });

    Object.keys(list).forEach(function (font) {
        list[font].subsets = list[font].subsets.join(',');
        list[font].variants = list[font].variants.join(',');
    });

    return list;
}

function addsubsetFontsToList(list, subset, fonts) {
    fonts.forEach(function (font) {
        const id = font.id;
        let listItem = list[id] ? list[id] : { subsets: [], variants: ['regular'] };

        listItem.subsets.push(subset);
        font.size.split(',').forEach(function (size) {
            if (! includes(listItem.variants, size)) {
                listItem.variants.push(size);
            }
        });
        list[id] = listItem;
    });
}

function includes(list, item) {
    return list.some(function (listItem) {
        return listItem == item;
    });
}

exports.fontList = fontList;
