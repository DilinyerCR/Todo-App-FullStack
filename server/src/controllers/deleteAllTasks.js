const { Task } = require('../db');

const deleteAllTasks = async (req, res) => {
    try {

        const tasks = await Task.destroy({
            where: {}
        })

        if(!tasks) {
            return res.status(404).json({ error: 'Tasks no encontradas!' });
        } else {
            return res.status(200).send('Tareas eliminadas');
        }

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = deleteAllTasks;

//Este controller se encarga de eliminar una task, obteniendo un ID por params.