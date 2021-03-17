import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { enGB } from 'date-fns/locale'
import { DatePicker, DatePickerCalendar } from 'react-nice-dates'
import Geocode from "react-geocode";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

import { createSession } from "../../../store/session"
import "./CreateSessionComponent.css"
import 'react-nice-dates/build/style.css'

const CreateSessionComponent = () => {

    const dispatch = useDispatch()
    const apiKey = process.env.REACT_APP_GOOGLE_KEY
    const partyId = Number.parseInt(useParams().partyId)

    Geocode.setApiKey(apiKey);
    Geocode.setLanguage("en");
    Geocode.setLocationType("ROOFTOP");

      const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState()
    const [time, setTime] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState(states[0])
    const [zipcode, setZipcode] = useState("")
    const [inPerson, setInPerson] = useState(false)

    const getLat = (address, city, state, zipcode) => {
        return Geocode.fromAddress(`${address} ${city}, ${state} ${zipcode}`).then(
            (response) => {
                const { lat } = response.results[0].geometry.location;
                return lat;
            },
            (error) => {
                console.error(error);
                }
                );
        };

    const getLng = (address, city, state, zipcode) => {
        return Geocode.fromAddress(`${address} ${city}, ${state} ${zipcode}`).then(
            (response) => {
                const { lng } = response.results[0].geometry.location;
                return lng;
            },
            (error) => {
                console.error(error);
                }
                );
         };

    const handleSubmit = async (event) => {
        event.preventDefault()
        const lat = await getLat(address, city, state, zipcode);
        const lng = await getLng(address, city, state, zipcode);
        const newSession = {
            party_id: partyId,
            title,
            description,
            date,
            time,
            address,
            city,
            state,
            zipcode,
            latitude: lat,
            longitude: lng,
            in_person: inPerson
        }
        dispatch(createSession(newSession))
        window.location.reload(false)
    }

    return (
        <div className="create-session-div">
            <h1 className="session-message">Create Your Session Below</h1>
            <Form.Group className="session-form">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="title-Form">
                        <Form.Label>Title</Form.Label>
                        <Form.Control value={title} onChange={(event) => setTitle(event.target.value)}/>
                    </Form.Group>
                    <Form.Group className="description-form">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" value={description} onChange={(event) => setDescription(event.target.value)}/>
                    </Form.Group>

                    <Form.Row>
                    <Form.Group as={Col} className="date-form">
                        <Form.Label>Choose Date</Form.Label>
                        <DatePicker date={date} onDateChange={setDate} locale={enGB}>
                            {({ inputProps, focused }) => (
                                <Form.Control
                                    className={'input' + (focused ? ' -focused' : '')}
                                    {...inputProps}
                                />
                            )}
                        </DatePicker>
                    </Form.Group>
                    <Form.Group as={Col} className="time-form">
                        <Form.Label>Time of Session?</Form.Label>
                        <Form.Control value={time} onChange={(event) => setTime(event.target.value)} />
                    </Form.Group>
                    </Form.Row>

                    <Form.Row>
                    <Form.Group as={Col} className="address-form">
                        <Form.Label>Address</Form.Label>
                        <Form.Control value={address} onChange={(event) => setAddress(event.target.value)} />
                    </Form.Group>
                    <Form.Group as={Col} className="city-form">
                        <Form.Label>City</Form.Label>
                        <Form.Control value={city} onChange={(event) => setCity(event.target.value)}/>
                    </Form.Group>
                    </Form.Row>

                    <Form.Row>
                    <Form.Group as={Col} className="state-form">
                        <Form.Label>State</Form.Label>
                        <br></br>
                        <select value={state} onChange={(e) => setState(e.target.value)}>
                            {states.map((state) => (
                                <option key={state}>{state}</option>
                            ))}
                        </select>
                    </Form.Group>
                    <Form.Group as={Col} className="zipcode-form">
                        <Form.Label>Zipcode</Form.Label>
                        <Form.Control type="number" value={zipcode} onChange={(event) => setZipcode(event.target.value)}/>
                    </Form.Group>
                    </Form.Row>

                    <Form.Group className="physical-form">
                        <Form.Check type="checkbox" label="Are you playing in person?" value={inPerson} onChange={(event) => setInPerson(!inPerson)}/>
                    </Form.Group>
                    <Button className="m-2" variant="dark" type="submit">Submit</Button>
                </Form>
            </Form.Group>
        </div>
    )
}

export default CreateSessionComponent