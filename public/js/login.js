const API_URL = 'http://localhost:3000/api';

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const mensaje = document.getElementById('mensaje');

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      mensaje.className = 'mensaje success';
      mensaje.textContent = '¡Login exitoso! Redirigiendo...';

      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    } else {
      mensaje.className = 'mensaje error';
      mensaje.textContent = data.mensaje || 'Error al iniciar sesión';
    }
  } catch (error) {
    mensaje.className = 'mensaje error';
    mensaje.textContent = 'Error de conexión con el servidor';
    console.error('Error:', error);
  }
});