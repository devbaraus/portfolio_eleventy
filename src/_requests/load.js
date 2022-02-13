const { writeDataStream } = require('./requests');
const { copyFileSync } = require('fs')
const { resolve } = require('path')
require('dotenv').config();

const loads = ['repos', 'articles', 'projects', 'sides'];

if (process.env.NODE_ENV == 'development') {
    loads.map(async req => {
        const item = await (require(`./${req}`))();
        writeDataStream(`../_data/${req}.json`, item.slice(0, 3))
        delete item;
    })
} else {
    loads.map(async req => {
        copyFileSync(resolve(__dirname, `./${req}.js`), resolve(__dirname, `../_data/${req}.js`));
    })
}