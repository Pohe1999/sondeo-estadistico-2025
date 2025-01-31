const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5001;

// Conexión a MongoDB Atlas (¡URL expuesta, NO RECOMENDADO PARA PRODUCCIÓN!)
const mongoURI = 'mongodb+srv://mapogu99:dalila25C@sondeostecamac1.bgs4s.mongodb.net/?retryWrites=true&w=majority'; // ¡REEMPLAZA <db_password> CON TU CONTRASEÑA REAL!

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
  edad: Number,
  escolaridad: String,
  beneficiario: Boolean,
  programaSocial: String,
  problemaSeguridad: String,
  problemaSeguridadOtro: String,
  accionesSeguridad: String,
  accionesSeguridadOtro: String,
  participacionSeguridad: String,
  conoceBeneficiosImpuestos: String,
  conoceCampanasDescuentos: String,
  eventosDeportivos: String,
  obraPublicaInfluyente: String,
  obraPublica: String,
  vialidades: String,
  vialidadesComentario: String,
  espaciosSinLuminarias: String,
  espaciosSinLuminariasComentario: String,
  recoleccionBasura: String,
  mercadosMunicipales: String,
  calificacionAgua: String,
  muestrasCulturales: String,
  puertaVioleta: String,
});

const Sondeo = mongoose.model('sondeos', sondeoSchema);

app.use(cors());
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