const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cableRoutes = require("./routes/cableRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
console.log("JWT_Secret", process.env.JWT_SECRET);
const app = express();

app.use(cors());
// Middlewares
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/cables", cableRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));

module.exports = app; 
