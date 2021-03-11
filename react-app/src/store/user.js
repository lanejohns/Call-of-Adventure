const GET_USERS = "user/getUsers"
const GET_SEARCHED_USERS = "user/getSearchedUser"

const getAllUsers = (users) => {
    return {
        type: GET_USERS,
        payload: users
    }
}

const getSearchedUser = (user) => {
    return {
        type: GET_SEARCHED_USERS,
        payload: user
    }
}

export const getUsers = () => async (dispatch) => {
    const response = await fetch("/api/users/")
    const users = await response.json()
    return dispatch(getAllUsers(users))
}


export const searchUser = (user) => async (dispatch) => {
    const response = await fetch(`/api/users/${user}`)
    const users = await response.json()
    return dispatch(getSearchedUser(users))
}

const initialState = {};

const userReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_USERS:
            newState = Object.assign({}, state, { ...action.payload });
            return newState;
        case GET_SEARCHED_USERS:
            newState = Object.assign({}, state, { ...action.payload });
            return newState;
        default:
            return state
    }
}

export default userReducer