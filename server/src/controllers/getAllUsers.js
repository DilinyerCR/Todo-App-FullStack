const { User } = require('../db');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
        
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = getAllUsers;

