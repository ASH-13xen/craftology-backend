import mongoose from "mongoose";

const ScrapbookSchema = new mongoose.Schema(
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
    insta_reel: {
      type: String,
      required: false,
    },
    video_link: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false, // Optional
    },
  },
  {
    // Adds createdAt and updatedAt
    timestamps: true,

    // Maps _id to id in JSON response
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  },
);

// Prevent model overwrite error in Next.js
const Scrapbook =
  mongoose.models.Scrapbook || mongoose.model("Scrapbook", ScrapbookSchema);

export default Scrapbook;
