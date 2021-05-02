import React, {useEffect, useState} from 'react'
import {GoogleMap, withScriptjs, withGoogleMap, Marker, Circle, InfoWindow} from 'react-google-maps'
import Locationinput from '../../../Locationinput/Locationinput'
import Locationtext from '../../../Locationinput/Locationtext'
import Element from '../../../Themebtn/Element'
import { getDistanceFromLatLonInKm } from './Latlongkm'


function Map(props){  
  const {userslocation, destination,setUserslocation, defaultCenter, setDefaultCenter, radius, jobs} = props
  const [showtooltip, setShowtooltip] = useState(false)
  const markers = jobs?.filter(x=>getDistanceFromLatLonInKm(x.lat, x.lng, userslocation.lat, userslocation.lng)<=radius).map(job=>{
    return <>
      <div className="marker">
      <Marker   icon={{
      url: `http://maps.google.com/mapfiles/kml/paddle/${job.job.slice(0, 1)}.png`,
      }} onDblClick={()=>{setDefaultCenter({lat: parseFloat(job.lat), lng: parseFloat(job.lng)})}} position={{lat: parseFloat(job.lat), lng: parseFloat(job.lng)}}
        onClick={()=>setShowtooltip(!showtooltip)}
      >
      {showtooltip&&
      <InfoWindow>
            <div className="markertooltip">
              <h4>{job.job}</h4>
              <Locationtext  location={{lat: job.lat, lng: job.lng}} />
           </div>
      </InfoWindow>
    }
      </Marker>
      </div>
    </>
  })
  return <GoogleMap
 
  defaultZoom={16} 
  defaultCenter={{lat:defaultCenter.lat, lng: defaultCenter.lng}}
  options={{
    draggable: true, // make map draggable
    zoomControlOptions: { position: 9 },
    keyboardShortcuts: false, // disable keyboard shortcuts
    scaleControl: true, // allow scale controle
    scrollwheel: true, // allow scroll wheel,

  }}
  >
    <Marker   icon={'https://i.imgur.com/b26RLaF.png'} position={{ lat: parseFloat(userslocation.lat), lng: parseFloat(userslocation.lng) }} />
    <Circle defaultCenter={{lat: parseFloat(userslocation.lat), lng:parseFloat(userslocation.lng)}} radius={radius&&radius*1000} options={{strokeColor: '#965ba6', fillColor: '#35b6fa11', fillOpacity: '1'}}/>
    <Marker onDblClick={()=>setDefaultCenter({lat: parseFloat(destination?.lat), lng: parseFloat(destination?.lng)})} position={{ lat: destination && parseFloat(destination.lat), lng: destination && parseFloat(destination.lng) }} />
    {markers}
  </GoogleMap> 
}   
export default Map