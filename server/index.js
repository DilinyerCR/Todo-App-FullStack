const server = require("./src/server");  
const { database } = require('./src/db');
const PORT = 5432;


//Esta parte es responsable de sincronizar los modelos definidos en tu aplicación con la base de datos y luego iniciar el servidor Express.
database.sync().then(() => { 
    console.log("Database Connected!")
    //Aqui iniciamos el server.
    server.listen(5432, () => {
        console.log(`Server is running at PORT: ${PORT}`);
    });
});