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

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Backend running successfully" });
});

// Create new batch
app.post("/api/batch", async (req, res) => {
  try {
    console.log("POST /api/batch hit");

    const newBatch = new BatchMeta(req.body);
    await newBatch.save();

    res.json({
      success: true,
      message: "Batch saved successfully",
      data: newBatch
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all batches
app.get("/api/batches", async (req, res) => {
  try {
    const batches = await BatchMeta.find();
    res.json({
      success: true,
      count: batches.length,
      data: batches
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single batch by batchId
app.get("/api/batch/:batchId", async (req, res) => {
  try {
    const { batchId } = req.params;

    const batch = await BatchMeta.findOne({ batchId });

    if (!batch) {
      return res.status(404).json({ error: "Batch not found" });
    }

    res.json({
      success: true,
      data: batch
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Append event to batch
app.post("/api/batch/:batchId/event", async (req, res) => {
  try {
    const { batchId } = req.params;

    const batch = await BatchMeta.findOne({ batchId });

    if (!batch) {
      return res.status(404).json({ error: "Batch not found" });
    }

    const newEvent = {
      role: req.body.role,
      actor: req.body.actor,
      action: req.body.action,
      metadataHash: req.body.metadataHash || "",
      photoHashes: req.body.photoHashes || [],
      notes: req.body.notes || "",
      timestamp: new Date()
    };

    batch.events.push(newEvent);
    batch.lastUpdated = new Date();

    await batch.save();

    res.json({
      success: true,
      message: "Event added successfully",
      data: batch
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Test route
app.get("/api/test", (req, res) => {
  res.send("POST route exists");
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});