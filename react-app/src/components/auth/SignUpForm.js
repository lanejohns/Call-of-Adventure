import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import Geocode from "react-geocode";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

import { signUp } from '../../services/auth';
import { signUpThunk } from "../../store/auth"
import "./SignUpForm.css"

const SignUpForm = () => {
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

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [full_name, setFullName] = useState("Private")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState(states[0])
  const [zipcode, setZipcode] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("");


  const apiKey = process.env.REACT_APP_GOOGLE_KEY
  Geocode.setApiKey(apiKey);
  Geocode.setLanguage("en");
  Geocode.setLocationType("ROOFTOP");

  const theUser = useSelector(state => state.currentUser.id)
  const dispatch = useDispatch()

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

  const onSignUp = async (e) => {
    e.preventDefault();
    const latitude = await getLat(address, city, state, zipcode);
    const longitude = await getLng(address, city, state, zipcode);
    // if (password === repeatPassword) {
    //   const user = await signUp(username, email, password);
    //   if (!user.errors) {
    //     setAuthenticated(true);
    //   }
    // }
    dispatch(signUpThunk({username, email, password, full_name, address, city, state, zipcode, latitude, longitude}))
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  useEffect(() => {
    console.log(username, email, password, repeatPassword, address, city, state, zipcode, full_name)
  }, [username, email, password, repeatPassword, address, city, state, zipcode, full_name])

  if (theUser) {
    return <Redirect to="/" />;
  }


  return (
    <div className="form-container">

      <Form onSubmit={onSignUp}>
        {/* <Form.Group>
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="full_name"
            onChange={(event) => setFullName(event.target.value)}
            value={full_name}
          ></Form.Control>
        </Form.Group> */}
        
        <Form.Row>
          <Form.Group>
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
            ></Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control value={address} onChange={(event) => setAddress(event.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control value={city} onChange={(event) => setCity(event.target.value)}/>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group>
            <Form.Label>State</Form.Label>
              <Form.Control as="select" value={state} onChange={(e) => setState(e.target.value)}>
                  {states.map((state) => (
                      <option key={state}>{state}</option>
                  ))}
              </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Zipcode</Form.Label>
            <Form.Control value={zipcode} onChange={(event) => setZipcode(event.target.value)}/>
          </Form.Group>
        </Form.Row>
        <Button className="m-2" variant="dark" type="submit">Sign Up</Button>
      </Form>
    </div>
  );
};

export default SignUpForm;
