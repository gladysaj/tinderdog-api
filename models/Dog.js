const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const dogSchema = new Schema(
    {
        owner: {
            type: Schemas.Types.ObjectId,
            ref: "User"
        },
        foster: {
            type: Boolean,
            default: false
        },
        name: {
            type: String,
            required: [true, "A dog must have a name"]
        },
        breed: {
            type: String,
            enum: [
                "German Sheperd",
                "French Bulldog",
                "Mixed"
            ],
            default: ["Mixed"],
            required: [true, "A dog must have a breed"]
        },
        age: {
            type: Number,
            max: 20,
            required: [true, "Must speficy an age"]
        },
        gender: {
            type: String,
            enum: ["Male", "Female"],
            required: [true, "Must specify a gender"]
        },
        color: {
            type: String,
            enum: ["Black", "Brown", "Amber", "Gray", "White"]
        },
        image: {
            type: String, 
            required: [true, "You need to add an image"]
        },
        description: {
            type: String,
            minlength: [50, "Description must be min 50 characters"],
        },
        likes: {
            type: [Schemas.Types.ObjectId]
        }
    },
    { timestamps: true }
)

module.exports = model('Dog', dogSchema);