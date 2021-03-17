import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button'

import { WrappedGoogleMap } from "../GoogleMapsComponent"
import { getParty } from "../../store/party"
import { getSessions, deleteSession } from "../../store/session"
import { deleteThunk } from "../../store/party"
import { getMembers } from "../../store/user"
import CreateSessionComponent from "../SessionComponent/CreateSessionComponent/index"
import PartySessionsComponent from "../PartySessionsComponent/index"
import "./PartyProfile.css"

const PartyProfileComponent = () => {

    const dispatch = useDispatch()
    const party = useSelector(state => state.parties.party)
    const sessions = useSelector(state => state.sessions.all_sessions)
    const members = useSelector(state => state.users.members)
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

    const handleDelete = () => {
        dispatch(deleteThunk(partyId))
        history.push("/")
    }


    useEffect(() => {
        dispatch(getParty(partyId))
        dispatch(getSessions(partyId))
        dispatch(getMembers(partyId))
    }, [dispatch])

    return (
        <div>
            {party && 
            <div className="party-profile">
                <h1 className="party-name">{party.party_name}</h1>
                <div className="party-mems">
                    <h1>Party Members</h1>
                    {members && members.map((member) => (
                        <h3>{member.username}</h3>
                    ))}
                </div>
                <Button className="delete-button m-2" variant="danger" onClick={handleDelete}>Delete your party</Button>
                <Button className="make-session-button m-2" variant="dark" onClick={handleClick}>Make a session</Button>
                <Button  className="view-session-button m-2" variant="dark" onClick={handleSessions}>View your sessions</Button>
            </div>
            }
            {createSession === true && 
            <CreateSessionComponent />
            }
            {viewSessions === true && 
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