import React, { useContext } from 'react'
import { CSSTransition } from 'react-transition-group'
import { ContextApp } from '../../../ContextAPI'
import Notification from '../../Notification/Notification'

function Notificationstype (props) {
  const {special, setSpecial} = props
  const {notifibool, setNotifibool, notifi} = useContext(ContextApp)
  return <>
  <CSSTransition in={special} timeout={300} unmountOnExit classNames='notificationsettings'>
      <Notification  special={true} setState={setSpecial}/>
  </CSSTransition>

  </>
  
}
export default Notificationstype