const CREATE_PARTY = "party/createNewParty"

const createNewParty = (party) => {
    return {
        type: CREATE_PARTY,
        payload: party
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

const initialState = {};

const partyReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case CREATE_PARTY:
            const newParty = action.payload.party
            const allParties = state.allParties
            newState = { allParties: {...allParties,...newParty}}
            return newState
        default:
            return state
    }
}

export default partyReducer

