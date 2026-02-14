import express from "express";
import {
  getEnvelopes,
  getCoins,
  getGaddis,
  getResin,
  getScrapbooks,
  getWorkshops,
  // --- NEW IMPORTS ---
  getTorans,
  getTags,
} from "../controllers/fetchController.js";

const router = express.Router();

// Define specific routes for fetching data
// These will be prefixed with /api in index.js

router.get("/envelopes", getEnvelopes);
router.get("/coins", getCoins);
router.get("/gaddis", getGaddis);
router.get("/resin", getResin);
router.get("/scrapbooks", getScrapbooks);
router.get("/workshops", getWorkshops);

// --- NEW ROUTES ---
// IMPORTANT: This creates the endpoint /api/torans and /api/tags
router.get("/torans", getTorans);
router.get("/tags", getTags);

export default router;
