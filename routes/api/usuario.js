var passport = require('passport');
var Usuario = require('../../models/Usuario')
var auth = require('../../middleware/auth');
var router = require('express').Router();

// router.get('/findAllUsuario', auth.required, function (req, res, next) {
//   Usuario.findById(req.payload.id).then(function (user) {
//     if (!user) { return res.sendStatus(401); }

//     return res.json({ usuario: user.toAuthJSON() });
//   }).catch(next);
// });

router.get('/findAllUsuario', auth.required, function (req, res, next) {
  Usuario.find((err, data) => {
    return res.json({ success: true, data: data })
  })
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
  var usuario = new Usuario();

  if ((!req.body.login || !req.body.senha)) {
    return res.status(422).json({ errors: { login: "não pode ser vazio", senha: "não pode ser vazio" } })
  }

  usuario.login = req.body.login
  usuario.setPassword(req.body.senha)
  usuario.nome = req.body.nome
  usuario.acesso = 1

  console.log(usuario);


  usuario.save((err) => {
    if (err) return res.json({ success: false, error: err });

    console.log('new user created!');

    return res.json({ success: true });
  });
});

/**
 * @author Gustavo Carvalho
 * @since 13/12/2019
 */
router.post('/login', function (req, res, next) {
  if (!req.body.user.login) {
    return res.status(422).json({ errors: { login: "não pode ser vazio" } });
  }

  if (!req.body.user.senha) {
    return res.status(422).json({ errors: { senha: "não pode ser vazio" } });
  }

  passport.authenticate('local', { session: false }, function (err, user, info) {
    if (err) { return next(err); }

    console.log(req.body['user']);

    if (user) {
      user.token = user.generateJWT();
      return res.json({ user: user.toAuthJSON() });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.get('/deleteUsuario/:id', auth.required, function (req, res, next) {
  console.log(req.params);
  
  Usuario.deleteOne({ _id: req.params.id }, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

module.exports = router
