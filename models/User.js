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
  phoneNumber: {
    type: Number,
    minlength: [10, "Phone number must have 10 digits"],
    required: true,
  },
  description: {
    type: String,
    minlength: [50, "Description must be min 50 characters"],
  },
  password: {
    type: String,
    required: [true, "Debes agregar un contraseña"],
  },
  location: {
    type: {
        type: String,
        enum: ['Point'],
        required: [true, "Must specify a point"]
    },
    coordinates: {
        type: [Number],
        required: [true, "Must specify coordinates"]
    }
  }
},
{ timestamps: true }
);

module.exports = model("User", userSchema);
