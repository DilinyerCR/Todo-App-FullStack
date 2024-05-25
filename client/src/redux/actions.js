import { GET_ALL_USERS, LOGIN_FAILURE, LOGIN_SUCCESS, SIGNUP_SUCCESS, USER_IS_TAKEN } from "./actions-types";

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


//Esta action verificar si un usuario existe en el estado global allUsers, Si no existe, crea uno nuevo enviando una solicitud POST a la API.
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
