const mongoose = require('mongoose')

module.exports = function (url) {
    mongoose.connect(url, {
        useNewUrlParser: true,
        dbName: 'plantai'
    })

    mongoose.connection.on('error', function () {
        console.log('Sorry, we have a error...');
    })

    mongoose.connection.on('connected', function () {
        console.log('DataBase Conected!');
    })
}
