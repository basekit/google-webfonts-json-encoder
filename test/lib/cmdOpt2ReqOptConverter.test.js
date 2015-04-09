describe('cmdOpt2ReqOptConverter', function () {
    'use strict';

    const assert = require('assert'),
        convert = require('../../lib/cmdOpt2ReqOptConverter').convert,
        options = {
            subset: 'latin,latin-ext',
            format: 'woff,woff2,ttf',
            dest: 'my_folder'
        },
        fontList = {
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

    describe('convert', function () {
        it('sets download param', function () {
            const reqOptions = convert({
                format: options.format,
                fonts: fontList,
                subset: options.subset,
                dest: options.dest
            });

            assert.equal(reqOptions.download, 'zip');
        });

        it('sets formats param', function () {
            const reqOptions = convert({
                format: options.format,
                fonts: fontList,
                subset: options.subset,
                dest: options.dest

            });

            assert.equal(reqOptions.formats, options.format);
        });

        it('sets destination folder param', function () {
            const reqOptions = convert({
                format: options.format,
                fonts: fontList,
                subset: options.subset,
                dest: options.dest

            });

            assert.equal(reqOptions.dest, options.dest);
        });
        it('sets a list of fonts, subsets and variants, identified by id, to download', function () {
            const reqOptions = convert({
                format: options.format,
                fonts: fontList,
                subset: options.subset,
                dest: options.dest

            }),
                expected = {
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

            assert.deepEqual(reqOptions.fonts, expected);
        });
    });
});
