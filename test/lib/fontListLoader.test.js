// describe('fontListLoader', function () {
//     'use strict';

//     const fontListLoader = require('../../lib/fontListLoader');

//     describe('load', function () {
//        it('uses the appropiate loader depending on a config option', function () {
//            const mockery = require('mockery');
//            const sinon = require('sinon');
//            const path = 'dummy/path';
//            const config = {
//                fontListFormat: 'bkYaml'
//            };
//            let fakeLoader = {
//                load: function () {}
//            };
//            let bkYamlLoader = sinon.mock(fakeLoader);

//            mockery.enable();
//            mockery.registerMock('./bkYamlLoader', bkYamlLoader);

//            bkYamlLoader.expects('load').once().withArgs(path);

//            fontListLoader.load(path, config);

//            bkYamlLoader.verify();

//            mockery.disable();
//        });
//     });
// });
