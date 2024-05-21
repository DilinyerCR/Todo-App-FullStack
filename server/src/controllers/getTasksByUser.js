const { User } = require('../db');

const getTasksByUser = async (req, res) => {  
    try {
        const { userId } = req.params; //Cuando el usuario se loguee, obtenemos el userId por params(url).

        const user = await User.findByPk(userId); //Buscamos el user con ese userId

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const tasks = await user.getTasks(); //Y luego obtenemos las tasks asociadas a ese user(usamos el metodo get y le agregamos Tasks, al igual que el metodo set o add).

        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = getTasksByUser;

//Este controller se debe ejecutar cuando un Usuario se loguee.