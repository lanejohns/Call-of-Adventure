import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { getParty } from "../../store/party"
import "./PartyProfile.css"

const PartyProfileComponent = () => {

    const dispatch = useDispatch()
    const party = useSelector(state => state.parties.party)
    const partyId = Number.parseInt(useParams().partyId)

    useEffect(() => {
        dispatch(getParty(partyId))
    }, [dispatch])

    return (
        <div>
            {party && 
            <h1>{party.party_name}</h1>
            }
        </div>
    )
}

export default PartyProfileComponent