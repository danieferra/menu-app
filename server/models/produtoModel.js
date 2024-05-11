const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const produtoSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    },
    categoria:{
        type: String,
        required:true
    }
});

module.exports = mongoose.model('Produto', produtoSchema); // Capitalize the model's name here as well
