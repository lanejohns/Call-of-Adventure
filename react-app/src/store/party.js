const CREATE_PARTY = "party/createNewParty"

const createNewParty = (party) => {
    return {
        type: CREATE_PARTY,
        payload: party
    }
}


export const createParty = ({partyName, partySize, openToRequest}) => async (dispatch) => {
    const response = await fetch("api/parties/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({partyName, partySize, openToRequest})
    })
    const party = await response.json()
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

