const mongoose = require("mongoose");
const { Schema, model } = mongoose;

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
    required: [true, "Debes agregar un contraseña"],
  },
  location: {
    type: String,
  }
});

module.exports = model("User", userSchema);
