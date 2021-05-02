import React, { useEffect, useRef, useState } from 'react'
import PlacesAutocomplete, {geocodeByAddress, getLatLng, geocodeByPlaceId  } from 'react-places-autocomplete';
import Loaderel from '../Loader/Loader';
import './Locationinput.css'
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyC_kRll30Q2kyLh4ohCadNE4HRGbOP0GqA");

Geocode.setLanguage("en");

function Locationinput(props){

  const {state, readonly, setCopy, copy, setState, setState2, setState3, disabled} = props
  const [value, setValue] = useState(state && state.placeid)
  const handleSelect = async (value, placeId) => {
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0]) 
    setState(latLng)      
    setValue(results[0].formatted_address)
    setState2 &&setState2(latLng)
    const [place] = await geocodeByPlaceId(placeId);
    const { long_name: postalCode = '' } =
    place.address_components.find(c => c.types.includes('postal_code')) || {};
    setState3&& setState3({postalcode: postalCode, name: results[0].formatted_address})

  }

  useEffect(()=>{
    if(state.lat!==null && state.lng!==null) {
      Geocode.fromLatLng(state.lat, state.lng).then(
        (response) => {
          const address = response.results[0].formatted_address;
          setValue(address)
        },
      );
    }
    if(copy){
      document.getElementById("copy-text").onclick = function() {
        this.select()
         document.execCommand('copy');
       }
    }
    
  },[state])

  
  return <PlacesAutocomplete  onSelect={handleSelect} value={value} onChange={e=>setValue(e)}>
  {({ getInputProps, suggestions, getSuggestionItemProps, loading })=>(
  <div>
      <label onClick={()=>{setCopy&&setCopy(true); setTimeout(()=>{setCopy&&setCopy(false)},4000)}} className='locationLabel'>
      <input id={copy?'copy-text':''}  required {...getInputProps({placeholder: ''})} readOnly={readonly} disabled={disabled}/>
      {!disabled&&<span>Adress</span>}
      </label>
      {suggestions.length!==0&& <div className={loading?'autocomplete autoloading':'autocomplete'}>
        {loading&&<Loaderel size={30} type='Grid'/>}

        {suggestions.map(suggestion=>{
          const style = {
            backgroundColor: suggestion.active?'var(--light)':'#fff'
          }
          return <div {...getSuggestionItemProps(suggestion,{style})} className='sug'>{suggestion.description}</div>
        })}
      </div>}
  </div>
  )}
 </PlacesAutocomplete>

}
export default Locationinput