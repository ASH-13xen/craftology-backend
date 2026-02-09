import mongoose from "mongoose";

const WorkshopSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
    },
    subtitle: {
      type: String,
      required: [true, "Please provide a subtitle"],
      trim: true,
    },
    date: {
      type: String, // Keeping as String as requested (e.g., "Oct 24, 2024")
      required: [true, "Please provide a date"],
    },
    time: {
      type: String,
      required: [true, "Please provide a time"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
    },
    locationName: {
      type: String,
      required: [true, "Please provide a location name"],
    },
    locationAddress: {
      type: String,
      required: [true, "Please provide a location address"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    image: {
      type: String,
      required: [true, "Please provide an image URL"],
    },
    mapEmbedUrl: {
      type: String,
      required: [true, "Please provide the map embed URL"],
    },
    mapLink: {
      type: String,
      required: [true, "Please provide the Google Maps link"],
    },
    features: {
      type: [String], // Array of strings
      default: [],
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
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
);

// Prevent model overwrite error in Next.js
const Workshop =
  mongoose.models.Workshop || mongoose.model("Workshop", WorkshopSchema);

export default Workshop;
