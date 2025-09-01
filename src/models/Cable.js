const mongoose = require("mongoose");

const cableSchema = new mongoose.Schema({
  name: { type: String, required: true },
  points: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "PointGPS",
    default:[]
  }]
}, { timestamps: true });

module.exports = mongoose.model("Cable", cableSchema); 