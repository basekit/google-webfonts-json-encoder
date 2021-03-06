describe('argsValidator', function () {
    'use strict';

    const assert = require('assert');

    describe('validate', function () {
        const validate = require('../../lib/argsValidator').validate;
        const config = require('../../config.js');

        it('returns true  if all options are valid', function () {
            const options = {
                s: 'latin,latin-ext',
                subset: 'latin,latin-ext',
                l: 'config/google_fonts.yml',
                list: 'config/google_fonts.yml',
                d: '/Users/eddy/code/google-webfonts-json-encoder',
                dest: '/Users/eddy/code/google-webfonts-json-encoder',
                '$0': 'index.js'
            };

            assert.equal(validate(options, config), true);
        });

        it('returns false if any option is invalid', function () {
            const options = {
                s: 'latin,latin-ext,potato',
                subset: 'latin,latin-ext,potato',
                l: 'config/google_fonts.yml',
                list: 'config/google_fonts.yml',
                d: '/Users/eddy/code/google-webfonts-json-encoder',
                dest: '/Users/eddy/code/google-webfonts-json-encoder',
                '$0': 'index.js'
            };

            assert.equal(validate(options, config), false);
        });
    });
});
