import { ADD_TASK, GET_ALL_USERS, GET_TASKS_BY_USER, LOGIN_FAILURE, LOGIN_SUCCESS, SIGNUP_SUCCESS, USER_IS_TAKEN } from "./actions-types";

//Esta action realiza una solicitud GET a la API y despacha una acción para actualizar el estado global con la lista completa de usuarios obtenida de la respuesta.
export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3001/home/allusers', {
        method: 'GET', //GET solicita informacion de una ruta, en este caso http://localhost:3001/home/allusers
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if(response.ok) {
        const users = await response.json(); // Asegúrate de convertir la respuesta a JSON
        dispatch({ type: GET_ALL_USERS, payload: users }); // Agrega los datos de la respuesta como payload
      }

    } catch (error) {
      console.error('Error logging in:', error);
    }
  }
}


//Esta action verifica las credenciales proporcionadas contra la lista de usuarios existentes y despacha acciones correspondientes para reflejar el resultado del inicio de sesión.
export const loginUser = (email, password) => {
  return async (dispatch, getState) => {
    try {
      const { allUsers } = getState();

      const foundUser = await allUsers.find(user => user.email === email && user.password === password);

      if(foundUser) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: foundUser.id
        })

      } else {
        dispatch({
          type: LOGIN_FAILURE,
          payload: 'Usuario o contraseña incorrectos'
        });
      }

    } catch (error) {
      console.error('Error al intentar iniciar sesión:', error);
    }     
  };
};


//Esta action verifica si un usuario existe en el estado global allUsers, Si no existe, crea uno nuevo enviando una solicitud POST a la API.
export const createUser = (email, password) => {
  return async (dispatch, getState) => {
    try {
      const { allUsers } = getState();
      const foundUser = await allUsers.find(user => user.email === email);
        if (foundUser) {
          dispatch({
            type: USER_IS_TAKEN,
          });
        } else {
          const newUser = { email, password };
          const response = await fetch('http://localhost:3001/home/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
          });

          if (response.ok) {
            const createdUser = await response.json();
            dispatch({
              type: SIGNUP_SUCCESS,
              payload: createdUser,
            });
          } else {
            throw new Error('Error al crear el usuario.');
          }
        }
    } catch (error) {
      console.error('Error al verificar y registrar el usuario:', error);
    }
  };
};


//Esta action obtiene las tareas de un usuario específico, realiza una solicitud HTTP GET a la API para recuperar las tareas asociadas con un ID de usuario dado. Una vez obtenidas las tareas, las agrega al estado de la aplicación a través de la acción de tipo GET_TASKS_BY_USER
export const getTasksByUser = (userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3001/home/mytasks/${userId}`, {
        method: 'GET', //GET solicita informacion de una ruta, en este caso `http://localhost:3001/home/mytasks/${userId}`
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if(response.ok) {
        const tasks = await response.json(); // Asegúrate de convertir la respuesta a JSON
        dispatch({ type: GET_TASKS_BY_USER, payload: tasks }); // Agrega los datos de la respuesta como payload
      }

    } catch (error) {
      console.error('Error getting tasks by user:', error);
    }
  }
}


// Action para agregar una nueva tarea a un usuario específico. Esta acción realiza una solicitud HTTP POST a la API para crear una nueva tarea asociada con un ID de usuario y un nombre de tarea proporcionados. Una vez creada la tarea, la respuesta de la API se agrega al estado de la aplicación a través de la acción de tipo ADD_TASK, permitiendo su visualización o manipulación en otras partes de la aplicación.
export const addTask = (userId, name) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3001/home/mytasks/${userId}/addtask`, {
        method: 'POST', //Utiliza el método POST para enviar datos a la API
        headers: {
          'Content-Type': 'application/json', //Indica que el cuerpo de la solicitud será JSO
        },
        body: JSON.stringify(name), //Envía el nombre de la tarea como cuerpo de la solicitud
      });

      //Comprueba si la respuesta fue exitosa
      if(response.ok) {
        //Convierte la respuesta a JSON para procesarla
        const task = await response.json(); // Asegúrate de convertir la respuesta a JSON
        //Despacha la acción ADD_TASK con la tarea creada como payload
        dispatch({ type: ADD_TASK, payload: task }); // Agrega los datos de la respuesta como payload
      }

    } catch (error) {
      console.error('Error adding task:', error);
    }
  }
}