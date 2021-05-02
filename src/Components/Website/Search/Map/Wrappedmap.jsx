import { useState } from 'react';
import {withScriptjs, withGoogleMap} from 'react-google-maps'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import { Link, NavLink } from 'react-router-dom';
import Icon from '../../../Icon/Icon';
import Input from '../../../Input/Input';
import Loaderel from '../../../Loader/Loader';
import Locationinput from '../../../Locationinput/Locationinput';
import Element from '../../../Themebtn/Element';
import Themebtn from '../../../Themebtn/Themebtn';
import Individmap from './Individmap';
import { getDistanceFromLatLonInKm } from './Latlongkm';
import Map from './Map';
import './Wrappedmap.css'

function Wrappedmap(props) {
  const {radius, setRadius, userslocation, setUserslocation, setAdress,setMapbool, jobs} = props
  const WrappedMap = withScriptjs(withGoogleMap(Map))
  const [place, setPlace] = useState('')
  const [destination, setDestination] = useState({
    lat: null,
    lng: null
  })
  const [defaultCenter, setDefaultCenter] = useState({
    lat: userslocation.lat,
    lng: userslocation.lng
  })
  const [activekmbtn, setActivekmbtn] = useState('')
  const km = [
  {text: '1km', radius: 1000}, 
  {text:'5km', radius: 5000}, 
  {text:'10km', radius: 10000}, 
  {text:'20km', radius: 20000},
  {text: 'All Locations', radius: Infinity}
]
  const kmrow = km?.map(k=>{
    return <a style={{cursor: 'pointer'}} href className={activekmbtn===k.text?'kmbtn activekm':'kmbtn'} onClick={()=>{setRadius(k.radius/1000); setActivekmbtn(k.radius/1000+'km')}} >
    <Element El='span' text={k.text} icon='fad fa-road'/>
  </a>
  })
 
  return <div className='map'>
    <Icon icon='fal fa-times' setState={setMapbool} state={false}/>
    <div style={{marginTop: '15px'}}>
    <Element El='h2' text='Radius'/>
   <div className="filterdistances">
      {kmrow}
      <input type="number" placeholder='Custom...' value={radius} onChange={e=>setRadius(parseFloat(e.target.value))}/>
   </div>
    </div>
   <div>
    <Locationinput state={userslocation} setState2={setDefaultCenter} setState3={setAdress} setState={setUserslocation}/>
    <Individmap 
    jobs={jobs} 
    radius={radius} 
    setDefaultCenter={setDefaultCenter} 
    userslocation={userslocation} 
    defaultCenter={defaultCenter} 
    destination={destination}
    setDestination={setDestination}
    />  
   </div>
    </div>
        
}
export default Wrappedmap