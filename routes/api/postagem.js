const Postagem = require('../../models/Postagem')

module.exports = function (app) {
    /**
     * @author Gustavo Carvalho
     * @since 12/12/2019
     * @returns arquivo json contendo todas as postagens do banco
     */
    app.get('/postagem/findAllPostagem', (req, res) => {
        Postagem.find((err, data) => {
            return res.json({ success: true, data: data })
        });
    });

    /**
     * @author Gustavo Carvalho
     * @since 12/12/2019
     */
    app.post('/postagem/findPostagem', (req, res) => {
        // TODO
    });

    /**
     * @author Gustavo Carvalho
     * @since 12/12/2019
     */
    app.post('/postagem/putPostagem', (req, res) => {
        let data = new Postagem();

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

}