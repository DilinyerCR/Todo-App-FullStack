const { Task } = require('../db');

const filteredByAll = async (req, res) => {
    try {
        const tasks = await Task.findAll()

        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = filteredByAll;

//No se si vaya a usar este controller, probablemente no pero aqui lo dejo por si acaso!