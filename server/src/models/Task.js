//Este modelo define una tabla llamada Task para almacenar tareas en una base de datos relacional utilizando Sequelize.
const { DataTypes } = require('sequelize'); //DataTypes es un objeto que contiene una colección de tipos de datos incorporados que puedes utilizar al definir modelos y migraciones en tu aplicación(ejemplo: INTEGER, STRING, etc).

module.exports = (database) => { //database es la instancia de Sequelize en mi archivo db.js
    database.define('Task', {
        //Identificador único de la tarea (autoincremental)
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true, 
            autoIncrement: true,
        },
        //Texto que describe la tarea
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        //Indica si la tarea está completada o no (valor por defecto: false)
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    }, {timestamps: false})
};

// PD:
// Este modelo se puede utilizar para:
// Crear, leer, actualizar y eliminar tareas en la base de datos.
// Consultar tareas por su estado de completación (completadas o incompletas).
// Filtrar y ordenar tareas por diferentes criterios.