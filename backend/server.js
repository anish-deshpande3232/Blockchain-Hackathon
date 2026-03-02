// Basic API

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// ─────────────────────────
// MongoDB Connection
// ─────────────────────────

mongoose.connect("mongodb://localhost:27017/provenance");

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

// ─────────────────────────
// Schema
// ─────────────────────────

const batchMetaSchema = new mongoose.Schema({
  batchId: { type: String, required: true, index: true },
  industryType: String,
  producerName: String,
  origin: String,
  productName: String,
  quantity: Number,
  unit: String,
  events: [{
    role: String,
    actor: String,
    action: String,
    metadataHash: String,
    photoHashes: [String],
    notes: String,
    timestamp: Date,
  }],
  createdAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
});

const BatchMeta = mongoose.model("BatchMeta", batchMetaSchema);

// ─────────────────────────
// Test Route
// ─────────────────────────

app.get("/", (req, res) => {
  res.json({ message: "Backend running successfully" });
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});