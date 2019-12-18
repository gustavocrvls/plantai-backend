const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan')
const passport = require('passport')
const morgan = require('morgan')
const dotenv = require('dotenv');
const multer = require('multer')
const API_PORT = process.env.PORT || 3001;
// const API_PORT = 3001

dotenv.config();

var app = express();
app.set('port', API_PORT)

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));
app.use(multer({
    dest: './uploads/',
    rename: function (fieldname, filename) {
        return filename;
    },
}).any());
app.use(
    session({
        secret: 'secret',
        saveUninitialized: true,
        resave: true,
        // using store session on MongoDB using express-session + connect
        // store: new MongoStore({
        //     url: config.urlMongo,
        //     collection: 'sessions'
        // })
    })
)

require('../models/Usuario');
require('../config/passport');
app.use(require('../routes/'));
app.use(passport.initialize());
app.use(passport.session());

module.exports = app;