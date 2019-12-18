const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema(
    {
        img: 
        { 
            data: Buffer, 
            contentType: String 
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Image", ImageSchema, 'image');
