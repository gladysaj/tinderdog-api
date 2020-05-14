const mongoose = require("mongoose");
const { Schema } = mongoose;

const matchSchema = new Schema({
  idRequesterDog: {
    type: Schema.Types.ObjectId,
    ref: "Dog.js",
  },
  idRequestedDog: {
    type: Schema.Types.ObjectId,
    ref: "Dog.js",
  },
  idMatch: {
    type: Schema.Types.ObjectId,
    ref: "Dog.js",
  },
  status: {
    enum: ["Like", "Dislike", "Pending"],
    type: String,
    default: "Pending",
  },
});

module.exports = mongoose.model("Match", matchSchema);
