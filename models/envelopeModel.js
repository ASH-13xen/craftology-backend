import mongoose from "mongoose";

const EnvelopeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
    },
    image: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    insta_reel: {
      type: String,
      required: false,
    },
    video_link: {
      type: String,
      required: false,
    },
    tags: {
      type: [String], // Array of strings
      default: [],
    },
  },
  {
    // Automatically manage createdAt and updatedAt
    timestamps: true,

    // Ensure 'id' is available in JSON output (maps _id to id)
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  },
);

/**
 * mongoose.models.Envelope check is crucial for Next.js
 * to prevent "OverwriteModelError" during hot reloads.
 */
const Envelope =
  mongoose.models.Envelope || mongoose.model("Envelope", EnvelopeSchema);

export default Envelope;
