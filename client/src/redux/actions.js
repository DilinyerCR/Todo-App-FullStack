import { ADD_TASK, CLEAR_ALL_COMPLETED, CLOSE_TASK, COMPLETED_TASK, FILTERED_BY_ACTIVES, FILTERED_BY_COMPLETED, GET_ALL_USERS, GET_TASKS_BY_USER, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, SIGNUP_SUCCESS, USER_IS_TAKEN } from "./actions-types";

//Esta action realiza una solicitud GET a la API y despacha una acción para actualizar el estado global con la lista completa de usuarios obtenida de la respuesta.
export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://todo-app-fullstack-production.up.railway.app/home/allusers', {
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
      //Verifica si existe y si no, lo crea
      const foundUser = await allUsers.find(user => user.email === email);
        if (foundUser) {
          dispatch({
            type: USER_IS_TAKEN,
          });
        } else {
          const newUser = { email, password };
          const response = await fetch('https://todo-app-fullstack-production.up.railway.app/home/signup', {
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
      const response = await fetch(`https://todo-app-fullstack-production.up.railway.app/home/mytasks/${userId}`, {
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
      const response = await fetch(`https://todo-app-fullstack-production.up.railway.app/home/mytasks/${userId}/addtask`, {
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


//Action para actualizar el estado de "completed" de una tarea específica. Esta acción realiza una solicitud HTTP PUT a la API para modificar el estado de completado de una tarea asociada con un ID específico. Una vez que el estado de la tarea ha sido actualizado, la respuesta de la API se agrega al estado de la aplicación a través de la acción de tipo COMPLETED_TASK, permitiendo su visualización o manipulación actualizada en otras partes de la aplicación.
export const completedTask = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`https://todo-app-fullstack-production.up.railway.app/home/update`, {
        method: 'PUT', //Utiliza el método PUT para actualizar datos en la API o DB.
        headers: {
          'Content-Type': 'application/json', //Indica que el cuerpo de la solicitud será JSON
        },
        body: JSON.stringify({id}), //Envía el ID de la task en forma de objeto, porque mi controller espera un objeto.
      });

      //Comprueba si la respuesta fue exitosa
      if(response.ok) {
        const completed = await response.json(); // Asegúrate de convertir la respuesta a JSON.
        dispatch({ type: COMPLETED_TASK, payload: completed }); // Agrega los datos de la respuesta como payload.
      }

    } catch (error) {
      console.error('Error adding task:', error);
    }
  }
}


// Action para eliminar todas las tareas completadas asociadas a un usuario específico. Esta acción realiza dos solicitudes HTTP: primero, una solicitud DELETE a la API para eliminar todas las tareas marcadas como completadas del usuario especificado; luego, una solicitud GET para obtener las tareas actualizadas del usuario, reflejando la eliminación de las tareas completadas. Una vez que las tareas actualizadas han sido obtenidas, la respuesta de la API se agrega al estado de la aplicación a través de la acción de tipo CLEAR_ALL_COMPLETED, permitiendo su visualización o manipulación actualizada en otras partes de la aplicación.
export const clearAllCompleted = (userId) => {
  return async (dispatch) => {
    try {
      //? Primera solicitud HTTP para eliminar todas las tareas completadas del usuario especificado
      await fetch(`https://todo-app-fullstack-production.up.railway.app/home/mytasks/${userId}/clearcompleted`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      //? Segunda solicitud HTTP para obtener las tareas actualizadas del usuario, excluyendo las tareas completadas recién eliminadas
      const response = await fetch(`https://todo-app-fullstack-production.up.railway.app/home/mytasks/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if(response.ok) {
        const updatedTasks = await response.json();
        // Agrega los datos de las tareas actualizadas al estado de la aplicación mediante el payload
        dispatch({ type: CLEAR_ALL_COMPLETED, payload: updatedTasks });
      }
      
    } catch (error) {
      console.error('Error getting NO completed tasks:', error);
    }
  }
}


// Action para eliminar una tarea asociada a un usuario específico. Esta acción realiza dos solicitudes HTTP: primero, una solicitud DELETE a la API para eliminar una las tarea del usuario especificado; luego, una solicitud GET para obtener las tareas actualizadas del usuario, reflejando la eliminación de la tarea. Una vez que las tareas actualizadas han sido obtenidas, la respuesta de la API se agrega al estado de la aplicación a través de la acción de tipo CLOSE_TASK, permitiendo su visualización o manipulación actualizada en otras partes de la aplicación.
export const closeTask = (id, userId) => {
  return async (dispatch) => {
    try {
      //? Primera solicitud HTTP para eliminar una tarea del usuario especificado
      await fetch(`https://todo-app-fullstack-production.up.railway.app/home/deletetask`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id}), //Envía el ID de la task en forma de objeto, porque mi controller espera un objeto.
      });

      //? Segunda solicitud HTTP para obtener las tareas actualizadas del usuario, excluyendo la tarea recién eliminada
      const response = await fetch(`https://todo-app-fullstack-production.up.railway.app/home/mytasks/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if(response.ok) {
        const updatedTasks = await response.json();
        // Agrega los datos de las tareas actualizadas al estado de la aplicación mediante el payload
        dispatch({ type: CLOSE_TASK, payload: updatedTasks });
      }
      
    } catch (error) {
      console.error('Error getting NO completed tasks:', error);
    }
  }
}


//Esta acción realiza una solicitud HTTP GET a la API para obtener todas las tareas del usuario especificado. Luego, filtra las tareas para incluir solo aquellas cuya propiedad "completed" es true, la respuesta se agrega al estado de la aplicación a través de la acción de tipo FILTERED_BY_COMPLETED, permitiendo su visualización o manipulación actualizada en otras partes de la aplicación.
export const filterByCompleted = (userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`https://todo-app-fullstack-production.up.railway.app/home/mytasks/${userId}`, {
        method: 'GET', //GET solicita informacion de una ruta, en este caso `http://localhost:3001/home/mytasks/${userId}`
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if(response.ok) {
        const allTasks = await response.json();
        // Filtrando las tareas que tienen la propiedad "completed" en true
        const completedTasks = allTasks.filter(task => task.completed === true);

        dispatch({ type: FILTERED_BY_COMPLETED, payload: completedTasks });
      }
      
    } catch (error) {
      console.error('Error getting NO completed tasks:', error);
    }
  }
}


//Esta acción realiza una solicitud HTTP GET a la API para obtener todas las tareas del usuario especificado. Luego, filtra las tareas para incluir solo aquellas cuya propiedad "completed" es false, la respuesta se agrega al estado de la aplicación a través de la acción de tipo FILTERED_BY_ACTIVES, permitiendo su visualización o manipulación actualizada en otras partes de la aplicación.
export const filterByActives = (userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`https://todo-app-fullstack-production.up.railway.app/home/mytasks/${userId}`, {
        method: 'GET', //GET solicita informacion de una ruta, en este caso `http://localhost:3001/home/mytasks/${userId}`
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if(response.ok) {
        const allTasks = await response.json();
        // Filtrando las tareas que tienen la propiedad "completed" en false
        const activesTasks = allTasks.filter(task => task.completed === false);

        dispatch({ type: FILTERED_BY_ACTIVES, payload: activesTasks });
      }

    } catch (error) {
      console.error('Error getting NO completed tasks:', error);
    }
  }
}

//Esta action despacha el valor false para luego cambiar el estado global "loginAccess" en mi reducer a false.
export const logout = (value) => {
  return (dispatch) => {
    dispatch({ type: LOGOUT, payload: value });
  }
}