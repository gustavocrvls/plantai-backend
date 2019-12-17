const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArvoreSchema = new Schema(
  {
    id: Number,
    id_especie: Number,
    id_usuario: Number,
    fotos: Array,
    localizacao: {
      lat: Number,
      lng: Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("arvore", ArvoreSchema, 'arvore');
