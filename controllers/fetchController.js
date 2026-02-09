import Envelope from "../models/envelopeModel.js";
import Coin from "../models/coinModel.js";
import Gaddi from "../models/gaddiModel.js";
import Resin from "../models/resinModel.js";
import Scrapbook from "../models/scrapbookModel.js";
import Workshop from "../models/workshopModel.js";

// --- GET Envelopes ---
export const getEnvelopes = async (req, res) => {
  try {
    // Fetches all envelopes, sorted by newest first
    const data = await Envelope.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching envelopes", error: error.message });
  }
};

// --- GET Coins ---
export const getCoins = async (req, res) => {
  try {
    const data = await Coin.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching coins", error: error.message });
  }
};

// --- GET Gaddis ---
export const getGaddis = async (req, res) => {
  try {
    const data = await Gaddi.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching gaddis", error: error.message });
  }
};

// --- GET Resin ---
export const getResin = async (req, res) => {
  try {
    const data = await Resin.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching resin items", error: error.message });
  }
};

// --- GET Scrapbooks ---
export const getScrapbooks = async (req, res) => {
  try {
    const data = await Scrapbook.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching scrapbooks", error: error.message });
  }
};

// --- GET Workshops ---
export const getWorkshops = async (req, res) => {
  try {
    const data = await Workshop.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching workshops", error: error.message });
  }
};
