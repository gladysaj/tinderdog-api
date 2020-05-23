const mongoose = require("mongoose");
const { Schema } = mongoose;

const matchSchema = new Schema({
 dogs: {
   type: [Schema.Types.ObjectId],
   required: true
 },
}, { timestamps: true });

module.exports = mongoose.model("Match", matchSchema);
