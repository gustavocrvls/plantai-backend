const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EspecieSchema = new Schema(
  {
    id: Number,
    nome: String,
    descricao: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("especie", EspecieSchema, 'especie');
