const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        email: {
            type: String,
        },
        password: {
            type: String,
            required: [true, "Debes agregar un contraseña"],
        },
    }
)

module.exports = model("User", userSchema);