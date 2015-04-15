describe('fontListLoader', function () {
    'use strict';

    const fontListLoader = require('../../lib/fontListLoader');

    describe('load', function () {
       it('uses the appropiate loader depending on a config option', function () {
           const mockery = require('mockery');
           const sinon = require('sinon');
           const assert = require('assert');
           const path = 'dummy/path';
           const config = {
               fontListFormat: 'bkYaml'
           };
           let fakeLoader = {
               load: sinon.spy()
           };

           mockery.enable({
               warnOnUnregistered: false
           });
           mockery.registerMock('./bkYamlLoader', fakeLoader);

           fontListLoader.load(path, config);

           assert(fakeLoader.load.withArgs(path).calledOnce);

           mockery.disable();
       });
    });
});
