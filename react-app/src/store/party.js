const CREATE_PARTY = "party/createNewParty"
const GET_PARTY = "party/getSingleParty"
const ALL_PARTIES = "party/getAllParties"
const DELETE_PARTY = "party/deleteParty"

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

const deleteParty = (party) => {
    return {
        type: DELETE_PARTY,
        payload: party
    }
}

// const getPartyMembers = (members) => {
//     return {
//         type: GET_MEMBERS,
//         payload: members
//     }
// }


export const createParty = (payload) => async (dispatch) => {
    const response = await fetch("/api/parties/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    const party = await response.json()
    dispatch(createNewParty(party))
    return party
}

export const getParty = (id) => async (dispatch) => {
    const response = await fetch(`/api/parties/${id}`)
    const party = await response.json()
    dispatch(getSingleParty(party))
    return party
}

// export const getMembers = (id) => async (dispatch) => {
//     const response = await fetch(`/api/parties/${id}/members`)
//     const members = await response.json()
//     dispatch(getPartyMembers(members))
//     return members
// }

export const getParties = () => async (dispatch) => {
    const response = await fetch("/api/parties")
    const parties = await response.json()
    dispatch(getAllParties(parties))
    return parties
}

export const deleteThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/parties/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    })
    console.log("DELETETHUNK RESPONSE", response)
    const party = await response.json()
    dispatch(deleteParty(party))
    return party
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
        case DELETE_PARTY:
            const deleted_party = action.payload.party
            newState = Object.assign({}, state)
            const all_parties = state.allParties
            // delete newState.all_parties[deleted_party.id]
            return newState
        default:
            return state
    }
}

export default partyReducer

