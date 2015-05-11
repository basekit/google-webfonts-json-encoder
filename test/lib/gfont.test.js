'use strict';

const assert = require('assert');
const gfont = require('../../lib/gfont');

describe('Gfonts', function () {
});

describe('Gfont', function () {
    describe('id', function () {
        it('returns a lowercase version of the font name', function () {
            const fontDef = {
                "family": "Antic",
            };
            const font = gfont.getFont(fontDef);

            assert.equal(font.id, 'antic');
        });

        it('converts spaces to _', function () {
            const fontDef = {
                "family": "Droid Sans",
            };
            const font = gfont.getFont(fontDef);

            assert.equal(font.id, 'droid_sans');
        });

        it('converts + to _', function () {
            const fontDef = {
                "family": "Droid+Sans",
            };
            const font = gfont.getFont(fontDef);

            assert.equal(font.id, 'droid_sans');
        });
    });

    describe('family', function () {
        it('returns the font name', function () {
            const fontDef = {
                "family": "Droid Sans",
            };
            const font = gfont.getFont(fontDef);

            assert.equal(font.family, 'Droid Sans');
        });
    });
});
