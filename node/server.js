const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

// Configuración de la base de datos
const sequelize = new Sequelize('database', 'username', 'password', { // <----- Cambiar datos aquí
  host: 'localhost',
  dialect: 'mysql', // Puedes cambiarlo según el motor de base de datos que estés utilizando
});

// Definición del modelo
const Person = sequelize.define('Person', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  empleo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nucleo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Sincronización del modelo con la base de datos
sequelize.sync({ force: true })
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });

const app = express();
app.use(express.json());

// Habilitar CORS
app.use(cors());

// Ruta para recibir la solicitud POST
app.post('/formulario', async (req, res) => {
  try {
    const { nombre, empleo, nucleo, edad } = req.body;

    // Crear un registro en la base de datos
    const person = await Person.create({ nombre, empleo, nucleo, edad });

    res.status(201).json(person);
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    res.status(500).json({ error: 'Error al guardar los datos' });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
