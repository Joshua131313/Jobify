import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../../../Fire'
import Input from '../../../Input/Input'
import Element from '../../../Themebtn/Element'
import User from '../../../User/User'
import firebase from 'firebase'
import { ContextApp } from '../../../../ContextAPI'
import Textarea from '../../../Textarea/Textarea'
import Locationinput from '../../../Locationinput/Locationinput'
import Uploadimg from '../../../Uploadimg/Uploadimg'
import Select from '../../../Select/Select'
import Themebtn from '../../../Themebtn/Themebtn'
import { addNotification } from './Addnotifi'
import { options, salaries } from '../../../Options'
import Uploadcv from './Uploadcv'

function Accounttab() {
  const {user, setNotifi, setNotifibool, notificationsystem} = useContext(ContextApp)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [phone, setPhone] = useState('')
  const [cover, setCover] = useState('')
  const [cv, setCv] = useState('')
  const [interested, setInterested] = useState([])
  const [location, setLocation] = useState({
    lat: null,
    lng: null
  }) 
  const [profession, setProfession] = useState('')
  const [salary, setSalary] = useState([])
  const [passwordvisible, setPasswordvisible] = useState(false)
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const withEmailandPassword = firebase.auth().currentUser.providerData[0].providerId === 'password'
  var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
  const [currentPassword, setCurrentPassword] = useState('')
  const [currentvisible, setCurrentvisible] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [unchangeduseremail, setUnchangeduseremail] = useState('')
  const check = 'fal fa-check-circle'
  const exclamation = 'fal fa-exclamation-circle'

 
  function reAuthenticate(currentPassword) {
    const usercred = firebase.auth().currentUser
    const credential = firebase.auth.EmailAuthProvider.credential(
      usercred.email,
      currentPassword
    )
    firebase.auth().currentUser.reauthenticateWithCredential(credential).then(()=>{
      setDisabled(false)
      setTimeout(()=>{
        setDisabled(true)
      },60000)
      const parameters = {
        msg: 'You can now change your password!',
        icon: check,
        notificationsystem
      } 
      addNotification(parameters)
    }).catch(()=>{
      setDisabled(true)
      const parameters = {
        msg: 'Incorrect password!',
        icon: exclamation,
        notificationsystem
      }
      addNotification(parameters)
    })
  }
  function updateUserinfo(){
    firebase.auth().currentUser.updateEmail(email)
    db.collection('users').doc(user.uid).update({
      userinfo: {
        age,
        cover,
        email,
        name: username,
        phone,
        uid: user.uid
      },
      lng: location.lng,
      lat: location.lat,
      interested,
      salary,
      cv,
      profession
    }).then(()=>{
      const parameters = {
        msg: 'Profile updated!',
        icon: check,
        notificationsystem
      }
      addNotification(parameters)
    }).catch(()=>{
      const parameters = {
        msg: 'Something is wrong...',
        icon: exclamation,
        notificationsystem
      }
      addNotification(parameters)
    })
  }   
  function changePassword(){
    if(mediumRegex.test(password)){
      firebase.auth().currentUser.updatePassword(password)
      const parameters = {
        msg: 'Password successfully changed!',
        icon: check,
        notificationsystem
      }
      addNotification(parameters)

    }else {
      const parameters = {
        msg: 'Password is too weak!',
        icon: exclamation,
        notificationsystem
      }
      addNotification(parameters)
    }
  }
  
  function sendEmail(){
     firebase.auth().sendPasswordResetEmail(unchangeduseremail).then(()=>{
      const parameter1 = {
        msg: 'Email successfully sent!',
        icon: check,
        notificationsystem
      }
      const parameter2 = {
        msg: 'You may want to check your junk inbox',
        icon: exclamation,
        notificationsystem
      }
       addNotification(parameter1)
       addNotification(parameter2, 14 ,'tr' )
     })
  }

  useEffect(()=>{
   user && db.collection('users').doc(user.uid).onSnapshot(snap=>{
      const userdata = snap.data()
      setUsername(userdata.userinfo.name)
      setCover(userdata.userinfo.cover)
      setEmail(userdata.userinfo.email)
      setUnchangeduseremail(userdata.userinfo.email)
      setPhone(userdata.userinfo.phone)
      setAge(userdata.userinfo.age)
      setLocation({
        lat: userdata.lat,
        lng: userdata.lng
      })
      setCv(userdata.cv)
      setInterested(userdata.interested)
      setSalary(userdata.salary)
      setProfession(userdata.profession)
    })

    
  },[user])

  return <div className="accounttab">
   <div>
   <Element El='span' text='Manage and update your account details.'/>
   </div>
    <div className="accountuser">
     <div className="userdetails">
        <Element El='h2' text='User Details'/>
        <Input state={username} text='Name' setState={setUsername}/>
        <Input state={phone} number text='Phone Number' setState={setPhone}/>
        <Input state={profession} text='Profession' setState={setProfession} />
        <Select options={options} text='Categories:' state={visible} setState={setVisible} category={interested} setCategory={setInterested}/>
        <Select options={salaries} text='Salaries:' state={visible} setState={setVisible} category={salary} setCategory={setSalary}/>
        <Locationinput state={location} setState={setLocation}/>
        <div className="flexed">
         <Input state={cv} text='CV' setState={setCv}/>
         <Uploadcv cv={true} state={cv} setState={setCv} />
        </div>
        <div className="flexed">
         <Input state={cover} text='Profile Image' setState={setCover}/>
         <Uploadimg state={cover} setState={setCover} />
        </div>
        {
        withEmailandPassword && 
        <> 
        <Input state={email}  text='Email' setState={setEmail}/>
        <Element El='h2' text='Reset Password'/>
        <Input state={currentPassword} title={'Verify'} disabled={!withEmailandPassword} icon={'fal fa-shield-check'} iconFunction={reAuthenticate} setState={setCurrentPassword} setDisabled={setDisabled} password={!currentvisible} text='Verify Password'/>
        <div onClick={()=>{disabled&&addNotification({msg:'You must verify your password first!', icon: exclamation, notificationsystem})}}>
        <Input state={password}  disabled={(disabled)} icon={!passwordvisible?'fal fa-eye':'fal fa-eye-slash'} setIconstate={setPasswordvisible} setState={setPassword}  password={!passwordvisible} text='Change Password'/>
        </div>
        <div className="resetpassword">
          <Element El='span' text='Reset password by email: '/>
          <Themebtn text='Send' icon='fal fa-envelope' clickEvent={()=>sendEmail()}/>
        </div>  
        </>
       }
  
       <div className="btnscontainer">
       <Themebtn text='Update Profile' icon='fal fa-save' clickEvent={()=>updateUserinfo()}/>
      {
      withEmailandPassword&& 
      <Themebtn text='Change Password' disabled={disabled} icon='fal fa-key' 
       clickEvent={()=>
        
       addNotification(
        {
           msg: 'You will be logged out, do you want to proceed?',
           icon: 'fal fa-question-circle',
           button: <Themebtn text='Confirm' clickEvent={()=>changePassword()}/>,
           notificationsystem
        },
        20,
        'tl'
        )
      }
       />
      }
       </div>
                    
      </div>

    </div>
  </div>
}
export default Accounttab