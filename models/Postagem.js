const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostagemSchema = new Schema(
    {
        id_usuario: Number,
        conteudo: String,
    },
    {timestamps: true}
);

module.exports.PostagemModel = mongoose.model("postagem", PostagemSchema, 'postagem');
