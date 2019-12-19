const mongoose = require("mongoose");
const config = require("config");
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;
const crypto = require('crypto')

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema(
  {
    id: Number,
    login: String,
    nome: String,
    acesso: Number,
    score: 0,
    salt: String,
    hash: String
  },
  { timestamps: true }
  
);

UsuarioSchema.methods.validPassword = function(senha) {
  var hash = crypto.pbkdf2Sync(senha, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
  // TODO validação
};

UsuarioSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

//custom method to generate authToken 
UsuarioSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ login: this.login}, config.get('myprivatekey')); //get the private key from the config file -> environment variable
  return token;
}

UsuarioSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    login: this.login,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

UsuarioSchema.methods.toAuthJSON = function(){
  return {
    login: this.login,
    contato: this.contato,
    token: this.generateJWT()
  };
};

module.exports = mongoose.model("Usuario", UsuarioSchema, 'usuario');