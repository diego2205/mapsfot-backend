# MapsFot Backend API

Backend REST desarrollado con **Node.js + Express + MongoDB** para gestionar cables/camaras y sus puntos GPS, utilizado por una aplicación Android con integración en Google Maps.

---

## Descripción

Este proyecto expone una API REST para:

- autenticar un usuario generico,
- listar cables,
- obtener puntos GPS asociados a un cable,
- editar y eliminar puntos GPS.

Fue desarrollado como backend para una aplicación Android demo que permite visualizar rutas y puntos georreferenciados sobre Google Maps.

---

## 🚀 Tecnologías utilizadas

- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**
- **JWT (JSON Web Token)**
- **bcrypt**
- **Render** (deploy)
- **GitHub** (repositorio)

---

## 🧩 Funcionalidades principales

- Login de usuarios con JWT
- Gestión de cables
- Obtención de puntos GPS por cable
- Edición de puntos GPS
- Eliminación de puntos GPS
- Integración con frontend Android

---

## 📂 Estructura del proyecto

```bash
src/
├── controllers/
│   ├── authController.js
│   └── cableController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── User.js
│   ├── Cable.js
│   └── PointGPS.js
├── routes/
│   ├── authRoutes.js
│   └── cableRoutes.js
├── config/
│   └── db.js
└── app.js
