const mongoose = require("mongoose");
const { Schema } = mongoose;

const matchSchema = new Schema({
  idRequesterDog: {
    type: Schema.Types.ObjectId,
    ref: "Dog",
  },
  idRequestedDog: {
    type: Schema.Types.ObjectId,
    ref: "Dog",
  },
  match: {
    type: Schema.Types.ObjectId,
    ref: "Dog",
  },
  status: {
    enum: ["Like", "Dislike", "Pending"],
    type: String,
    default: "Pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("Match", matchSchema);
