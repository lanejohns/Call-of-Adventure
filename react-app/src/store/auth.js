const GET_USER = "user/getCurrentUser"
const LOGIN = "user/loginUser"
const SIGN_UP = "user/signUpUser"
const SIGN_OUT = "user/signOutUser"

const getCurrentUser = (user) => {
    return {
        type: GET_USER,
        payload: user
    }
}

const loginUser = (user) => {
    return {
        type: LOGIN,
        payload: user
    }
}

const signUpUser = (user) => {
    return {
        type: SIGN_UP,
        payload: user
    }
}

const signOutUser = (user) => {
    console.log(user)
    return {
        type: SIGN_OUT,
        payload: user
    }
}


export const currentUser = () => async(dispatch) => {
    const response = await fetch("/api/auth/")
    console.log(response)
    if (response.ok) {
        const user = await response.json()
        return dispatch(getCurrentUser(user))
    }
}

export const loginThunk = (email, password) => async(dispatch) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
    })
  });
  const user = await response.json()
  dispatch(loginUser(user))
}

export const signUpThunk = (username, email, password, full_name, address, city, state, zipcode, latitude, longitude) => async (dispatch) => {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
      full_name,
      address,
      city,
      state,
      zipcode,
      latitude,
      longitude
    }),
  });
  const user = await response.json()
  dispatch(signUpUser(user))
}


export const logoutThunk = () => async (dispatch) => {
    const response = await fetch("/api/auth/logout")
    const user = await response.json()
    dispatch(signOutUser(null))
}


const initialState = {};


const currentUserReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOGIN:
            newState = Object.assign({}, state, { ...action.payload });
            return newState;
        case SIGN_UP:
            newState = Object.assign({}, state, { ...action.payload });
            return newState;
        case SIGN_OUT:
            console.log({ ...action.payload })
            newState = Object.assign({}, state, { ...action.payload });
            return newState;
        case GET_USER:
            newState = Object.assign({}, state, { ...action.payload });
            return newState;
        default:
            return state
    }
}

export default currentUserReducer