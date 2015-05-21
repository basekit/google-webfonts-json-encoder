describe('api', function () {
    'use strict';

    const assert = require('assert');
    const mockery = require('mockery');
    const sinon = require('sinon');

    describe('requestList', function () {
        it('returns an error if no Google API Key is passed as a param', function (done) {
            const request = function () {};

            mockery.enable({
                warnOnUnregistered: false
            });

            mockery.registerMock('request', request);
            const requestList = require('../../lib/api').requestList;
            const apiParams = {
                endpoint: 'http://www.example.com',
                keyParam: 'api',
                keyEnv: 'this_test_GOOGLE_API_KEY'
            };

            requestList(apiParams).catch((err) => {
                assert.equal(err.message, 'No Google API key found');
                mockery.disable();
                done();
            });
        });
    });
});
