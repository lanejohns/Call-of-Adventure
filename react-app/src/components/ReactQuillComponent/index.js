import ReactQuill from 'react-quill'
import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import 'react-quill/dist/quill.snow.css'

const ReactQuillComponent = () => {
    const [content, setContent] = useState("")

    return (
        <div>
            <Form>
                <ReactQuill value={content} />
                <Button className="m-2" variant="dark">Post</Button>
            </Form>
        </div>
    )
}

export default ReactQuillComponent