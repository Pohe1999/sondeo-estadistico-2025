const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch((err) => console.error('Error de conexión:', err));

app.use(cors({
  origin: 'https://pre-sondeo-tecamac-2025-mpg.netlify.app',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// Ruta para guardar los datos sin usar un esquema
app.post('/api/sondeos', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const collection = db.collection('sondeos');
    await collection.insertOne(req.body);
    res.status(201).json({ mensaje: 'Datos guardados correctamente' });
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    res.status(500).json({ mensaje: 'Error al guardar los datos' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
