import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { getSessions, deleteSession } from "../../store/session"

const PartySessionsComponent = ({partyId}) => {

    const sessions = useSelector(state => state.sessions.all_sessions)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSessions(partyId))
    }, [dispatch])

    const handleDelete = (id) => {
        dispatch(deleteSession(id))
        // dispatch(getSessions(partyId))
    }
    
    return (
        <div>
            {sessions && 
            Object.values(sessions).map((session) => (
                <div>
                    <div>{session.title}</div>
                    <button onClick={(event) => handleDelete(session.id)}>Delete Session</button>
                </div>
            ))
            }
        </div>
    )
}

export default PartySessionsComponent