import React, { useContext, useState } from 'react'
import { HashLink as Link} from 'react-router-hash-link'
import { useLocation } from 'react-router-dom'
import Defaultmsg from '../Defaultmsg/Defaultmsg'
import { getDistanceFromLatLonInKm } from './Search/Map/Latlongkm'
import { ContextApp } from '../../ContextAPI'
import { addNotification } from '../BodyRoutes/Account/Accountroutes/Addnotifi'
function Websitemappedarray(props) {
  const {user} = useContext(ContextApp)
  const {array, pattern, category, keyword, radius, userslocation, reverse, webnotifications, filterby} = props
  const location = useLocation()
  const lnk =location.pathname.slice(1, location.pathname.length)
  const [sentwarning, setSentwarning] = useState(false)
  const options = ['job', 'wage', 'descrip']
  function manageNotification() {
     if(!sentwarning) {
      addNotification({
        notificationsystem: webnotifications,
        msg: 'No Jobs Found!',
        icon: 'fal fa-exclamation-circle'
       })
       setSentwarning(true)
     }
  } 

  const filteredarray = array
  ?.filter(type => (
  (keyword ==='' && category?.length === 0)
  ||
   (
    category?.length===0 
    &&
    (
     options.some(el=>pattern.test(type[el]))
    )
    )
  ||
  (
   category?.some(el=> type[filterby]?.some(x=>x===el))&&
  ((
    options.some(el=>pattern.test(type[el]))
  ))
  )
  
 )).filter(x=> getDistanceFromLatLonInKm(x.lat, x.lng, userslocation.lat, userslocation.lng)<=(isNaN(radius)?0:radius))
 .map(type => props.children({
  type: type
 }))
 const arrayrow = filteredarray?.length? (reverse?filteredarray.reverse():filteredarray): manageNotification()
  return <>{arrayrow}</>
} 
export default Websitemappedarray