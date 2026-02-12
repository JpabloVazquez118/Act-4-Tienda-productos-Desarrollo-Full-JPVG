const API_URL = 'http://localhost:3000/api';
let modoedicion = false;
let productoeditandoid = null;

// Verificar si hay usuario logueado
function verificarsesion() {
  const token = localStorage.getItem('token');
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (token && usuario) {
    document.getElementById('usuario-nombre').textContent = `Hola, ${usuario.nombre}`;
    document.getElementById('form-section').style.display = 'block';
    return token;
  }

  return null;
}

// Cerrar sesión
document.getElementById('btn-logout').addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  window.location.href = 'login.html';
});

// Obtener todos los productos
async function obtenerproductos() {
  try {
    const response = await fetch(`${API_URL}/productos`);
    const productos = await response.json();
    mostrarproductos(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
  }
}

// Mostrar productos en el HTML
function mostrarproductos(productos) {
  const listaproductos = document.getElementById('lista-productos');
  const token = verificarsesion();
  listaproductos.innerHTML = '';

  productos.forEach(producto => {
    const productodiv = document.createElement('div');
    productodiv.className = 'producto';
    productodiv.innerHTML = `
      <img src="${producto.imagen || 'https://via.placeholder.com/300x200?text=Sin+Imagen'}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p><strong>Categoría:</strong> ${producto.categoria}</p>
      <p class="precio">$${producto.precio} MXN</p>
      <p class="stock">Stock: ${producto.stock} unidades</p>
      <p>${producto.descripcion}</p>
      ${token ? `
        <div class="producto-acciones">
          <button class="btn-editar" onclick="editarproducto('${producto._id}')">Editar</button>
          <button class="btn-eliminar" onclick="eliminarproducto('${producto._id}')">Eliminar</button>
        </div>
      ` : ''}
    `;
    listaproductos.appendChild(productodiv);
  });
}

// Crear o actualizar producto
document.getElementById('form-producto').addEventListener('submit', async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) {
    alert('Debes iniciar sesión');
    return;
  }

  const productodata = {
    nombre: document.getElementById('nombre').value,
    categoria: document.getElementById('categoria').value,
    precio: parseFloat(document.getElementById('precio').value),
    stock: parseInt(document.getElementById('stock').value),
    descripcion: document.getElementById('descripcion').value,
    imagen: document.getElementById('imagen').value
  };

  try {
    const url = modoedicion
      ? `${API_URL}/productos/${productoeditandoid}`
      : `${API_URL}/productos`;

    const method = modoedicion ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productodata)
    });

    if (response.ok) {
      alert(modoedicion ? 'Producto actualizado' : 'Producto creado');
      limpiarformulario();
      obtenerproductos();
    } else {
      alert('Error al guardar producto');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error de conexión');
  }
});

// Editar producto
async function editarproducto(id) {
  try {
    const response = await fetch(`${API_URL}/productos/${id}`);
    const producto = await response.json();

    document.getElementById('producto-id').value = producto._id;
    document.getElementById('nombre').value = producto.nombre;
    document.getElementById('categoria').value = producto.categoria;
    document.getElementById('precio').value = producto.precio;
    document.getElementById('stock').value = producto.stock;
    document.getElementById('descripcion').value = producto.descripcion;
    document.getElementById('imagen').value = producto.imagen || '';

    document.getElementById('form-titulo').textContent = 'Editar Producto';
    modoedicion = true;
    productoeditandoid = id;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error) {
    console.error('Error al cargar producto:', error);
  }
}

// Eliminar producto
async function eliminarproducto(id) {
  if (!confirm('¿Estás seguro de eliminar este producto?')) return;

  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`${API_URL}/productos/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      alert('Producto eliminado');
      obtenerproductos();
    } else {
      alert('Error al eliminar producto');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error de conexión');
  }
}

// Cancelar edición
document.getElementById('btn-cancelar').addEventListener('click', limpiarformulario);

// Limpiar formulario
function limpiarformulario() {
  document.getElementById('form-producto').reset();
  document.getElementById('producto-id').value = '';
  document.getElementById('form-titulo').textContent = 'Agregar Producto';
  modoedicion = false;
  productoeditandoid = null;
}

// Cargar productos al iniciar
verificarsesion();
obtenerproductos();