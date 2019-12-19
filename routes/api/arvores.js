const ArvoreModel = require('../../models/Arvore').ArvoreModel;
const auth = require("../../middleware/auth");
const router = require('express').Router();
const fs = require('fs');

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
    if (!req.body.id || !req.body.nome || !req.body.descricao || !req.files[0].path) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }

    let update = {
        img: {
            data: null,
            contentType: null
        }
    }
    update.nome = req.body.nome;
    update.descricao = req.body.descricao;
    update.img.data = fs.readFileSync(req.files[0].path);
    update.img.contentType = 'image/png';

    console.log(update, req.body.id)

    ArvoreModel.updateOne({ _id: req.body.id }, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });

    fs.unlinkSync(req.files[0].path);
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

    if (!req.body.nome || !req.body.descricao || !req.files[0].path) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }

    arvore.nome = req.body.nome;
    arvore.descricao = req.body.descricao;
    arvore.img.data = fs.readFileSync(req.files[0].path);
    arvore.img.contentType = 'image/png';

    arvore.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });

    fs.unlinkSync(req.files[0].path);
});

module.exports = router;