describe('bkYaml', function () {
    'use strict';

    const assert = require('assert');
    const fontList = require('../../lib/bkYamlParser').fontList;
    const subsets = 'latin,latin-ext';
    const fontYamlList = {
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
                }
            ]
        },
        'latin-ext': {
            subset: 'latin,latin-ext',
            fonts: [
                {
                    family: 'Droid+Sans',
                    id: 'droid_sans',
                    size: '400,700'
                },
                {
                    family: 'Sans',
                    id: 'sans',
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
                    family: 'arvo',
                    id: 'arvo',
                    size: '400,700'
                }
            ]
        }
    };

    describe('fontList', function () {
        it('returns a list of fonts, subsets and variants, identified by id, to download', function () {
            const list = fontList({
                subsets: subsets,
                fonts: fontYamlList
            });
            const expected = {
                'droid_sans': {
                    subsets: 'latin,latin-ext',
                    variants: 'regular,400,700'
                },
                'arvo': {
                    subsets: 'latin',
                    variants: 'regular,400,700'
                },
                'sans': {
                    subsets: 'latin-ext',
                    variants: 'regular,400,700'
                }
            };

            assert.deepEqual(list, expected);
        });
    });
});
