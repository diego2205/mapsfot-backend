const Cable = require("../models/Cable");
const PointGPS = require("../models/PointGPS");

// Crear cable con puntos
exports.createCableWithPoints = async (req, res) => {
  try {
    const { name, points } = req.body;

    if (!name || !points || points.length === 0) {
      return res.status(400).json({ message: "Nombre y puntos son requeridos" });
    }

    // 1. Crear los puntos en la colección
    const createdPoints = await PointGPS.insertMany(points);

    // 2. Obtener los IDs de los puntos creados
    const pointIds = createdPoints.map(p => p._id);

    // 3. Crear el cable con los IDs de los puntos
    const cable = new Cable({
      name,
      points: pointIds
    });

    await cable.save();

    res.status(201).json({
      message: "Cable creado con puntos",
      cable
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creando cable", error });
  }
}; 


// Crear un cable con puntos
exports.createCable = async (req, res) => {
  try {
    const { name, points } = req.body;

    // Primero guardamos los puntos GPS
    const createdPoints = await PointGPS.insertMany(points);

    // Luego creamos el cable referenciando los puntos
    const cable = await Cable.create({
      name,
      points: createdPoints.map(p => p._id)
    });

    res.status(201).json(cable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los cables con sus puntos
exports.getCables = async (req, res) => {
  try {
    const cables = await Cable.find().populate("points");
    res.json(cables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los nomobres de cables 
exports.getCablesNames = async (req, res) => {
  try {
    //Solo el campo name
    const cables = await Cable.find({}, "name");
    res.json(cables);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al optener nombres de cables" });
  }
};

//Obtener los puntos de un cable
exports.getCablePoints = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscamos el cable por id y poblamos sus puntos
    const cable = await Cable.findById(id).populate("points");

    if (!cable) {
      return res.status(404).json({ message: "Cable no encontrado" });
    }

    // Solo devolvemos los puntos GPS
    res.json(cable.points);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener puntos del cable" });
  }
}; 



// Modificar un cable (ej: cambiar nombre)
exports.updateCable = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const cable = await Cable.findByIdAndUpdate(id, { name }, { new: true });
    res.json(cable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un cable y sus puntos asociados
exports.deleteCable = async (req, res) => {
  try {
    const { id } = req.params;

    const cable = await Cable.findById(id);
    if (!cable) return res.status(404).json({ error: "Cable no encontrado" });

    // Eliminar también los puntos del cable
    await PointGPS.deleteMany({ _id: { $in: cable.points } });

    await Cable.findByIdAndDelete(id);

    res.json({ message: "Cable y puntos eliminados" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Agregar un punto GPS a un cable
exports.addPointToCable = async (req, res) => {
  try {
    const { cableId } = req.params;
    const { lat, lng, title, description } = req.body;

    const point = await PointGPS.create({ lat, lng, title, description });

    const cable = await Cable.findByIdAndUpdate(
      cableId,
      { $push: { points: point._id } },
      { new: true }
    ).populate("points");

    res.json(cable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modificar título y/o descripción de un punto GPS
exports.updatePointTitleAndDescription = async (req, res) => {
  try {
    const { pointId } = req.params;
    const { title, description } = req.body;

    // Construimos dinámicamente el objeto de actualización
    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ error: "No se enviaron campos para actualizar" });
    }

    const point = await PointGPS.findByIdAndUpdate(
      pointId,
      { $set: updateFields }, // 🔹 $set asegura solo esos campos
      { new: true, runValidators: true } // 🔹 devuelve actualizado + valida schema
    );

    if (!point) {
      return res.status(404).json({ error: "Punto no encontrado" });
    }

    res.json(point);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 


// Eliminar un punto GPS de un cable
exports.removePointFromCable = async (req, res) => {
  try {
    const { cableId, pointId } = req.params;

    await Cable.findByIdAndUpdate(
      cableId,
      { $pull: { points: pointId } }
    );

    await PointGPS.findByIdAndDelete(pointId);

    res.json({ message: "Punto eliminado del cable" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 
