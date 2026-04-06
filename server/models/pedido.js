const mongoose = require('mongoose');

// Definimos la estructura de un pedido de Amasol
const PedidoSchema = new mongoose.Schema({
    cliente: { 
        type: String, 
        default: "Cliente General" 
    },
    productos: [{
        nombre: String,
        cantidad: Number,
        precio: Number
    }],
    total: { 
        type: Number, 
        required: true 
    },
    fecha: { 
        type: Date, 
        default: Date.now // Se pone la fecha actual automáticamente
    }
});

// Exportamos el modelo para usarlo en otras partes
module.exports = mongoose.model('Pedido', PedidoSchema);