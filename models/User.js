const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Debes agregar un nombre"],
  },
  email: {
    type: String,
    required: [true, "Debes agregar un email"],
    validate: {
      message: "El email ya está en uso",
      validator: async (email) => {
        const items = await mongoose.models["User"].count({ email });
        return items < 1;
      },
    },
  },
  password: {
    type: String,
    required: [true, "Debes de agregar una contraseña"],
  },
  age: {
    type: Number,
    required: [true, "Debes de agregar la edad"],
  },
  gender: {
    type: String,
    required: [true, "Debes especificar el genero"],
  },
  breed: {
    type: String,
  },
  description: {
    type: String,
  },
  profile_picture: {
    type: String,
    required: [true, "Agrega unas cuentas fotos"],
    min: 3,
  },
});

module.exports = mongoose.model("User", userSchema);
