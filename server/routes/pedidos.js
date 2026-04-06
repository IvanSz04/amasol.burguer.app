const express = require('express');
const router = express.Router();
const Pedido = require('../models/pedido'); // Importamos el modelo (el molde) que creamos antes

// 1. CREATE: Ruta para crear un nuevo pedido
// Usamos POST porque estamos "enviando" información nueva al servidor
router.post('/nuevo', async (req, res) => {
    try {
        // Creamos una instancia del modelo Pedido con los datos que vienen en el cuerpo (body) de la petición
        const nuevoPedido = new Pedido(req.body); 
        // .save() es el comando de Mongoose que inserta el documento en la colección de MongoDB
        const pedidoGuardado = await nuevoPedido.save(); 
        // Respondemos con un estatus 201 (Creado) y devolvemos el objeto que se guardó
        res.status(201).json(pedidoGuardado);
    } catch (error) {
        // Si algo falla (ej: falta un campo obligatorio), enviamos error 400 (Bad Request)
        res.status(400).json({ mensaje: "Error al guardar el pedido", error: error.message });
    }
});

// 2. READ: Ruta para obtener TODOS los pedidos
// Usamos GET porque solo queremos "leer" o "traer" datos
router.get('/todos', async (req, res) => {
    try {
        // .find() sin filtros trae todos los documentos de la colección 'pedidos'
        const listaPedidos = await Pedido.find();
        // Enviamos la lista al frontend en formato JSON
        res.json(listaPedidos);
    } catch (error) {
        // Estatus 500 significa error interno del servidor
        res.status(500).json({ mensaje: "Error al obtener la lista de pedidos" });
    }
});

// 3. UPDATE: Ruta para editar un pedido existente
// Usamos PUT para "actualizar" un recurso. El :id es un parámetro variable en la URL
router.put('/editar/:id', async (req, res) => {
    try {
        // findByIdAndUpdate busca por ID y aplica los cambios del req.body
        // { new: true } le dice a MongoDB: "devuélveme el pedido YA editado, no el viejo"
        const pedidoActualizado = await Pedido.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json(pedidoActualizado);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al actualizar el pedido" });
    }
});

// 4. DELETE: Ruta para borrar un pedido
// Usamos DELETE para "eliminar". También necesitamos el :id para saber cuál borrar
router.delete('/borrar/:id', async (req, res) => {
    try {
        // Buscamos el documento por su ID único y lo removemos de la base de datos
        await Pedido.findByIdAndDelete(req.params.id);
        // Respondemos con un mensaje de confirmación
        res.json({ mensaje: "Pedido eliminado correctamente de la base de datos" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al intentar borrar el pedido" });
    }
});

// Exportamos el router para que index.js pueda usar estas rutas
module.exports = router;