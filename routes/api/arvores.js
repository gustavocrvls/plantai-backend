const ArvoreModel = require('../../models/Arvore').ArvoreModel;
const auth = require("../../middleware/auth");
const router = require('express').Router();

router.get('/findAllArvore', auth.optional, (req, res) => {
    ArvoreModel.find((err, data) => {
        return res.json({ success: true, data: data })
    });
});

router.get('/findArvore/:id', auth.optional, (req, res) => {
    ArvoreModel.find({ _id: req.params.id }, (err, data) => {
        return res.json(data)
    });
});

router.get('/countArvores', auth.optional, (req, res) => {
    ArvoreModel.countDocuments({}, (err, c) => {
        return res.json({count: c})
    })
});

router.post('/updateArvore', auth.required, (req, res) => {
    const { id, update } = req.body;
    if (!update.nome || !update.descricao || !update.link_img) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }
    ArvoreModel.update({ _id: id }, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.delete('/deleteArvore', auth.required, (req, res) => {
    const { id } = req.body;
    ArvoreModel.deleteOne({ _id: id }, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

router.post('/putArvore', auth.required, (req, res) => {
    let arvore = new ArvoreModel();

    if (!nome || !descricao || !req.files[0].path) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }

    arvore.nome = nome;
    arvore.descricao = descricao;
    arvore.img.data = fs.readFileSync(req.files[0].path);
    arvore.img.contentType = 'image/png';

    arvore.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });

    fs.unlinkSync(req.files[0].path);
});

module.exports = router;