require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
const errorhandler = require('./src/middleware/errorhandler');

const app = express();

// Solo conectar a MongoDB si no estamos en Vercel
if (process.env.NODE_ENV !== 'production') {
  connectDB();
}

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rutas
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/productos', require('./src/routes/productos'));

app.get('/', (req, res) => {
  res.send('¡Servidor de Periféricos funcionando! 🖱️⌨️');
});

// Middleware de errores
app.use(errorhandler);

// Solo escuchar en local, no en Vercel
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;