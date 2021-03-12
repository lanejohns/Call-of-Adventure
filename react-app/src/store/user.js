const GET_USERS = "user/getUsers"
const GET_SEARCHED_USERS = "user/getSearchedUser"
const GET_MEMBERS = "user/getPartyMembers"

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

const getPartyMembers = (members) => {
    return {
        type: GET_MEMBERS,
        payload: members
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

export const getMembers = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}/members`)
    const members = await response.json()
    dispatch(getPartyMembers(members))
    return members
}

const initialState = {};

const userReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_USERS:
            newState = Object.assign({}, state, { ...action.payload });
            return newState;
        case GET_MEMBERS:
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