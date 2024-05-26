//La función addTask es un controlador que maneja la solicitud POST para agregar una nueva tarea a la DB.
// Esta función extrae el nombre de la tarea del cuerpo de la solicitud (req.body), crea una nueva tarea en la base de datos utilizando el modelo Task y luego envía la tarea recién creada como respuesta en formato JSON.
//En caso de error durante la creación de la tarea, se devuelve un mensaje de error con estado 500.
const { Task, User } = require('../db');

const addTask = async (req, res) => {
    try {
        const { userId } = req.params; //El userId no esta en el model, el userId llega por params, por ejemplo: el usuario se registra y luego de eso se le habilita la seccion de Posteos, al registrarse se guardan sus datos en la DB con su userId y se muestra su userId en la URL de la pagina como tal.
        const { name } = req.body; //El req.body es unicamente por donde me llega la informacion, solamente lo usa el metodo "post" , se puede usar en otros metodos pero es mala practica.
        
        const newTask = await Task.create({
            name: name
        })

        const task = await newTask.setUser(userId); //Aqui es donde se relaciona el Post con el usuario, usando el metodo set y le agragamos el User en este caso, que es a donde lo queremos asociar, luego le decimos entre parentesis con que lo queremos asociar, en este caso con el userId, es decir el id que todo usuario tiene a la hora de que su registro sea exitoso.

        res.status(200).json(task); //Cuando es solo texto plano se usa .send , cuando no es solo texto plano se usa .json

    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = addTask;