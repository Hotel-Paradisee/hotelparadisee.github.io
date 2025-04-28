document.getElementById('formBusqueda').addEventListener('submit', function (e) {
  e.preventDefault();

  // Obtener los valores de los campos
  const entrada = document.getElementById('entrada').value;
  const salida = document.getElementById('salida').value;
  const personas = document.getElementById('personas').value;
  const ninos = document.getElementById('ninos').value;

  // Validar que los campos no estén vacíos (si es necesario)
  if (!entrada || !salida || !personas || !ninos) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  // Construir la query
  const query = `?entrada=${encodeURIComponent(entrada)}&salida=${encodeURIComponent(salida)}&personas=${encodeURIComponent(personas)}&ninos=${encodeURIComponent(ninos)}`;

  // Redirigir a la nueva URL con la query
  window.location.href = `/html/catalogo.html${query}`;
});
