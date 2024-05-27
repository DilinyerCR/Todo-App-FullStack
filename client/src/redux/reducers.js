import { ADD_TASK, GET_ALL_USERS, GET_TASKS_BY_USER, LOGIN_FAILURE, LOGIN_SUCCESS, SIGNUP_SUCCESS, USER_IS_TAKEN } from "./actions-types";

const initialState = {
    allUsers: [],
    loginAccess: false,
    userCreated: false,
    userTaken: false,
    userId: "",
    tasksByUser: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload
            }
        
        case LOGIN_SUCCESS: 
            return {
                ...state,
                loginAccess: true,
                userId: action.payload
            }

        case LOGIN_FAILURE:
            return {
                ...state,
                loginAccess: false
            }

        case SIGNUP_SUCCESS:
            return {
                ...state,
                allUsers: action.payload,
                userCreated: true
            }

        case USER_IS_TAKEN:
            return {
                ...state,
                userTaken: true
            }

        case GET_TASKS_BY_USER:
            return {
                ...state,
                tasksByUser: action.payload
            }

        case ADD_TASK:
            return {
                ...state,
                tasksByUser: [...state.tasksByUser, action.payload],
                //Si lo coloco asi: "tasksByUser: action.payload" NO FUNCIONA! Aparece un error en consola (TypeError: tasksByUser?.map is not a function), segun entendi es porque tasksByUser no es un array.
                //Cuando utilizas [...state.tasksByUser, action.payload], estás creando un nuevo array que contiene todos los elementos de state.tasksByUser seguidos por action.payload. Esto significa que, sin importar el estado anterior de tasksByUser, siempre añades el nuevo elemento al final de la lista, manteniendo intacto el estado anterior.
            }

        default:
            return {...state}
    }
}

export default reducer;