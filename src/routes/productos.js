const express = require('express');
const router = express.Router();
const verificartoken = require('../middleware/auth');
const {
  obtenerproductos,
  obtenerproductporid,
  crearproducto,
  actualizarproducto,
  eliminarproducto
} = require('../controllers/productocontroller');

// Rutas sin protección
router.get('/', obtenerproductos);
router.get('/:id', obtenerproductporid);

// Rutas protegidas
router.post('/', verificartoken, crearproducto);
router.put('/:id', verificartoken, actualizarproducto);
router.delete('/:id', verificartoken, eliminarproducto);

module.exports = router;