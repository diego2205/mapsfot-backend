//require("dotenv").config();
const app = require("./app");

// Puerto desde .env o 3000 por defecto
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
}); 