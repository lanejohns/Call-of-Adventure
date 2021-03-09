import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import EditSessionComponent from "../EditSessionComponent/index"
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
                    <div>{session.title}</div>
                    <button onClick={(event) => handleDelete(session.id)}>Delete Session</button>
                    <button onClick={(event) => setOpenEdit(!openEdit)}>Edit Session</button>
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