import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { getParty } from "../../store/party"
import CreateSessionComponent from "../SessionComponent/CreateSessionComponent/index"
import "./PartyProfile.css"

const PartyProfileComponent = () => {

    const dispatch = useDispatch()
    const party = useSelector(state => state.parties.party)
    const partyId = Number.parseInt(useParams().partyId)

    const [createSession, setCreateSession] = useState(false)

    const handleClick = () => {
        setCreateSession(!createSession)
    }

    useEffect(() => {
        dispatch(getParty(partyId))
    }, [dispatch])

    return (
        <div>
            {party && 
            <div>
                <h1>{party.party_name}</h1>
                <button onClick={handleClick}>Make a session</button>
            </div>
            }
            {createSession == true && 
            <CreateSessionComponent />
            }
        </div>
    )
}

export default PartyProfileComponent