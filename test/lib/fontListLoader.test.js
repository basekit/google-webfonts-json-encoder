describe('fontListLoader', function () {
    'use strict';

    const assert = require('assert'),
        fontListLoader = require('../../lib/fontListLoader'),
        wrongPath = 'whatever/no.yml',
        listPath = 'fontList.yml',
        badListPath = 'badFontList.yml',
        expectedList = {
            latin: {
                subset: 'latin',
                fonts: [
                    {
                        family: 'Droid+Sans',
                        id: 'droid_sans',
                        size: '400,700'
                    },
                    {
                        family: 'Arvo',
                        id: 'arvo',
                        size: '400,700'
                    },
                    {
                        family: 'Corben',
                        id: 'corben',
                        size: '400,700'
                    }
                ]
            },
            cyrillic: {
                subset: 'cyrillic',
                fonts: [
                    {
                        family: 'Droid+Sans',
                        id: 'droid_sans',
                        size: '400,700'
                    },
                    {
                        family: 'Arvo',
                        id: 'arvo',
                        size: '400,700'
                    },
                    {
                        family: 'Corben',
                        id: 'corben',
                        size: '400,700'
                    },
                    {
                        family: 'Lobster',
                        id: 'lobster',
                        size: ''
                    },
                    {
                        family: 'Droid+Serif',
                        id: 'droid_serif',
                        size: ''
                    }
                ]
            }
        };

    describe('loadList', function () {
        it('loads a yml file into an object, injecting family names formatted into ids for the font service', function () {
            var list = fontListLoader.loadList(listPath);

            assert.deepEqual(list, expectedList);
        });

        it('raises an error if the file is not found', function () {
            assert.throws(function () { fontListLoader.loadList(wrongPath) });
        });

        it('raises an error if the file content is not valid', function () {
            assert.throws(function () { var list = fontListLoader.loadList(badListPath) });
        });
    });
});
