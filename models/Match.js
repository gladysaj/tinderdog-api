const mongoose = require("mongoose");
const { Schema } = mongoose;

const matchSchema = new Schema({
 dogOne: {
   type: Schema.Types.ObjectId,
   required: true
 },
 dogTwo: {
   type: Schema.Types.ObjectId,
   required: true
 },
}, { timestamps: true });

module.exports = mongoose.model("Match", matchSchema);
