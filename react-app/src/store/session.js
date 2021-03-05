const CREATE_SESSION = "session/createNewSession"
const LOAD = "session/getAllSessions"

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
    const session = await response.json()
    dispatch(createNewSession(session))
}

export const getSessions = () => (dispatch) => {
    const response = await fetch("/api/sessions")
    const sessions = await response.json()
    return dispatch(getAllSessions(sessions))
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
    }
}

export default sessionReducer