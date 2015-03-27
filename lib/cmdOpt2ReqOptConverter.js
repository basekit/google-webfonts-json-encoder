'use strict';

function convert(options) {
    return {
        download: 'zip',
        formats: options.format,
        dest: options.dest,
        fonts: fontList({
            fonts: options.fonts,
            subsets: options.subset
        })
    };
}

function fontList(options) {
    var list = {},
        fonts = options.fonts,
        subsets = Array.isArray(options.subsets) ? options.subsets : options.subsets.split(',');

    Object.keys(fonts).forEach(function (subset) {
        console.log("subset: ", subset);
        if (includes(subsets, subset)) {
            addsubsetFontsToList(list, fonts[subset]);
        }
    });

    Object.keys(list).forEach(function (font) {
        list[font].subsets = list[font].subsets.join(',');
        list[font].variants = list[font].variants.join(',');
    });

    return list;
}

function addsubsetFontsToList(list, subset) {
    subset.fonts.forEach(function (font) {
        let id = font.id,
            listItem = list[id] ? list[id] : { subsets: [], variants: ['regular'] };

        console.log('listItem: ', listItem);
        listItem.subsets.push(subset.subset);
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

module.exports = {
    convert: convert
};
