import { GET_ALL_USERS, LOGIN_FAILURE, LOGIN_SUCCESS } from "./actions-types";

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


export const loginUser = (email, password) => {
  return async (dispatch, getState) => {
    try {
      const { allUsers } = getState();

      const foundUser = allUsers.find(user => user.email === email && user.password === password);
      // console.log(foundUser) //!console.log
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