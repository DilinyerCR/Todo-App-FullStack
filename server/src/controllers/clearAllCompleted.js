const { User, Task } = require('../db');

const clearAllCompleted = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const completeTasks = await Task.destroy({
            where: {
                UserId: userId,
                completed: true
            }
        });

        if(!completeTasks) {
            return res.status(404).json({ message: 'No hay tareas que eliminar' });
        }

        // res.status(200).json({ message: `Se eliminaron ${completeTasks} tareas completadas.` });
        res.status(200).json(completeTasks);

    } catch (error) {
        
    }
};

module.exports = clearAllCompleted;