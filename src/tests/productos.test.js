const request = require('supertest');
const app = require('../../server');

describe('Pruebas de productos', () => {

  // Prueba GET todos los productos
  test('GET /api/productos - debe retornar lista de productos', async () => {
    const response = await request(app).get('/api/productos');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Prueba GET producto sin token
  test('POST /api/productos - debe retornar 401 sin token', async () => {
    const response = await request(app)
      .post('/api/productos')
      .send({
        nombre: 'Producto Test',
        categoria: 'test',
        precio: 100,
        stock: 10,
        descripcion: 'Descripcion test'
      });
    expect(response.status).toBe(401);
  });

});