const Marcador = require('/models/Marcador').MarcadorModel;
const auth = require("../../middleware/auth");


module.exports = function (app) {
    app.get('/marcador/getAllMarcador', (req, res) => {
        Marcador.find((err, data) => {
            return res.json({ success: true, data: data })
        });
    });

}