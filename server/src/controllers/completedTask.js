const { Task } = require('../db');

const completedTask = async (req, res) => {
    try {
        const { id } = req.body;

        const task = await Task.findByPk(id);

        const updateTask = await task.update({
            completed: !task.completed
        });

        res.status(200).json(updateTask);

    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = completedTask;

//Este controller se encarga de tomar el id por body de una task, accede a su propiedad "completed" y cambia su valor de true a false y de false a true.