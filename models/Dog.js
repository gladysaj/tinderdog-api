const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const dogSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        breed: {
            type: String,
            enum: ["German Sheperd", "French Bulldog", "Mixed"],
            default: ["Mixed"],
            required: true
        }
    }
)

module.exports = model('Dog', dogSchema);