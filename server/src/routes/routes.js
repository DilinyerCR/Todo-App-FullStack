const router = require("express").Router(); //Esto es para poder usar las rutas
const addTask = require("../controllers/addTask");
const completedTask = require("../controllers/completedTask");
const createUser = require("../controllers/createUser");
const deleteTasks = require("../controllers/deleteTask");
const filteredByActive = require("../controllers/filteredByActive");
const filteredByCompleted = require("../controllers/filteredByCompleted");
const filteredByAll = require("../controllers/filteredByAll");
const getTasksByUser = require("../controllers/getTasksByUser");
const clearAllCompleted = require("../controllers/clearAllCompleted");
const login = require("../controllers/login");
const getAllUsers = require("../controllers/getAllUsers");
const deleteAllUsers = require("../controllers/deleteAllUsers");


router.post('/signup', createUser);                //Funciona
router.post('/addtask', addTask);                  //Funciona
router.get('/mytasks/:userId', getTasksByUser);    //Funciona (despues de los ":" debe ir el nombre que colocaste en el controller, ejemplo: const { userId } = req.params; si colocas id en vez de userId, aqui debe ir id, ejemplo: router.get('/mytasks/:id', getTasksByUser);).

//Cuando usamos params, es porque el valor llega por URL, en thuderclient en este caso la URL es esta: http://localhost:3001/home/mytasks/57c9544c-dd79-4464-82b3-e5616b1f4202 en donde "57c9544c-dd79-4464-82b3-e5616b1f4202" es el userId.

router.delete('/delete/:id', deleteTasks);         //Funciona (no se como debe ser la URL del lado del front)
router.put('/update/:id', completedTask);          //Funciona (no se como debe ser la URL del lado del front)
router.get('/alltasks', filteredByAll);            //Funciona
router.get('/mytasks/:userId/actives', filteredByActive); //Funciona
router.get('/mytasks/:userId/completed', filteredByCompleted); //Funciona
router.delete('/mytasks/:userId/clearcompleted', clearAllCompleted); //Funciona
router.get('/landing', login);                      //Funciona
router.get('/allusers', getAllUsers)                //Funciona
router.delete('/deleteallusers', deleteAllUsers)


module.exports = router;


// !Como usar las rutas en el thunderclient:
// router.post('/signup', createUser)
    //ruta: http://localhost:3001/home/signup
    //por body recibe: {"email": "Daniela@gmail.com","password": "daniela123"}

// router.post('/addtask', addTask);
    //ruta: http://localhost:3001/home/addtask
    //por body recibe: {"userId": "d4bc3625-3f2d-4d81-8d98-50ad0b09d8e6","name": "Ir a patinar con amigos"}

// router.get('/mytasks/:userId', getTasksByUser);
    //ruta: http://localhost:3001/home/mytasks/e8df59f3-852a-4b46-aa41-93a1b0a75be5

// router.delete('/delete/:id', deleteTasks);
    //ruta: http://localhost:3001/home/delete/2

// router.put('/update/:id', completedTask); 
    //ruta: http://localhost:3001/home/update/1

// router.get('/alltasks', filteredByAll);
    //ruta: http://localhost:3001/home/alltasks

// router.get('/mytasks/:userId/actives', filteredByActive);
    //ruta: http://localhost:3001/home/mytasks/e8df59f3-852a-4b46-aa41-93a1b0a75be5/actives

// router.get('/mytasks/:userId/completed', filteredByCompleted);
    //ruta: http://localhost:3001/home/mytasks/e8df59f3-852a-4b46-aa41-93a1b0a75be5/completed

// router.delete('/mytasks/:userId/clearcompleted', clearAllCompleted);
    //ruta: http://localhost:3001/home/mytasks/e8df59f3-852a-4b46-aa41-93a1b0a75be5/clearcompleted

// router.get('/landing', login);  
    //ruta: http://localhost:3001/home/landing

// router.get('/allusers', getAllUsers)
    //ruta: http://localhost:3001/home/allusers