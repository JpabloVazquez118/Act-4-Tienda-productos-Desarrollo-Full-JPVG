const request = require('supertest');
const app = require('../../server');

describe('Pruebas de autenticación', () => {

  // Prueba registro de usuario
  test('POST /api/auth/registro - debe registrar un usuario', async () => {
    const response = await request(app)
      .post('/api/auth/registro')
      .send({
        nombre: 'Usuario Test',
        email: 'test@test.com',
        password: 'test12345'
      });
    expect(response.status).toBe(201);
    expect(response.body.mensaje).toBe('Usuario registrado correctamente');
  });

  // Prueba login correcto
  test('POST /api/auth/login - debe iniciar sesion correctamente', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@test.com',
        password: 'test12345'
      });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  // Prueba login con credenciales incorrectas
  test('POST /api/auth/login - debe retornar 401 con credenciales incorrectas', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@test.com',
        password: 'passwordincorrecto'
      });
    expect(response.status).toBe(401);
  });

});