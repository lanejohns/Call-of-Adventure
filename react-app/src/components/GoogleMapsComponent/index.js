import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

const GoogleMapComponent = () => {
    return (
        <GoogleMap
        defaultZoom={6}
        defaultCenter={{lat: 42.3551, lng: -71.0656}}
        // defaultOptions={{styles:mapStyles}}
        ></GoogleMap>
    )
}

export const WrappedGoogleMap = withScriptjs(
    withGoogleMap(GoogleMapComponent)
)