import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { enGB } from 'date-fns/locale'
import { DatePicker, DatePickerCalendar } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

const CreateSessionComponent = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState()
    const [time, setTime] = useState()
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [inPerson, setInPerson] = useState("")

    return (
        <div>
            <h1>This is the Session Creation Component</h1>
            <div className="session-form">
                <form>
                    <div className="title-form">
                        <label>Title</label>
                        <input value={title} onChange={setTitle}/>
                    </div>
                    <div className="description-form">
                        <label>Description</label>
                        <textarea value={description} onChange={setDescription}/>
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
                        <input type="time" value={time} onChange={setTime} />
                    </div>
                    <div className="address-form">
                        <label>Address</label>
                        <input value={address} onChange={setAddress} />
                    </div>
                    <div className="city-form">
                        <label>City</label>
                        <input value={city} onChange={setCity}/>
                    </div>
                    <div className="zopcode-form">
                        <label>Zipcode</label>
                        <input value={zipcode} onChange={setZipcode}/>
                    </div>
                    <div className="physical-form">
                        <label>Are you playing in person?</label>
                        <input type="checkbox" value={inPerson} onChange={setInPerson}/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateSessionComponent