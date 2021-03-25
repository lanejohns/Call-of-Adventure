import ReactQuill from 'react-quill'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import parser from 'react-html-parser'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import 'react-quill/dist/quill.snow.css'

import { postThunk } from "../../store/post"
import "./ReactQuillComponent.css"

const ReactQuillComponent = ({partyId}) => {
    const [content, setContent] = useState("")
    const theUser = useSelector((state) => state.currentUser)
    const dispatch = useDispatch()

    const handleChange = (value) => {
        setContent(value)
    }

    const onPost = (event) => {
        event.preventDefault()
        const payload = {
            party_id: partyId,
            // user_id: theUser.id,
            body: content
        }
        dispatch(postThunk(payload))
        setContent("")
        window.location.reload(false)
    }

    return (
        <div>
            <Form onSubmit={onPost}>
                <ReactQuill value={content} onChange={handleChange} />
                <Button type="submit" className="m-2" variant="dark">Post</Button>
            </Form>
        </div>
    )
}

export default ReactQuillComponent