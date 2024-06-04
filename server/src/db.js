// El archivo db.js es esencial en una aplicación que utiliza Sequelize para interactuar con una base de datos, ya que se encarga de establecer la conexión con la base de datos y de configurar Sequelize. Este archivo es crucial para la inicialización de la base de datos y la definición de los modelos que representan las tablas en la base de datos. 
const pg = require('pg');
require("dotenv").config();
const { Sequelize } = require('sequelize');
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST } = process.env; //Llamo a mis variables de entorno.
const taskModel = require('./models/Task'); //Importo el modelo para las tareas.
const userModel = require('./models/User'); //Importo el modelo para los usuarios.

// Creamos una nueva instancia de Sequelize, que se utilizará para interactuar con la base de datos.
const URL = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:5432/verceldb?sslmode=require`;

const database = new Sequelize(URL, {
    logging: false,
    native: false,
    dialectModule: pg,
});


taskModel(database); //Aqui es donde se conocen los models y la DB, al hacer esto se crean las tablas.
userModel(database); //Aqui es donde se conocen los models y la DB, al hacer esto se crean las tablas.

const { Task, User } = database.models;

//Asociaciones
User.hasMany(Task);
Task.belongsTo(User);

// Se debe exportar como objeto!
module.exports = {
    ...database.models,
    database,
    Task,
    User
};