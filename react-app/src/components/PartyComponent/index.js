import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";

import { createParty } from "../../store/party"
import "./PartyComponent.css"

const PartyComponent = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [partyName, setPartyName] = useState("")
    const [partySize, setPartySize] = useState(4)
    const [openToRequest, setOpenToRequest] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        const newParty = {
            partyName,
            partySize,
            openToRequest
        }
        await dispatch(createParty(newParty))
        history.push("/")
    }

    return (
        <div>
            <h1>This is the Party Component!</h1>
            <form onSubmit={handleSubmit}>
                <label>Party Name</label>
                    <input value={partyName} onChange={(event) => setPartyName(event.target.value)} placeholder="Party Name"/>
                <label>Party Size</label>
                    <input value={partySize} onChange={(event) => setPartySize(event.target.value)}/>
                <label>Is your party open to Requests?</label>
                    <input type="checkbox" value={openToRequest} onChange={(event) => setOpenToRequest(!openToRequest)}/>
                <button>Submit</button>
            </form>
        </div>
    )
}
export default PartyComponent