const app = require('../server');
const connectDB = require('../src/config/database');

// Conectar a MongoDB en Vercel
connectDB();

module.exports = app;