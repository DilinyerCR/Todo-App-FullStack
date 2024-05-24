const { User } = require('../db');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Busca el usuario donde email y password sean iguales a los enviados por body(formulario)
        const user = await User.findOne({
            where: {
                email: email,
                password: password
            }
        })

        if(!user) {
            return res.status(404).json({error: "user not found"})
        }

        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = login