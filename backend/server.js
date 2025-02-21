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
  seccionElectoral: String,
  sexo: String,
  edad: String,
  escolaridad: String,
  conoceLaSeccion: String,
  votaDondeVive: String,
  VotanteRegular: String,
  votoMunicipal: String,
  votoFederal: String,
  votoSenador: String,
  satisfaccionVoto: String,
  funcionesDelSenador: String,
  conocimientoMG: String,
  conocimientoMG: String,
  medioDeConocimientoMG: String,
  recibirInfoDeMG: Boolean,
  mejorPresidentaMG: Boolean,
  problemaCotidiano: String,
  gobiernoEngargadoDeAtender: String,
  conoceObraPublica: Boolean,
  conoceObraPublicaCual: String,
  VialidadesEnBuenEstado: Boolean,
  conoceObraPublicaCual: String,
  alumbradoPublico: String,
  recoleccionBasura: String,
  mercadosMunicipales: String,
  calificacionAgua: String,
  muestrasCulturales: Boolean,
  eventosDeportivos: Boolean,
  gobiernoClaudia: String,
  gobiernoDelfina: String
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