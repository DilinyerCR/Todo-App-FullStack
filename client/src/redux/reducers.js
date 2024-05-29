import { ADD_TASK, CLEAR_ALL_COMPLETED, CLOSE_TASK, COMPLETED_TASK, GET_ALL_USERS, GET_TASKS_BY_USER, LOGIN_FAILURE, LOGIN_SUCCESS, SIGNUP_SUCCESS, USER_IS_TAKEN } from "./actions-types";

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

        case COMPLETED_TASK:
            return {
                ...state,
                // Iteramos sobre cada tarea en el array 'tasksByUser' del estado actual.
                // Verificamos si el ID de la tarea actual ('task.id') coincide con el ID del payload de la acción ('action.payload.id').
                tasksByUser: state.tasksByUser.map(task =>
                    task.id === action.payload.id ? {...task, completed: action.payload.completed } : task
                ),
                // Si el id coincide, se crea un nuevo objeto de tarea con todas las propiedades de la tarea actual (...task) y se sobrescribe la propiedad completed con el nuevo valor proveniente del payload de la acción (action.payload.completed). Esto efectivamente actualiza el estado completed de la tarea.

                // Si el id no coincide, simplemente se devuelve la tarea tal cual, sin realizar ninguna modificación.

                //Si en vez de eso se agrega "tasksByUser: [...state.tasksByUser, action.payload]" , te devuelve la tarea con su completed cambiado, pero la tarea estaria duplicada, tendrias la misma tarea reflejada en tu frontend pero una con su estado completed en false y la otra con su estado completed en true.
            }
        
        case CLEAR_ALL_COMPLETED:
            return {
                ...state,
                tasksByUser: action.payload, // Utiliza el array de tareas devuelto por la acción para actualizar tasksByUser con las nuevas tareas actualizadas (sin las completadas)
            }

        case CLOSE_TASK:
            return {
                ...state,
                tasksByUser: action.payload // Utiliza el array de tareas devuelto por la acción para actualizar tasksByUser con las nuevas tareas actualizadas (sin la tarea que cerre)
            }

        default:
            return {...state}
    }
}

export default reducer;