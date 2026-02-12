const mongoose = require('mongoose');

const productoschema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  descripcion: {
    type: String,
    required: true
  },
  imagen: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('producto', productoschema);