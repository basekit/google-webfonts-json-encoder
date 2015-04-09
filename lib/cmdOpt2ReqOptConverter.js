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
        let id = font.id,
            listItem = list[id] ? list[id] : { subsets: [], variants: ['regular'] };

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

exports.convert = convert;
