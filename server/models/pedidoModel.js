const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pedidoSchema = new Schema({
    numero: {
        type: Number,
        required: true
    },
    items: [{
        produto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Produto' // Ensure this matches the capitalized name of the product model
        },
        quantidade: {
          type: Number,
          required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: Boolean,
        required: true
    },
    notas:{
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Pedido', pedidoSchema); // Use capitalized name here too
