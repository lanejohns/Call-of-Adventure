import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import Geocode from "react-geocode";
import { signUp } from '../../services/auth';
import { signUpThunk } from "../../store/auth"

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
  const [full_name, setFullName] = useState("")
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
    dispatch(signUpThunk(username, email, password, full_name, address, city, state, zipcode, latitude, longitude))
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

  if (theUser) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        <label>Full Name</label>
        <input
          type="text"
          name="full_name"
          onChange={(event) => setFullName(event.target.value)}
          value={full_name}
        ></input>
      </div>
      <div>
        <label>User Name</label>
        <input
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
        <div>
          <label>Address</label>
          <input value={address} onChange={(event) => setAddress(event.target.value)} />
        </div>
        <div>
          <label>City</label>
          <input value={city} onChange={(event) => setCity(event.target.value)}/>
        </div>
        <div>
          <label>State</label>
            <select value={state} onChange={(e) => setState(e.target.value)}>
                {states.map((state) => (
                    <option key={state}>{state}</option>
                ))}
            </select>
        </div>
        <div>
          <label>Zipcode</label>
          <input value={zipcode} onChange={(event) => setZipcode(event.target.value)}/>
        </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
