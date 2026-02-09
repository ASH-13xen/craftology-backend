import express from "express";
import { addData, getData } from "../controllers/mainController.js";

const router = express.Router();

// Route Structure: /api/:type
// Example: POST /api/coin -> Adds a coin
// Example: GET  /api/envelope -> Gets all envelopes

router.post("/:type", addData); // Create
router.get("/:type", getData); // Read

export default router;
