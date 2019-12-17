const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostagemSchema = new Schema(
  {
    id: Number,
    id_usuario: Number,
    conteudo: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("postagem", PostagemSchema, 'postagem');
