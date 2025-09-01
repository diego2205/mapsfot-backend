const express = require("express");
const router = express.Router();
const cableController = require("../controllers/cableController");
const authMiddleware = require("../middlewares/authMiddleware")

//Aplica autenticacion a todas las rutas del router
router.use(authMiddleware);

// Rutas REST
router.post("/", cableController.createCableWithPoints);           // Crear cable con puntos
//router.get("/", cableController.getCables);              // Listar cables
router.get("/:id/points", cableController.getCablePoints); // Lista puntos GPS de un cable
router.get("/names", cableController.getCablesNames);       //Lista nobres de cables
router.put("/:id", cableController.updateCable);         // Modificar cable
router.delete("/:id", cableController.deleteCable);      // Eliminar cable y puntos

// Funciones sobre puntos GPS
router.post("/:cableId/points", cableController.addPointToCable);        // Agregar punto
router.put("/points/:pointId", cableController.updatePointTitleAndDescription);  // Modificar titulo y descripción de un punto GPS
router.delete("/:cableId/points/:pointId", cableController.removePointFromCable); // Eliminar punto

module.exports = router; 