import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

import { searchUser } from "../../store/user"

const SearchBarComponent = () => {
    const dispatch = useDispatch()
    const [user, setUser] = useState("")

    const handleSearch = (event) => {
        event.preventDefault()
        dispatch(searchUser(user))
        
    }

    return (
        <div>
            <h1>Search by Username</h1>
            <Form>
                <Form.Group>
                    <Col>
                        <Form.Control sm={3} className="my-1" value={user} onChange={(event) => setUser(event.target.value)} />
                        <Button className="m-2" variant="dark" type="submit" onClick={handleSearch}>Search</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
        

    )
}

export default SearchBarComponent