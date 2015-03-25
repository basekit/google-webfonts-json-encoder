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
    variant: {
        available: [
            'regular',
            '300',
            '400',
            '500',
            '600',
            '700'
        ],
        default: 'regular'
    },
    list: {
        default: 'config/google_fonts.yml'
    }
};

