const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Acceso denegado. Token requerido." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // datos del usuario quedan disponibles en la request
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token inválido o expirado." });
  }
}; 