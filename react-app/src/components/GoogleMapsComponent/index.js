import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { getUsers } from "../../store/user"


const GoogleMapComponent = () => {
    const allUsers = useSelector((state) => state.users.users);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    return (
        <GoogleMap
        defaultZoom={13}
        defaultCenter={{lat: 42.3551, lng: -71.0656}}
        // defaultOptions={{styles:mapStyles}}
        >
            {allUsers && 
            Object.values(allUsers).map((user) => (
                <Marker 
                key={user.id}
                position={{ lat: user.latitude, lng: user.longitude }}
                />
            ))
            }
        </GoogleMap>
    )
}

export const WrappedGoogleMap = withScriptjs(
    withGoogleMap(GoogleMapComponent)
)