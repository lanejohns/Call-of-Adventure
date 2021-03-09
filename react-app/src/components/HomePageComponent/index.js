import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Jumbotron'

import { WrappedGoogleMap } from "../GoogleMapsComponent"
import { getUsers } from "../../store/user"
import { getParties } from "../../store/party"
import { currentUser } from "../../store/auth"

const HomeComponent = () => {

    const dispatch = useDispatch()
    const allUsers = useSelector((state) => state.users.users);
    const allParties = useSelector(state => state.parties.all_parties)
    // const theUser = useSelector(state => state.currentUser.id)

    useEffect(() => {
        dispatch(getUsers())
        // dispatch(getParties())
        // dispatch(currentUser())
    }, [dispatch])


    const apiKey = process.env.REACT_APP_GOOGLE_KEY
    return (
        <div>
            <Jumbotron fluid>
                <Container>
                    <h1>This is the Jumbotron</h1>
                    <p>
                        This is the modded jumbotron that occupies the entire horizontal space of its parent
                    </p>
                    <div>
                        {allUsers && 
                        <h4>There are {Object.keys(allUsers).length} other users in your area.</h4>}
                    </div>
                    <div>
                        {allParties && 
                        <h4>There are {Object.keys(allParties).length} parties in your area.</h4>}
                    </div>
                    
                    
                </Container>
            </Jumbotron>
            {/* <WrappedGoogleMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`}
                loadingElement={<div style={{ height: "400px" }} />}
                containerElement={<div style={{ height: "800px" }} />}
                mapElement={<div style={{ height: "800px" }} />}
            /> */}
        </div>
    )
}

export default HomeComponent