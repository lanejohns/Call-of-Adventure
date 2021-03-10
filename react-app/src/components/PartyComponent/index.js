import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";

import { getUsers } from "../../store/user"
import { createParty } from "../../store/party"
import "./PartyComponent.css"

const PartyComponent = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const allUsers = useSelector((state) => state.users.users);
    const theUser = useSelector((state) => state.currentUser)



    const [partyName, setPartyName] = useState("")
    const [partySize, setPartySize] = useState(4)
    const [openToRequest, setOpenToRequest] = useState(false)
    const [selected, setSelected] = useState("")
    const [partyMembers, setPartyMembers] = useState([theUser.username])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const newParty = {
            party_name: partyName,
            party_size: partySize,
            open_to_request: openToRequest,
            partyMembers
        }
        await dispatch(createParty(newParty))
        history.push("/")
    }

    const addMember = (event) => {
        event.preventDefault()
        setPartyMembers([...partyMembers, selected])
    }

    const removeMembers = (event) => {
        event.preventDefault()
        setPartyMembers([])
    }

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

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
                <label>Party Members</label>
                    <select value={selected} onChange={event => setSelected(event.target.value)}>
                        {allUsers && 
                            Object.values(allUsers).map((user) => (
                                <option value={user.username} key={user.id}>{user.username}</option>
                            ))
                        }
                    </select>
                <label>Selected Party Members</label>
                    <div className="party-members">
                        {partyMembers.length > 0 && partyMembers.map((member) => (
                            <h5 key={member}>{member}</h5>
                        ))}
                        <button onClick={event => removeMembers(event)}>Discard party</button>
                    </div>
                    <button onClick={addMember}>Add Party Member</button>
                <button>Submit</button>
            </form>
        </div>
    )
}
export default PartyComponent