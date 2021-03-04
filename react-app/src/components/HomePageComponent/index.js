import { WrappedGoogleMap } from "../GoogleMapsComponent"

import React from "react"

import { WrappedGoogleMap } from "../GoogleMapsComponent"

const HomeComponent = () => {

    const apiKey = process.env.REACT_API_GOOGLE_KEY
    return (
        <div>
            <WrappedGoogleMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`}
                loadingElement={<div style={{ height: "400px" }} />}
                containerElement={<div style={{ height: "800px" }} />}
                mapElement={<div style={{ height: "800px" }} />}
            />
        </div>
    )
}