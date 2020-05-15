const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const eventSchema = new Schema(
    {
        attendee: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        date: {
            type: Date,
            required: [true, "Events must have a date"]
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                required: [true, "Must specify a point"]
            },
            coordinates: {
                type: Number,
                required: [true, "Must specify coordinates"]
            }

        }
    },
    { timestamps: true }
)

module.exports = model("Event", eventSchema);