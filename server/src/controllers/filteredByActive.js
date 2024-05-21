const { User, Task } = require('../db');

const filteredByActive = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Realiza la consulta directamente en el modelo Task para obtener solo las tareas activas
        const activeTasks = await Task.findAll({
            where: {
                UserId: userId,
                completed: false
            }
        });

        res.status(200).json(activeTasks);

    } catch (error) {
        console.error(error); // Considera registrar el error para depuración
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

module.exports = filteredByActive;
