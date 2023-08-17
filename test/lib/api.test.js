describe('api', function () {
    'use strict';

    const assert = require('assert');
    const mockery = require('mockery');
    const sinon = require('sinon');

    describe('requestList', function () {
        it('returns an error if no Google API Key is passed as a param', function (done) {
            const fetch = function () {};

            mockery.enable({
                warnOnUnregistered: false
            });

            mockery.registerMock('node-fetch', fetch);
            const requestList = require('../../lib/api').requestList;
            const apiParams = {
                endpoint: 'http://www.example.com',
                keyParam: 'api',
                keyEnv: 'this_test_GOOGLE_API_KEY'
            };

            assert.throws(() => requestList(apiParams), /No Google API key found/);

            mockery.disable();
            done();
        });
    });
});
