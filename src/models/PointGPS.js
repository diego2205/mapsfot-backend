const mongoose = require("mongoose");

const pointGPSSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("PointGPS", pointGPSSchema); 