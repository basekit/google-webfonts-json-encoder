describe('fontRequester', function () {
    'use strict';

    const assert = require('assert');
    const mockery = require('mockery');
    const sinon = require('sinon');
    const fs = require('fs');

    describe('download', function () {
        const fontList = [
            {
                kind: 'webfonts#webfont',
                family: 'ABeeZee',
                category: 'sans-serif',
                variants: [ 'regular', 'italic' ],
                subsets: [ 'latin' ],
                version: 'v4',
                lastModified: '2015-04-06',
                files: {
                    regular: 'http://fonts.gstatic.com/s/abeezee/v4/mE5BOuZKGln_Ex0uYKpIaw.ttf',
                    italic: 'http://fonts.gstatic.com/s/abeezee/v4/kpplLynmYgP0YtlJA3atRw.ttf'
                }
            },
            {
                kind: 'webfonts#webfont',
                family: 'Abel',
                category: 'sans-serif',
                variants: [ 'regular' ],
                subsets: [ 'latin' ],
                version: 'v6',
                lastModified: '2015-04-06',
                files: { regular: 'http://fonts.gstatic.com/s/abel/v6/RpUKfqNxoyNe_ka23bzQ2A.ttf' }
            },
            {
                kind: 'webfonts#webfont',
                family: 'Abril Fatface',
                category: 'display',
                variants: [ 'regular' ],
                subsets: [ 'latin', 'latin-ext' ],
                version: 'v8',
                lastModified: '2015-04-06',
                files: { regular: 'http://fonts.gstatic.com/s/abrilfatface/v8/X1g_KwGeBV3ajZIXQ9VnDojjx0o0jr6fNXxPgYh_a8Q.ttf' }
            }
        ];
        let download;
        const destFolder = './fontTest';

        beforeEach(function (done) {
            let fakeApi = {
                requestList: sinon.stub().returns(new Promise((resolve, reject) => { return resolve(fontList) })),
                requestFile: sinon.stub()
            };

            fs.mkdir(destFolder, done);

            mockery.enable({
                warnOnUnregistered: false
            });

            mockery.registerMock('./api', fakeApi);

            download = require('../../lib/fontRequester').download;
        });

        afterEach(function (done) {
            fs.rmdir(destFolder, done);
            mockery.disable();
        });

        it('displays  an error if dest folder doesn\'t exist', function (done) {
            const options = {
                fontAPI: {},
                dest: 'noExistence'
            };

            download(options).catch((err) => {;
                assert.equal(err.message, 'Dest folder doesn\'t exist');
                done();
            });
        });
    });
});
