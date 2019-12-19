const mongoose = require('mongoose');

module.exports = function (url) {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.DB_NAME
    });

    mongoose.connection.on('error', function () {
        console.log('Sorry, we have a error...');
    });

    mongoose.connection.on('connected', function () {
        console.log('DataBase Connected!');
    })
};
