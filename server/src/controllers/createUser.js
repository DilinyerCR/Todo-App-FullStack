const { User } = require('../db'); //Me traigo al modelo en el cual quiero trabajar y realizar cambios.

const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const newUser = User.create({
            email: email,
            password: password
        });

        res.status(200).json(newUser);

    } catch (error) {
        res.status(500).send(error.message);
    };
}

module.exports = createUser;


// Dato: 
// -Para crear un nuevo usuario, desde el frontend mediante un form, se le envia el email y el password a este controller.

