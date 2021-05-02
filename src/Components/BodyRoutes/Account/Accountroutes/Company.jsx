import React, { useContext, useEffect, useState } from 'react'
import { ContextApp } from '../../../../ContextAPI'
import firebase from 'firebase'
import { db } from '../../../../Fire'
import Element from '../../../Themebtn/Element'
import Input from '../../../Input/Input'
import Textarea from '../../../Textarea/Textarea'
import Uploadimg from '../../../Uploadimg/Uploadimg'
import User from '../../../User/User'
import Locationinput from '../../../Locationinput/Locationinput'
import Themebtn from '../../../Themebtn/Themebtn'
import { addNotification } from './Addnotifi'
import Accountuximg from './Accountuximg'

function Company() {
  const {user} = useContext(ContextApp)
  const [companyname, setCompanyname] = useState('')
  const [companydescrip, setCompanydescrip] = useState('')
  const [logo, setLogo] = useState('')
  const [location, setLocation] = useState({
    lat: null,
    lng: null
  })
  const {notificationsystem} = useContext(ContextApp)

  function updateUserinfo(){
    db.collection('users').doc(user.uid).update({
      lng: location.lng,
      lat: location.lat,
      companyinfo: {
        logo,
        companyname: companyname,
        description: companydescrip        
      }
    }).then(()=>{
      const parameters = {
        msg: 'Profile updated!',
        icon: 'fal fa-check-circle',
        notificationsystem
      }
      addNotification(parameters)
    }).catch(()=>{
      const parameters = {
        msg: 'Something is wrong...',
        icon: 'fal fa-exclamation-circle',
        notificationsystem
      }
      addNotification(parameters)
    })
  }   
  
  useEffect(()=>{
    user && db.collection('users').doc(user.uid).onSnapshot(snap=>{
      const userdata = snap.data()
      setCompanydescrip(userdata.companyinfo.description)
      setCompanyname(userdata.companyinfo.companyname)
      setLogo(userdata.companyinfo.logo)
      setLocation({
        lat: userdata.lat,
        lng: userdata.lng
      })
    })
  },[user])

  return <>
  <div className="company accounttab">
    <div>
        <Element El='span' text='Manage and update your company info.'/>
     </div>
      <div className="companyinfo">
          <Element El='h2' text='Company Info' />
          <Input state={companyname} text={'Company Name'} setState={setCompanyname}/>
          <Textarea  state={companydescrip} setState={setCompanydescrip} text='Company Description'/>
          <Locationinput state={location} setState={setLocation}/>
          <div className="flexed">
          <Input state={logo} setState={setLogo} text='Company Logo' />
          <Uploadimg state={logo} setState={setLogo}/>
          </div>
          <div className="btnscontainer">
            <Themebtn text='Update Info' icon='fal fa-save' clickEvent={()=>updateUserinfo()}/>
          </div>
      </div>
  </div>
  <Accountuximg img='https://i.imgur.com/bjkITkd.png' left/>
  </>
}
export default Company