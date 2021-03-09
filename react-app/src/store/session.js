const CREATE_SESSION = "session/createNewSession"
const LOAD = "session/getAllSessions"
const DELETE = "session/deleteOneSession"
const EDIT = "session/editTheSession"

const createNewSession = (session) => {
    return {
        type: CREATE_SESSION,
        payload: session
    }
}

const getAllSessions = (sessions) => {
    return {
        type: LOAD,
        payload: sessions
    }
}

const deleteOneSession = (session) => {
    return {
        type: DELETE,
        payload: session
    }
}

const editTheSession = (session) => {
    return {
        type: EDIT,
        payload: session
    }
}

export const createSession = ({
    party_id,
    title,
    description,
    date,
    time,
    address,
    city,
    state,
    zipcode,
    latitude,
    longitude,
    in_person,
}) => async (dispatch) => {
    console.log("WE ARE ABOUT TO FETCH FROM API/SESSIONS")
    const response = await fetch("/api/sessions/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            party_id,
            title,
            description,
            date,
            time,
            address,
            city,
            state,
            zipcode,
            latitude,
            longitude,
            in_person,
        }),
    });
    console.log("THIS IS THE RESPONSE", response)
    const session = await response.json()
    dispatch(createNewSession(session))
}


export const editSession = ({
    session_id,
    party_id,
    title,
    description,
    date,
    time,
    address,
    city,
    state,
    zipcode,
    latitude,
    longitude,
    in_person,
}) => async (dispatch) => {
    console.log("WE ARE HITTING THE SESSION EDIT ROUTE")
    const response = await fetch(`/api/sessions/${session_id}/edit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            party_id,
            title,
            description,
            date,
            time,
            address,
            city,
            state,
            zipcode,
            latitude,
            longitude,
            in_person,
        }),
    });
    const session = await response.json()
    console.log("THIS IS THE EDIT SESSION RESPONSE", session)
    dispatch(editTheSession(session))
}

export const getSessions = (id) => async (dispatch) => {
    const response = await fetch(`/api/sessions/${id}`)
    const sessions = await response.json()
    return dispatch(getAllSessions(sessions))
}

export const deleteSession = (id) => async (dispatch) => {
    console.log("WE ARE HITTING THE DELETE THUNK", id)
    const response = await fetch(`/api/sessions/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const session = await response.json()
    return dispatch(deleteOneSession(session))
}

const initialState = {};

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD:
            newState = Object.assign({}, state, { ...action.payload })
            return newState
        case CREATE_SESSION:
            const new_session = action.payload.session
            const all_sessions = state.all_sessions
            newState = { all_sessions: { ...all_sessions, ...new_session }}
            return newState
        case DELETE:
            const deleted_session = action.payload.session
            newState = Object.assign({}, state)
            delete newState.all_sessions[deleted_session.id]
            return newState
        default:
            return state
    }
}

export default sessionReducer