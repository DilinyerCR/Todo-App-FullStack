// El archivo server.js es el punto de entrada principal de una aplicación Express.js y es responsable de configurar y ejecutar el servidor web. Este archivo es crucial para iniciar la aplicación y manejar las solicitudes HTTP que llegan a la aplicación.

// Importa el módulo Express, que es un framework para aplicaciones web en Node.js
const express = require("express");

// Crea una instancia de Express, que se utilizará para configurar el servidor
const server = express();
const morgan = require("morgan");

// Importa el módulo de rutas definidas en './routes/routes'. Este módulo contiene las definiciones de las rutas de tu aplicación
const router = require('./routes/routes');

//Esto se le conoce como CORS, sin esto no se comunican el front y el back
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://todo-app-full-stack-mauve.vercel.app/');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
       'Access-Control-Allow-Headers',
       'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
       'Access-Control-Allow-Methods',
       'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
});

//Esto es un middleware, se debe usar si o si para poder usar el metodo post, porque la informacion viaja en .json y el backend no lo entiende a menos que se use ese middleware
server.use(express.json());    //Middleware
server.use(morgan('dev'));  //Middleware

// Monta el router en la ruta '/home'. Esto significa que todas las rutas definidas en el módulo 'router' estarán accesibles bajo el prefijo '/home'
// Por ejemplo, si tienes una ruta definida como '/' en tu módulo de rutas, será accesible como '/home/' en tu aplicación
server.use('/home', router);

//Exporto mi server para cuando quiera inicializarlo en otro archivo, como 'index.js' o 'app.js'
module.exports = server;
