const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioschema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

usuarioschema.methods.compararpassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('usuario', usuarioschema);