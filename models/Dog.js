const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const dogSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A dog must have an owner"],
  },
  foster: {
    type: Boolean,
    default: false,
    required: [true, "Must specify the type of dog"],
  },
  name: {
    type: String,
    required: [true, "A dog must have a name"]
  },
  breed: {
    type: String,
    enum: [
      "Mixed",
      "Chihuahua",
      "Dachshund",
      "German Shepherd",
      "Golden Retriever",
      "Labrador Retriever",
      "Schnauzer",
      "Shiba Inu",
      "Siberian Husky",
      "Xoloitzcuintli",
      "Yorkshire Terrier",
    ],
    default: "Mixed",
    required: [true, "A dog must have a breed"]
  },
  age: {
    type: String,
    enum: ["Puppy", "Adult", "Senior"],
    required: [true, "Must speficy an age"]
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: [true, "Must specify a gender"]
  },
  color: {
    type: String,
    enum: ["Black", "Brown", "Amber", "Gray", "White"]
  },
  image: {
    type: String, 
    required: [true, "You need to add an image"]
  },
  description: {
    type: String,
    minlength: [50, "Description must be min 50 characters"],
  },
  liked: {
    type: [Schema.Types.ObjectId]
  },
  match: {
    type: [Schema.Types.ObjectId]
  },
  myLikes: {
    type: [Schema.Types.ObjectId],
  },
  myDislikes: {
    type: [Schema.Types.ObjectId],
  }
}, { timestamps: true });

module.exports = model('Dog', dogSchema);