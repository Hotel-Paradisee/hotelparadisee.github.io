const express = require('express');
const app = express();
const db = require('./js/db');
const path = require('path');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('html'));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/img', express.static(path.join(__dirname, 'img')));

// Consulta de habitaciones disponibles
app.get('/habitaciones', (req, res) => {
  const { entrada, salida, personas, ninos } = req.query;
  const totalPersonas = parseInt(personas) + parseInt(ninos);

  const query = `
    SELECT * FROM habitaciones h
    WHERE (h.adultos + h.ninos) >= ?
    AND NOT EXISTS (
      SELECT 1 FROM reservas r
      WHERE r.habitacion_id = h.id
      AND (
        (r.fecha_entrada <= ? AND r.fecha_salida >= ?) OR
        (r.fecha_entrada <= ? AND r.fecha_salida >= ?) OR
        (r.fecha_entrada >= ? AND r.fecha_salida <= ?)
      )
    )
  `;

  db.query(query, [totalPersonas, entrada, entrada, salida, salida, entrada, salida], (err, results) => {
    if (err) {
      console.error('Error al consultar habitaciones: ' + err.stack);
      return res.status(500).send('Error al consultar habitaciones');
    }
    res.json(results);
  });
});

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
