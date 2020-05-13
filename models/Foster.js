const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const fosterSchema = new Schema (
   {
     user: {
       type: Schema.Types.ObjectId,
       ref: "User",
       required: true,
     },
     name: {
       type: String, 
       required: [true, "You need to add a name"]
     },
     gender: {
       type: String, 
       enum: ["Male", "Female"],
       required: [true, "You need to select the gender"]
     },
     breed: {
       type: String,
       enum: ["German Sheperd", "French Bulldog", "Mixed", "Other"],
       default: ["Other"],
       required: true
     },
     age: {
       type: Number,
       max: 20
     },
     image: {
       type: String, 
       required: [true, "You need to add an image"]
     },
     color: {
       type: String
     },
     location: {
       type: String, 
       required: [true, "You need to add a location"]
     },
    },
     { timestamps: true }
)

module.exports = model("Foster", fosterSchema);