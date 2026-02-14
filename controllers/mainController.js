// Import all your models here
import Envelope from "../models/envelopeModel.js";
import Coin from "../models/coinModel.js";
import Gaddi from "../models/gaddiModel.js";
import Resin from "../models/resinModel.js";
import Scrapbook from "../models/scrapbookModel.js";
import Workshop from "../models/workshopModel.js";
// --- ADDED THESE IMPORTS ---
import Toran from "../models/toranModel.js";
import Tag from "../models/tagModel.js";

// Map URL slugs to actual Model Objects
const models = {
  envelope: Envelope,
  coin: Coin,
  gaddi: Gaddi,
  resin: Resin,
  scrapbook: Scrapbook,
  workshop: Workshop,
  // --- ADDED THESE MAPPINGS ---
  // The keys here MUST match the endpoint used in frontend (e.g. "/torans" -> "torans")
  torans: Toran,
  tags: Tag,
};

// --- Controller Functions ---

// 1. Add Data (POST)
export const addData = async (req, res) => {
  try {
    const { type } = req.params; // This will be "tags" or "torans" based on your URL
    const Model = models[type];

    if (!Model) {
      return (
        res
          .status(400)
          // This is the error you were seeing. Now it will find the model!
          .json({ success: false, message: `Invalid category: ${type}` })
      );
    }

    // Create the new entry using the data from the body
    const newData = await Model.create(req.body);

    res.status(201).json({
      success: true,
      message: `Successfully added to ${type}`,
      data: newData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Get Data (GET)
export const getData = async (req, res) => {
  try {
    const { type } = req.params;
    const Model = models[type];

    if (!Model) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid category" });
    }

    const data = await Model.find().sort({ createdAt: -1 }); // Newest first

    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
