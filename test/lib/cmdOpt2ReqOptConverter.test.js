describe('cmdOpt2ReqOptConverter', function () {
    'use strict';

    const assert = require('assert');
    const mockery = require('mockery');
    const sinon = require('sinon');
    const convert = require('../../lib/cmdOpt2ReqOptConverter').convert;
    const options = {
        subset: 'latin,latin-ext',
        dest: 'my_folder'
    };
    const config = {
        fontListFormat: 'bkYaml',
        fontAPI: {
            endpoint: 'https://www.googleapis.com/webfonts/v1/webfonts',
            keyParam: 'key',
            keyEnv: 'GOOGLE_API_KEY'
        }
    };
    const fontList = {
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
        beforeEach(function () {
           let fakeLoader = {
               load: sinon.stub().returns(fontList)
           };

           mockery.enable({
               warnOnUnregistered: false
           });

           mockery.registerMock('./bkYamlLoader', fakeLoader);
        });

        afterEach(function () {
            mockery.disable();
        });

        it('sets download param', function () {
            const reqOptions = convert(options, config);

            assert.equal(reqOptions.download, 'zip');
        });

        it('sets destination folder param', function () {
            const reqOptions = convert(options, config);

            assert.equal(reqOptions.dest, options.dest);
        });

        it('sets a list of fonts, subsets and variants, identified by id, to download', function () {
            const reqOptions = convert(options, config);
            const expected = {
                'droid_sans': {
                    subsets: 'latin,latin-ext',
                    variants: 'regular,700'
                },
                'arvo': {
                    subsets: 'latin',
                    variants: 'regular,700'
                },
                'sans': {
                    subsets: 'latin-ext',
                    variants: 'regular,700'
                }
            };

            assert.deepEqual(reqOptions.fonts, expected);
        });

        it('pass through the font API params', function () {
            const reqOptions = convert(options, config);

            assert.deepEqual(reqOptions.fontAPI, config.fontAPI);
        });
    });
});
