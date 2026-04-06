// 1. Importamos las herramientas que instalaste
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Para poder leer el archivo .env

const app = express(); // Creamos la aplicación de Express

// 2. Middlewares (Filtros de seguridad y lectura)
app.use(cors()); // Permite que el frontend se conecte
app.use(express.json()); // Permite que el servidor entienda formato JSON (el estándar de datos)

// 3. Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Conectado a MongoDB local"))
    .catch((err) => console.error("❌ Error de conexión:", err));

// 4. Ruta de prueba (Calculadora base)
app.get('/', (req, res) => {
    res.send("El servidor de Amasol está funcionando 🚀");
});

// Usar las rutas de pedidos
app.use('/api/pedidos', require('./routes/pedidos'));

// 5. Encender el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});