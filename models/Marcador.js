const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MarcadorSchema = new Schema(
    {
        nome: String,
        coords: {
            lat: Number,
            lng: Number
        }
    },
    {timestamps: true}
);

module.exports.MarcadorModel = mongoose.model("arvore", MarcadorSchema, 'arvore');
