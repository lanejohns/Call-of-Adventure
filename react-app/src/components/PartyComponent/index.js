import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";

import { WrappedGoogleMap } from "../GoogleMapsComponent"
import { createParty } from "../../store/party"
import "./PartyComponent.css"

const PartyComponent = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const apiKey = process.env.REACT_APP_GOOGLE_KEY

    const [partyName, setPartyName] = useState("")
    const [partySize, setPartySize] = useState(4)
    const [openToRequest, setOpenToRequest] = useState(false)

    const handleSubmit = async (event) => {
        console.log("HITTING HANDLESUBMIT")
        event.preventDefault()
        const newParty = {
            party_name: partyName,
            party_size: partySize,
            open_to_request: openToRequest
        }
        console.log("GETTING THE NEWPARTY", newParty)
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
            <div>
            <WrappedGoogleMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`}
                loadingElement={<div style={{ height: "400px" }} />}
                containerElement={<div style={{ height: "800px" }} />}
                mapElement={<div style={{ height: "800px" }} />}
            />
        </div>
        </div>
    )
}
export default PartyComponent