const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fs = require('fs');

const ImageSchema = new Schema(
    {
        target_id: String,
        type: String,
        img: 
        { 
            data: Buffer, 
            contentType: String 
        }
    },
    { timestamps: true }
);

module.exports.ImageModel = mongoose.model("Image", ImageSchema, 'image');
