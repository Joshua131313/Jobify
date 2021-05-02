import React, { useState } from 'react'
import { db } from '../../Fire'
import Locationinput from '../Locationinput/Locationinput'
import Select from '../Select/Select'
import Element from '../Themebtn/Element'
import Themebtn from '../Themebtn/Themebtn'
import './Notification.css'
import firebase from 'firebase'
import Icon from '../Icon/Icon'
import { CSSTransition } from 'react-transition-group'
import { options, salaries } from '../Options'
function Notification(props) { 
  const user = firebase.auth().currentUser
  const {special, setState, state, value} = props
  const [shown, setShown] = useState(false)
  const [shown2, setShown2] = useState(false)
  const [category, setCategory] = useState([])
  const [salary, setSalary] = useState([])
  const [cord, setCord] = useState({
    lat: null,
    lng: null
  })
  const [adress, setAdress] = useState({
    name: '',
    postalcode: ''
  })
  const [angryBtn, setAngryBtn] = useState(false)
  function updateProfile(){
    if(!adress.name || !adress.postalcode || !cord.lat || !category){
      setAngryBtn(true)
      setTimeout(()=>{
        setAngryBtn(false)
      }, 3500)
    }else {
      db.collection('users').doc(user.uid).update({
        interested: category,
        lat: cord.lat,
        lng: cord.lng,
        postalcode: adress.postalcode,
        adress: adress.name,
        salary
      })
      setState(false)
    }
  }

  return<> 
    {special?
   <>
    <div className="notificationsettings">
    <Icon icon='fal fa-times' setState={setState} state={false}/>
    <Element El='h2' text='Update your Profile' />
    <Select text='Categories:' options={options} category={category} setCategory={setCategory} state={shown} setState={setShown}/>
    <Select text='Salaries:' options={salaries} category={salary} setCategory={setSalary} state={shown2} setState={setShown2}/>
    <Locationinput state={cord} setState={setCord} setState3={setAdress}/>
    <Themebtn warning={angryBtn} text='Update' icon='fal fa-stars' clickEvent={updateProfile}/>
    </div>
  </>
 :
 ''}
  </>
  

}
export default Notification