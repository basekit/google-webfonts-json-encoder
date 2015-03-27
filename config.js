'use strict';

module.exports = {
    format: {
        available: [
            'woff',
            'woff2',
            'ttf'
        ],
        default: 'woff,woff2,ttf'
    },
    subset: {
        available: [
            'latin',
            'latin-ext',
            'cyrillic',
            'cyrillic-ext'
        ],
        default: 'latin'
    },
    list: {
        default: 'config/google_fonts.yml'
    }
};

