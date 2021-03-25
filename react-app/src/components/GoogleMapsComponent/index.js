import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

import { getSessions } from "../../store/session"


const GoogleMapComponent = () => {
    const allUsers = useSelector((state) => state.users.users);
    const userPartyId = useSelector(state => state.currentUser.party_id)
    const userSessions = useSelector(state => state.sessions.all_sessions)
    const dispatch = useDispatch()

    const [selectedSession, setSelectedSession] = useState(null)

    useEffect(() => {
        dispatch(getSessions(userPartyId))
    }, [dispatch])

    return (
        <GoogleMap
        defaultZoom={13}
        defaultCenter={{lat: 42.3551, lng: -71.0656}}
        // defaultOptions={{styles:mapStyles}}
        >
            {userSessions && 
                Object.values(userSessions).map((session) => (
                    <Marker 
                        key={session.id}
                        position={{ lat: session.latitude, lng: session.longitude }}
                        onClick={() => {
                            setSelectedSession(session)
                        }}
                    />
                ))}
                {selectedSession && (
                    <InfoWindow
                        position={{ lat: selectedSession.latitude, lng: selectedSession.longitude }}
                        onCloseClick={() => {
                            setSelectedSession(null)
                        }}
                    >
                        <div>
                            {selectedSession.address}
                            <hr></hr>
                            {selectedSession.date}
                            <hr></hr>
                            {selectedSession.description}
                        </div>
                    </InfoWindow>
                )}
        </GoogleMap>
    )
}

export const WrappedGoogleMap = withScriptjs(
    withGoogleMap(GoogleMapComponent)
)