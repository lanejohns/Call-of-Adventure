import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { enGB } from 'date-fns/locale'
import { DatePicker, DatePickerCalendar } from 'react-nice-dates'
import Geocode from "react-geocode";
import 'react-nice-dates/build/style.css'

const CreateSessionComponent = () => {

    const apiKey = process.env.REACT_APP_GOOGLE_KEY
    const partyId = Number.parseInt(useParams().partyId)

    Geocode.setApiKey(googleApiKey);
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
    const [time, setTime] = useState()
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState(states[0])
    const [zipcode, setZipcode] = useState("")
    const [inPerson, setInPerson] = useState("")

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
    }

    return (
        <div>
            <h1>This is the Session Creation Component</h1>
            <div className="session-form">
                <form onSubmit={handleSubmit}>
                    <div className="title-form">
                        <label>Title</label>
                        <input value={title} onChange={(event) => setTitle(event.target.value)}/>
                    </div>
                    <div className="description-form">
                        <label>Description</label>
                        <textarea value={description} onChange={(event) => setDescription(event.target.value)}/>
                    </div>
                    <div className="date-form">
                        <label>Choose Date</label>
                        <DatePicker date={date} onDateChange={setDate} locale={enGB}>
                            {({ inputProps, focused }) => (
                                <input
                                    className={'input' + (focused ? ' -focused' : '')}
                                    {...inputProps}
                                />
                            )}
                        </DatePicker>
                    </div>
                    <div className="time-form">
                        <label>What time will you be gathering?</label>
                        <input type="time" value={time} onChange={(event) => setTime(event.target.value)} />
                    </div>
                    <div className="address-form">
                        <label>Address</label>
                        <input value={address} onChange={(event) => setAddress(event.target.value)} />
                    </div>
                    <div className="city-form">
                        <label>City</label>
                        <input value={city} onChange={(event) => setCity(event.target.value)}/>
                    </div>
                    <div className="state-form">
                        <label>State</label>
                        <select value={state} onChange={(e) => setState(e.target.value)}>
                            {states.map((state) => (
                                <option key={state}>{state}</option>
                            ))}
                        </select>
                    </div>
                    <div className="zipcode-form">
                        <label>Zipcode</label>
                        <input value={zipcode} onChange={(event) => setZipcode(event.target.value)}/>
                    </div>
                    <div className="physical-form">
                        <label>Are you playing in person?</label>
                        <input type="checkbox" value={inPerson} onChange={(event) => setInPerson(event.target.value)}/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateSessionComponent