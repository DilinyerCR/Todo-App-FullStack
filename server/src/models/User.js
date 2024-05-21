// Modelo User para almacenar información de usuarios en una base de datos relacional utilizando Sequelize.
const { DataTypes } = require('sequelize');

module.exports = (database) => {
    database.define('User', {
        //Identificador único del usuario (generado automáticamente usando UUIDv4)
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        //Dirección de correo electrónico del usuario (única y válida)
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
              isEmail: true,
            },
        },
        //Contraseña del usuario (obligatoria).
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {timestamps: false})
};

//PD:
//Este modelo se puede utilizar para:
//- Crear, leer, actualizar y eliminar usuarios en la base de datos.
//- Autenticar usuarios mediante el inicio de sesión con correo electrónico y contraseña.
//- Gestionar la información de perfil de los usuarios.