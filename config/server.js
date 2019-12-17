const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan')
const passport = require('passport')
const morgan = require('morgan')
const dotenv = require('dotenv');
// const API_PORT = process.env.PORT || 3001;
const API_PORT = 3001

module.exports = function () {
    const app = express();
    app.use(cors());
    app.set('port', API_PORT)
    dotenv.config();
    
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(logger('dev'));
    
    app.use(require('method-override')());
    app.use(express.static(__dirname + '/public'));    
    
    require('../models/Usuario');
    require('../config/passport');
    app.use(require('../routes/'));
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    
    return app;
}