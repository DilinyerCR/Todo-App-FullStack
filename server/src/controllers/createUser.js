const { User } = require('../db'); //Me traigo al modelo en el cual quiero trabajar y realizar cambios.

const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({
            where: {
                email: email,
            }
        });

        if (!user) {
            // Si no se encuentra el usuario, crear uno nuevo
            user = await User.create({ email, password });
        } else {
            return res.status(400).json({ message: "This user is already registered" });
        }

        res.status(201).json(user); //Usualmente, 201 se usa para indicar que un recurso fue creado exitosamente

    } catch (error) {
        res.status(500).send(error.message);
    };
}

module.exports = createUser;


// Dato: 
// -Para crear un nuevo usuario, desde el frontend mediante un form, se le envia el email y el password a este controller.

