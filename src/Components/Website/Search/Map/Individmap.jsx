import React from 'react'
import {withScriptjs, withGoogleMap} from 'react-google-maps'
import Loaderel from '../../../Loader/Loader'
import Map from './Map'

function Individmap(props) {
  const WrappedMap = withScriptjs(withGoogleMap(Map))
  const {jobs, destination, defaultCenter, setDefaultCenter, userslocation, radius} = props
  return     <WrappedMap 
        jobs={jobs}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDeJsqluHj5tCW2elz33V4Ov--sba8qqdA`}
        loadingElement={<div style={{height:'100%', display: 'flex', alignItems: 'center',justifyContent: 'center', backgroundCOlor: '#fff'}}><Loaderel type='Grid'/></div>}
        containerElement={<div  className='mapcont'></div>}
        mapElement={<div style={{height:'100%'}}></div>}
        defaultCenter={defaultCenter}
        setDefaultCenter={setDefaultCenter}
        userslocation={userslocation}
        radius={radius}
        destination={destination}
        /> 
}
export default Individmap