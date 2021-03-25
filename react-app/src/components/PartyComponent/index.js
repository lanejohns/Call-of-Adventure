import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

import { getUsers } from "../../store/user"
import { createParty } from "../../store/party"
import { currentUser } from "../../store/auth"
import SearchBarComponent from "../SearchBarComponent/index"
import "./PartyComponent.css"

const PartyComponent = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const theUser = useSelector((state) => state.currentUser)
    let searchedUsers = useSelector((state) => state.users.searched_users)



    const [partyName, setPartyName] = useState("")
    const [partySize, setPartySize] = useState(4)
    const [openToRequest, setOpenToRequest] = useState(true)
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
        await dispatch(currentUser())
        history.push("/")
    }

    const addMember = (event, username) => {
        event.preventDefault()
        setSelected(username)
        // setPartyMembers([...partyMembers, selected])
    }

    const removeMembers = (event) => {
        event.preventDefault()
        setPartyMembers([theUser.username])
    }

    useEffect(() => {
        dispatch(getUsers())
        dispatch(currentUser())
        setPartyMembers([...partyMembers, selected])
    }, [dispatch, selected])


    return (
        <div className="party-body">
            <Form onSubmit={handleSubmit}>
                <Form.Row >
                <Form.Group className="party-name-input">
                    <Form.Label >Party Name</Form.Label>
                    <Form.Control value={partyName} onChange={(event) => setPartyName(event.target.value)} placeholder="Party Name"/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Party Size</Form.Label>
                    <Form.Control value={partySize} onChange={(event) => setPartySize(event.target.value)}/>
                </Form.Group>

                </Form.Row>

                {/* <Form.Group as={Col}>
                    <Form.Check type="checkbox" label="Is your party open to Requests?" value={openToRequest} onChange={(event) => setOpenToRequest(!openToRequest)}/>
                </Form.Group> */}

                <Form.Group as={Col} className="party-group-box">
                    {/* <Form.Label>Party Members</Form.Label> */}
                    <SearchBarComponent />
                    {searchedUsers && Object.values(searchedUsers).map((user) => (
                        <div>
                            <h5 value={user.username} key={user}>{user.username}</h5>
                            <Button className="m-2" variant="dark" key={user.id} onClick={(event) => addMember(event, user.username)}>Add Party Member</Button>
                        </div>
                    ))}
                </Form.Group>

                <Form.Group className="party-selected">
                    <Form.Label>Selected Party Members</Form.Label>
                    <div className="party-members">
                        {partyMembers.length > 0 && partyMembers.map((member) => (
                            <h5 key={member}>{member}</h5>
                        ))}
                        <Button className="m-2" variant="danger" onClick={event => removeMembers(event)}>Discard party</Button>
                    </div>
                </Form.Group>
                <Button className="m-2" variant="dark" size="lg" onClick={handleSubmit} block>Submit</Button>
            </Form>
        </div>
    )
}
export default PartyComponent