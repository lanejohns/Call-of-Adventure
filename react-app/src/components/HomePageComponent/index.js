import React from "react"
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Jumbotron'

import { WrappedGoogleMap } from "../GoogleMapsComponent"

const HomeComponent = () => {

    const apiKey = process.env.REACT_APP_GOOGLE_KEY
    return (
        <div>
            <Jumbotron fluid>
                <Container>
                    <h1>This is the Jumbotron</h1>
                    <p>
                        This is the modded jumbotron that occupies the entire horizontal space of its parent
                    </p>
                </Container>
            </Jumbotron>
            <WrappedGoogleMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`}
                loadingElement={<div style={{ height: "400px" }} />}
                containerElement={<div style={{ height: "800px" }} />}
                mapElement={<div style={{ height: "800px" }} />}
            />
        </div>
    )
}

export default HomeComponent