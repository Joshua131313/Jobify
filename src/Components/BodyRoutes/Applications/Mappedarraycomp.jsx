import React, { useContext } from 'react'
import { ContextApp } from '../../../ContextAPI'
import Jobcard from '../../Job/Jobcard'
import Mappedarray from '../Dashboard/Mappedarray'
import Notificationcard from '../Notifications/Notificationcard/Notificationcard'

function Mappedarraycomp(props) {
  const {array, jobcard, alljobs} = props
  const {notificationsystem} = useContext(ContextApp)
  return  <Mappedarray array={array}>
  {({type})=>(
  jobcard?
  <Jobcard job={type} notificationsystem={notificationsystem} apply type='website'/>
  :
  <Notificationcard notification={type} alljobs={alljobs}/>
  )}
</Mappedarray>

}
export default Mappedarraycomp