import React, { useEffect, useRef, useState } from 'react'
import PlacesAutocomplete, {geocodeByAddress, getLatLng, geocodeByPlaceId  } from 'react-places-autocomplete';
import Loaderel from '../Loader/Loader';
import './Locationinput.css'
import Geocode from "react-geocode";
import Textarea from '../Textarea/Textarea';
Geocode.setApiKey("AIzaSyC_kRll30Q2kyLh4ohCadNE4HRGbOP0GqA");

Geocode.setLanguage("en");

function Locationtext(props){ 
  const {location, notificationsystem} = props
  const [adress, setAdress] = useState('')

  useEffect(()=>{
    if(location.lat!==null && location.lng!==null) {
      Geocode.fromLatLng(location.lat, location.lng).then(
        (response) => {
          const address = response.results[0].formatted_address;
         setAdress(address)
        },
      );
    }
  },[location])


  return <div className="locationtext">
      <Textarea state={adress} readonly notificationsystem={notificationsystem}/>
  </div>
}
export default Locationtext