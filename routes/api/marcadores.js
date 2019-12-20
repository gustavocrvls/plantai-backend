const Marcador = require('../../models/Marcador').MarcadorModel;
const router = require('express').Router();
const auth = require("../../middleware/auth");


router.get('/findAllMarcador', (req, res) => {
    Marcador.find((err, data) => {
        return res.json({success: true, data: data})
    });
});

module.exports = router;
