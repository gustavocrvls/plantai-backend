const Arvore = require('../../models/Arvore');
const auth = require("../../middleware/auth");
var router = require('express').Router();


router.get('/findAllArvore', (req, res) => {
    Arvore.find((err, data) => {
        return res.json({ success: true, data: data })
    });
});

router.get('/countArvores', (req, res) => {
    Arvore.countDocuments({}, (err, c) => {
        return res.json({count: c})
    })
});

router.post('/arvore/updateArvore', (req, res) => {
    const { id, update } = req.body;
    if (!update.nome || !update.descricao || !update.link_img) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }
    Arvore.update({ _id: id }, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.delete('/arvore/deleteArvore', auth.required, (req, res) => {
    const { id } = req.body;
    Arvore.deleteOne({ _id: id }, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

router.post('/arvore/putArvore', (req, res) => {
    let arvore = new Arvore();

    const { nome, descricao, link_img } = req.body;

    if (!nome || !descricao || !link_img) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }

    arvore.nome = nome;
    arvore.link_img = link_img;
    arvore.descricao = descricao;

    arvore.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

module.exports = router