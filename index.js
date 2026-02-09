import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";

// Import Route Files
import mainRoutes from "./routes/mainRoute.js"; // Keep this for adding data (POST)
import fetchRoutes from "./routes/fetchRoute.js"; // Use this for fetching data (GET)

// 1. Config
dotenv.config({ path: ".env.local" }); // Load env vars
const app = express();
const PORT = process.env.PORT || 5000;

// 2. Middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
); // Allow frontend to talk to backend
app.use(express.json()); // Parse JSON bodies

// 3. Connect to Database
connectDB();

// 4. Routes
// Mount the fetch routes (e.g., localhost:5000/api/envelopes)
app.use("/api", fetchRoutes);

// Mount the main routes (e.g., localhost:5000/api/add/envelope)
// Note: Ensure mainRoute.js handles paths that don't conflict, or put it under a sub-path
app.use("/api", mainRoutes);

// 5. Base Route (Health Check)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 6. Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
