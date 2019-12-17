var passport = require('passport');
var Usuario = require('../../models/Usuario')
var auth = require('../../middleware/auth');
var router = require('express').Router();

router.get('/user', auth.required, function (req, res, next) {
  Usuario.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    return res.json({ usuario: user.toAuthJSON() });
  }).catch(next);
});

router.post('/findUsuario', (req, res) => {
  Usuario.findOne({ nome: req.body.nome, senha: req.body.senha }, (err, result) => {
    if (err) return res.json({ logged: false, error: err });
    if (!result) {
      return res.json({ logged: false });
    }

    usuario = new Usuario()
    const token = usuario.generateAuthToken();
    res.header("x-auth-token", token).send({
      _id: usuario._id,
      nome: usuario.nome
    });
  }
  );
});

router.post('/putUsuario', (req, res) => {
  let data = new Usuario();

  const { login, senha } = req.body;

  if ((!login || !senha)) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.login = login;
  data.senha = senha;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

/**
 * @author Gustavo Carvalho
 * @since 13/12/2019
 */
router.post('/login', function (req, res, next) {
  // user = {}
  // if(!req.body.login){
  //   return res.status(422).json({errors: {login: "não pode ser vazio"}});
  // } else {
  //   user.login = req.body.login
  // }

  // if(!req.body.senha){
  //   return res.status(422).json({errors: {senha: "não pode ser vazio"}});
  // }
  // console.log(user);

  passport.authenticate('local', { session: false }, function (err, user, info) {
    if (err) { return next(err); }

    console.log(req);

    if (user) {
      user.token = user.generateJWT();
      return res.json({ user: user.toAuthJSON() });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

module.exports = router
