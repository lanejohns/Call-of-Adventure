import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Button from 'react-bootstrap/Button'

import EditSessionComponent from "../EditSessionComponent/index"
import "./PartySessionsComponent.css"
import { getSessions, deleteSession } from "../../store/session"

const PartySessionsComponent = ({partyId}) => {

    const sessions = useSelector(state => state.sessions.all_sessions)
    const [openEdit, setOpenEdit] = useState(false)
    const dispatch = useDispatch()

    const handleDelete = (id) => {
        dispatch(deleteSession(id))
        dispatch(getSessions(partyId))
         window.location.reload(false)
    }

    
    return (
        <div>
            {sessions && 
            Object.values(sessions).map((session) => (
                <div>
                    <div className="session-title">{session.title}</div>
                    <div className="session-date" >{session.date}</div>
                    <div className="session-address" >{session.address}</div>
                    <Button className="m-2" variant="danger" onClick={(event) => handleDelete(session.id)}>Delete Session</Button>
                    <Button  className="m-2" variant="dark" onClick={(event) => setOpenEdit(!openEdit)}>Edit Session</Button>
                    {openEdit == true && 
                    <EditSessionComponent session={session}/>
                    }
                </div>
            ))
            }
        </div>
    )
}

export default PartySessionsComponent