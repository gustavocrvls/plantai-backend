var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');

passport.use(new LocalStrategy({
  usernameField: 'user[login]',
  passwordField: 'user[senha]'
}, function(login, senha, done) {
  Usuario.findOne({login: login}).then(function(user){
    if(!user || !user.validPassword(senha)){
      return done(null, false, {errors: {'login or password': 'is invalid'}});
    }

    return done(null, user);
  }).catch(done);
}));

