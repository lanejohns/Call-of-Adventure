import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

import "./HomePageComponent.css"
import { WrappedGoogleMap } from "../GoogleMapsComponent"
import { HomeWrappedGoogleMap } from "../HomeGoogleComponent"
import { getUsers } from "../../store/user"
import { getParties } from "../../store/party"
import { currentUser } from "../../store/auth"

const HomeComponent = () => {

    const dispatch = useDispatch()
    const allUsers = useSelector((state) => state.users.users);
    const allParties = useSelector(state => state.parties.all_parties)
    const theUser = useSelector((state) => state.currentUser)
    const history = useHistory()

    useEffect(() => {
        dispatch(getUsers())
        dispatch(currentUser())
    }, [dispatch])

    const partyClick = () => {
      history.push(`/party/${theUser.party_id}`)
    }

    const partyCreateClick = () => {
      history.push("/party/create")
    }

    let sessionLinks;
    if (theUser.party_id != null) {
        sessionLinks = (
        <>
        {/* <Nav.Link href={`/party/${theUser.party_id}`}>Your Party</Nav.Link> */}
        <Button className="m-2" size="lg" variant="dark" onClick={partyClick}>Your Party</Button>
        </>
        )
    } else {
        sessionLinks = (
        <>
            {/* <Nav.Link href="/party/create">Create a Party</Nav.Link> */}
            <Button className="m-2" size="lg" variant="dark" onClick={partyCreateClick}>Create Party</Button>
        </>
        )
    }


    const apiKey = process.env.REACT_APP_GOOGLE_KEY
    return (
        <div home-page>
            <Jumbotron className="jumbotron-body" fluid>
                <Container className="container-body">
                    <div className="d-20 image"></div>
                    <div className="text-body">
                        <h1>Call of Adventure</h1>
                        {theUser.id && 
                        <h2>Welcome {theUser.username}!</h2>
                        }
                        <h4>
                            Check out the map below and get your tabletop games rolling!
                        </h4>
                        {/* <div>
                            {allUsers && 
                            <h4>There are {Object.keys(allUsers).length} other users in your area.</h4>}
                        </div> */}
                        <hr className="m-3"></hr>
                        {theUser.id && sessionLinks}
                    </div>
                    
                </Container>
            </Jumbotron>
            <HomeWrappedGoogleMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`}
                loadingElement={<div style={{ height: "400px" }} />}
                containerElement={<div style={{ height: "800px" }} />}
                mapElement={<div style={{ height: "800px" }} />}
            />
        </div>
    )
}

export default HomeComponent