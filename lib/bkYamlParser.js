'use strict';

function fontList(options) {
    let list = {};
    const fonts = options.fonts;
    const subsets = Array.isArray(options.subsets) ? options.subsets : options.subsets.split(',');

    for (let subset of Object.keys(fonts)) {
        if (includes(subsets, subset)) {
            addsubsetFontsToList(list, subset, fonts[subset].fonts);
        }
    }

    for (let font of Object.keys(list)) {
        list[font].subsets = list[font].subsets.join(',');
        list[font].variants = list[font].variants.join(',');
    }

    return list;
}

function addsubsetFontsToList(list, subset, fonts) {
    for (let font of fonts) {
        const id = font.id;
        let listItem = list[id] ? list[id] : { subsets: [], variants: ['regular'] };

        listItem.subsets.push(subset);
        for (let size of font.size.split(',')) {
            if (! includes(listItem.variants, size)) {
                listItem.variants.push(size);
            }
        }
        list[id] = listItem;
    }
}

function includes(list, item) {
    return list.some((listItem) => {
        return listItem == item;
    });
}

exports.fontList = fontList;
