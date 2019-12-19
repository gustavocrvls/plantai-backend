const Postagem = require('../../models/Postagem').PostagemModel;
const router = require('express').Router();

router.get('/postagem/findAllPostagem', (req, res) => {
    Postagem.find((err, data) => {
        return res.json({success: true, data: data})
    });
});

router.post('/postagem/findPostagem', (req, res) => {
    // TODO
});

router.post('/postagem/putPostagem', (req, res) => {
    // TODO
});

module.exports = router;
