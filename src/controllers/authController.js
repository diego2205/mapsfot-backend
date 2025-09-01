const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verifica si ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ msg: "Usuario ya existe" });

    // Crea y guarda usuario
    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Busca usuario
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "Credenciales inválidas" });

    // Compara password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: "Credenciales inválidas" });

    // Genera token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    //console.log(`Login exitoso`);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 
