import { GET_ALL_USERS, LOGIN_FAILURE, LOGIN_SUCCESS, SIGNUP_SUCCESS, USER_IS_TAKEN } from "./actions-types";

const initialState = {
    allUsers: [],
    loginAccess: false,
    userCreated: false,
    userTaken: false
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

        default:
            return {...state}
    }
}

export default reducer;