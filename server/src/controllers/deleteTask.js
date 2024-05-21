const { Task } = require('../db');

const deleteTasks = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findByPk(id);
        task.destroy();

        if(!task) {
            return res.status(404).json({ error: 'Task no encontrada!' });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = deleteTasks;

//Este controller se encarga de eliminar una task, obteniendo un ID por params.