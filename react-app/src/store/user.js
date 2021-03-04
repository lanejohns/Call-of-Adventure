const GET_USERS = "user/getUsers"

const getAllUsers = (users) => {
    return {
        type: GET_USERS,
        payload: users
    }
}

export const getUsers = () => async (dispatch) => {
    const response = await fetch("/api/users")
    const users = await response.json()
    return dispatch(getAllUsers(users))
}

const initialState = {};

const userReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_USERS:
            newState = Object.assign({}, state, { ...action.payload });
            return newState;
        default:
            return state
    }
}

export default userReducer