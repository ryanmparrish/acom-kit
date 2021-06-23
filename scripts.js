import blockLoader from './tools/blockLoader.js';

const config = {
    blocks: {
        '.marquee': {
            location: '/blocks/marquee/',
            styles: 'styles.css',
            scripts: 'scripts.js',
        },
        '.merch': {
            location: '/blocks/merch/',
            styles: 'styles.css',
            scripts: 'scripts.js',
        },
        '.tabs': {
            location: '/blocks/tabs/',
            styles: 'styles.css',
            scripts: 'scripts.js',
        },
    },
};

blockLoader(config);
