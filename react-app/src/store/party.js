const CREATE_PARTY = "party/createNewParty"
const GET_PARTY = "party/getSingleParty"
const ALL_PARTIES = "party/getAllParties"

const createNewParty = (party) => {
    return {
        type: CREATE_PARTY,
        payload: party
    }
}

const getSingleParty = (party) => {
    return {
        type: GET_PARTY,
        payload: party
    }
}

const getAllParties = (parties) => {
    return {
        type: ALL_PARTIES,
        payload: parties
    }
}


export const createParty = (payload) => async (dispatch) => {
    console.log("STARTING THE THUNK", payload)
    const response = await fetch("/api/parties/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    console.log("THIS IS THE RESPONSE", response)
    const party = await response.json()
    console.log("THIS IS THE PARTY", party)
    dispatch(createNewParty(party))
    return party
}

export const getParty = (id) => async (dispatch) => {
    const response = await fetch(`/api/parties/${id}`)
    const party = await response.json()
    dispatch(getSingleParty(party))
    return party
}

export const getParties = () => async (dispatch) => {
    const response = await fetch("/api/parties")
    const parties = await response.json()
    dispatch(getAllParties(parties))
    return parties
}

const initialState = {};

const partyReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case CREATE_PARTY:
            const newParty = action.payload.party
            const allParties = state.allParties
            newState = { allParties: {...allParties,...newParty}}
            return newState
        case GET_PARTY:
            newState = Object.assign({}, state, { ...action.payload })
            return newState
        case ALL_PARTIES:
            newState = Object.assign({}, state, { ...action.payload })
            return newState
        default:
            return state
    }
}

export default partyReducer

