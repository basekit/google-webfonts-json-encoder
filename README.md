# google-webfonts-json-encoder

Download and encode, as base64 json, google fonts, downloaded from [google-webfonts-helper service](https://github.com/majodev/google-webfonts-helper).
This tool is intended to be used in the build process of BaseKit app, but can be easily adapted to use in any other project).

## Quick guide 

Installation: `npm install google-webfonts-json-encoder`

Usage: `node --harmony gwjencoder -l config/google_fonts.yml -d assets/public/fonts -s=latin,latin-ext -f=woff,woff2`

The minimun version of node needed to run it is 0.12.

Where -l is the path of a yml file listing the desired fonts (legacy format used in the app),
-d is the folder to store the fonts, and -s the desired subsets of fonts.

## How to use
This is intended to be part of an automated build process depending on the required fonts for a given target environment.

The complete list of command line options are:

* l: path to the yml file, defaults to config/google_fonts.yml.

* d: target folder, defaults to current one.

* f: fonts format to download, defaults to woff,woff2,ttf.

## YAML font list
This is an example of our format, if you use another one, just adapt it to your own.

---

fonts:

    latin:

        subset: 'latin'

        fonts:

            - family: 'Droid+Sans'

              size: '400,700'

            - family: 'Arvo'

              size: ''

    'latin-ext': 

        subset: 'latin,latin-ext'

        fonts:

            - family: 'Droid+Sans'

              size: '400,700'

## Disclaimer
The architecture is crap. It lacks test for the most important stuff (downloading and converting the fonts).
It could be more deocupled and it should have used own EventEmitters and pipe all of them. Also it doesn't deal with
any kind of errors.

Use it at your own risk.

## License
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

## Acknowledge
Thanks to [Mario Ranftl](https://github.com/majodev) for his useful service.



