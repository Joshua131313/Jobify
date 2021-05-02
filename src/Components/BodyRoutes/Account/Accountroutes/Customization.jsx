import React, { useContext, useEffect, useState } from 'react'
import Color from '../../../Input/Color'
import Element from '../../../Themebtn/Element'
import firebase from 'firebase'
import { ContextApp } from '../../../../ContextAPI'
import { db } from '../../../../Fire'
import Themebtn from '../../../Themebtn/Themebtn'
import { addNotification } from './Addnotifi'
import Accountuximg from './Accountuximg'
function Customizaton() {
  const {user, hidenav, gridview, darkmode, notificationsystem} = useContext(ContextApp)
  const [themecolor, setThemecolor] = useState('')
  const [themesecond, setThemesecond] = useState('')
  
  function updateUserinfo(){
    db.collection('users').doc(user.uid).update({
      customization: {
        themecolor,
        themesecond,
        darkmode,
        gridview,
        hidenav
      }
    }).then(()=>{
      const properties = {
        msg: 'Profile successfully updated!',
        icon: 'fal fa-palette',
        notificationsystem
      }
      addNotification(properties)
    })
  }

  useEffect(()=>{
    db.collection('users').doc(user.uid).onSnapshot(snap=>{
      const userdata = snap.data()
      setThemecolor(userdata.customization.themecolor)
      setThemesecond(userdata.customization.themesecond)
    })
  },[user])

  return <> <div className="customization accounttab">
    <div>
      <Element El='span' text='Customize your experience on Jobify!'/>
    </div>
    <div className="customizeinputs">
      <Element El='h2' text='Customize App Colors'/>
      <Color text='Primary Theme Color' state={themecolor} setState={setThemecolor}/>
      <Color text='Secondary Theme Color' state={themesecond} setState={setThemesecond}/>
      <Themebtn text='Change Colors' icon='fal fa-palette' clickEvent={()=>updateUserinfo()}/>
    </div>
    
  </div>
  <Accountuximg img='https://i.imgur.com/5uCESdv.png' />

  </>
}
export default Customizaton