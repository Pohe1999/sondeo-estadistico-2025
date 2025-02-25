const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { stringify } = require('postcss');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001; // Usa el puerto asignado por Render si está disponible, o 5001 en desarrollo local


const mongoURI = process.env.MONGO_URI;


mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((err) => console.error('Error de conexión a MongoDB Atlas:', err));

// Esquema de Mongoose
const sondeoSchema = new mongoose.Schema({
  genero: String,
  edad: Number,
  localidad: String,
  calle: String,
  numExterior: Number,
  numInterior: String,
  codigoPostal: Number,
  tipoVivienda: String,
  numeroDeHabitantes: Number,
  compartenMismoGasto: String,
  gradoDeEstudios: String,
  laEscuelaEstaEnTerritorioMunicipal: Boolean,
  nombreDeLaEscuela: String,
  gradoQueCursa: String,
  actualmenteTrabaja: Boolean,
  ocupacionActual: String,
  medioDeTransporte: String,
  calidadDelTransportePublico: String,
  mayorProblematicaEnMovilidad: String
});

const Sondeo = mongoose.model('sondeos', sondeoSchema);

// Permitir solicitudes solo desde el dominio de tu frontend
app.use(cors({
  origin: 'https://pre-sondeo-tecamac-2025-mpg.netlify.app', // Asegúrate de usar tu URL de frontend aquí
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// Ruta para guardar los datos
app.post('/api/sondeos', async (req, res) => {
  try {
    const nuevoSondeo = new Sondeo(req.body);
    await nuevoSondeo.save();
    res.status(201).json({ mensaje: 'Datos guardados correctamente' });
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    res.status(500).json({ mensaje: 'Error al guardar los datos' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
