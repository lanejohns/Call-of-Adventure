import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom";

import { WrappedGoogleMap } from "../GoogleMapsComponent"
import { getParty } from "../../store/party"
import { getSessions, deleteSession } from "../../store/session"
import CreateSessionComponent from "../SessionComponent/CreateSessionComponent/index"
import PartySessionsComponent from "../PartySessionsComponent/index"
import "./PartyProfile.css"

const PartyProfileComponent = () => {

    const dispatch = useDispatch()
    const party = useSelector(state => state.parties.party)
    const sessions = useSelector(state => state.sessions.all_sessions)
    const partyId = Number.parseInt(useParams().partyId)
    const history = useHistory()
    const apiKey = process.env.REACT_APP_GOOGLE_KEY

    const [createSession, setCreateSession] = useState(false)
    const [viewSessions, setViewSessions] = useState(false)

    const handleClick = () => {
        setCreateSession(!createSession)
        history.push(`/party/${partyId}`)
    }

    const handleSessions = () => {
        setViewSessions(!viewSessions)
    }

    const handleDelete = (id) => {
        dispatch(deleteSession(id))
        // dispatch(getSessions(partyId))
        history.push(`/party/${partyId}`)
    }

    useEffect(() => {
        dispatch(getParty(partyId))
        // dispatch(getSessions(partyId))
    }, [dispatch])

    return (
        <div>
            {party && 
            <div>
                <h1>{party.party_name}</h1>
                <button onClick={handleClick}>Make a session</button>
                <button onClick={handleSessions}>View yours sessions</button>
            </div>
            }
            {/* {sessions && 
            Object.values(sessions).map((session) => (
                <div>
                    <div>{session.title}</div>
                    <button onClick={(event) => handleDelete(session.id)}>Delete Session</button>
                </div>
            ))
            } */}
            {createSession == true && 
            <CreateSessionComponent />
            }
            {viewSessions == true && 
            <PartySessionsComponent partyId={partyId}/>
            }
            <WrappedGoogleMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`}
                loadingElement={<div style={{ height: "400px" }} />}
                containerElement={<div style={{ height: "800px" }} />}
                mapElement={<div style={{ height: "800px" }} />}
            />
        </div>
    )
}

export default PartyProfileComponent