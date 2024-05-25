const { User } = require('../db');

const deleteAllUsers = async (req, res) => {
    try {
        const users = await User.destroy({
            where: {}
        })

        if (users > 0) {
            res.status(200).json({ success: true, message: 'Todos los usuarios han sido eliminados.' });
          } else {
            res.status(404).json({ success: false, message: 'No se encontraron usuarios para eliminar.' });
          }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = deleteAllUsers