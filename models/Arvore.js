const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArvoreSchema = new Schema(
    {
        nome: String,
        descricao: String,
        img:
            {
                data: Buffer,
                contentType: String
            }
    },
    {timestamps: true}
);

module.exports.ArvoreModel = mongoose.model("arvore", ArvoreSchema, 'arvore');
