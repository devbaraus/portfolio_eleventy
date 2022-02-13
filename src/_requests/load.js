const { writeDataStream } = require('./requests');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    const repos = require('./repos');
    console.log(repos[0])
} else {

}