const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

// Registro de usuario
const registro = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const usuarioexiste = await Usuario.findOne({ email });
    if (usuarioexiste) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    const passwordencriptado = await bcrypt.hash(password, 10);

    const usuario = new Usuario({
      nombre,
      email,
      password: passwordencriptado
    });
    await usuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
  }
};

// Login de usuario
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    const passwordcorrecto = await usuario.compararpassword(password);
    if (!passwordcorrecto) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
  }
};

module.exports = { registro, login };