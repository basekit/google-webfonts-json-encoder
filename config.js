'use strict';

module.exports = {
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
    },
    fontListFormat: 'bkYaml',
    fontAPI: {
        endpoint: 'https://www.googleapis.com/webfonts/v1/webfonts',
        keyParam: 'key',
        keyEnv: 'GOOGLE_API_KEY'
    }
};

