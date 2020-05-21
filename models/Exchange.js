const mongoose = require("mongoose");
const { Schema } = mongoose;

const exchangeSchema = new Schema(
  {
    applicantDog: {
      type: Schema.Types.ObjectId,
      ref: "Dog",
      required: true,
    },
    requestedDog: {
      type: Schema.Types.ObjectId,
      ref: "Dog",
      required: true, 
    },
    status: {
      enum: ["Like", "Dislike", "Match"],
      type: String,
      default: "Like",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exchange", exchangeSchema);


