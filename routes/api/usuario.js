const passport = require('passport');
const UsuarioModel = require('../../models/Usuario').UsuarioModel;
const auth = require('../../middleware/auth');
const router = require('express').Router();

/**
 * @method READ
 */
router.get('/findAllUsuario', auth.required, function (req, res, next) {
  UsuarioModel.find((err, data) => {
    return res.json({ success: true, data: data })
  })
});

/**
 * @method READ
 */
router.post('/findUsuario', auth.optional, (req, res) => {
  UsuarioModel.findOne({ nome: req.body.nome, senha: req.body.senha }, (err, result) => {
    if (err) return res.json({ logged: false, error: err });
    if (!result) {
      return res.json({ logged: false });
    }

    usuario = new UsuarioModel()
    const token = usuario.generateAuthToken();
    res.header("x-auth-token", token).send({
      _id: usuario._id,
      nome: usuario.nome
    });
  }
  );
});

/**
 * @method CREATE
 */
router.post('/putUsuario', auth.optional, (req, res) => {
  var usuario = new UsuarioModel();

  if ((!req.body.login || !req.body.senha)) {
    return res.status(422).json({ errors: { login: "não pode ser vazio", senha: "não pode ser vazio" } })
  }

  usuario.login = req.body.login;
  usuario.setPassword(req.body.senha);
  usuario.nome = req.body.nome;
  usuario.acesso = 2; // 2 = normal user

  usuario.save((err) => {
    if (err) return res.json({ success: false, error: err });

    console.log('new user created!');

    return res.json({ success: true });
  });
});

/**
 * @method LOGIN
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

/**
 * @method DELETE
 */
router.get('/deleteUsuario/:id', auth.required, function (req, res, next) {
  console.log(req.params);
  
  UsuarioModel.deleteOne({ _id: req.params.id }, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

/**
 * @method UPDATE
 */
router.post('/updateUsuario', auth.required, (req, res) => {
  const { id, update } = req.body;
  if (!update.login || !update.senha || !update.nome) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  update.setPassword(update.senha);
  UsuarioModel.update({ _id: id }, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

module.exports = router;
