import React, { useContext, useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import Notificationstype from './Notificationstype/Notificationstype'
import './Body.css'
import { Link, Redirect, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'
import Bodyroutes from '../BodyRoutes/Bodyroutes'
import Motiondiv from '../Motiondiv/Motiondiv'
import Notification from '../Notification/Notification'
import { ContextApp } from '../../ContextAPI'
import { db } from '../../Fire'
function Body(props) {
  const {notifibool, setNotifibool, user} = useContext(ContextApp)
  const {handleLogout, specialnoti,setSpecialnoti} = props
  const [hide, setHide] = useState(false)
  const [hidesidebar, setHidesidebar] = useState(false)
  const [accountpage, setAccountpage] = useState(false)
  const location = useLocation()
 
  useEffect(()=>{
    if(location.pathname.includes('/dashboard/job/')) {
      setHidesidebar(true)
    }
    else {
      setHidesidebar(false)
    }
    if(location.pathname.includes('/dashboard/account')){
      setAccountpage(true)
    }else {
      setAccountpage(false)
    }
   user && db.collection('users').doc(user.uid).onSnapshot(snap=>{
     const userdata = snap.data()
     document.documentElement.style.setProperty(
      '--theme-color', userdata.customization.themecolor
    )  
    document.documentElement.style.setProperty(
      '--theme-second', userdata.customization.themesecond
    )
   })
  }, [location])

  return <Motiondiv html={
  <div className={hidesidebar?'body hidesidebar':hide?"body bodyhide":accountpage?'body routesnopadding':'body'}>
      <Notificationstype special={specialnoti} setSpecial={setSpecialnoti}/>
     {!hidesidebar&&<Sidebar hide={hide} setHide={setHide}/>}
      <Bodyroutes />
 </div>
 } 
 />
}
export default Body