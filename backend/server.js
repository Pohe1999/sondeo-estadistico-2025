const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

const mongoURI = process.env.MONGODB_URI;

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

// Adaptación para Netlify Functions
exports.handler = async (event, context) => {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, () => {
      const port = server.address().port;
      console.log(`Servidor escuchando en el puerto ${port}`);

      const req = {
        ...event,
        path: event.path.replace('/.netlify/functions/server', ''), // Ajusta la ruta
        body: event.body,
        method: event.httpMethod,
      };

      const res = {
        status: (code) => {
          return {
            json: (data) => {
              resolve({
                statusCode: code,
                body: JSON.stringify(data),
              });
            },
          };
        },
      };

      app(req, res, (err) => {
        if (err) {
          reject(err);
        }
      });
    });
  });
};