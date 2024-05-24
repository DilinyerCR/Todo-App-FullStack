import { GET_ALL_USERS, LOGIN_FAILURE, LOGIN_SUCCESS } from "./actions-types";

const initialState = {
    allUsers: [],
    loginAccess: false,
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
                loginAccess: true
            }

        case LOGIN_FAILURE:
            return {
                ...state,
                loginAccess: false
            }

        default:
            return {...state}
    }
}

export default reducer;