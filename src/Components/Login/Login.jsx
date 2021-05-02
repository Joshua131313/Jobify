import React, {useState, useEffect, useContext} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect, useHistory } from "react-router-dom" 
import {db} from '../../Fire'
import firebase from 'firebase'
import './Login.css'
import Themebtn from '../Themebtn/Themebtn'
import Input from '../Input/Input'
import Logo from '../Logo/Logo'
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Select from '../Select/Select'
import Icon from '../Icon/Icon'
import Locationinput from '../Locationinput/Locationinput'
import { options, salaries } from '../Options'


function Login(props){
  const {
    adress, setAdress, 
    category, setCategory,
    loginwithFacebook,loginwithGoogle,
    setlName,lname,
    name, setName, 
    email, setEmail, 
    password, setPassword, 
    handleLogin, handleSignup,
    hasAccount, setHasAccount, 
    emailError, passwordError, 
    cord, setCord, 
    salary, setSalary } = props

  let [resetEmail, setResetEmail]=useState('')
  const [forgotPassword, setForgotPassword] = useState(false)
  const [passwordbool, setPasswordbool] = useState(true)

 
  function sendEmail(){
    if(email!==''){
     firebase.auth().sendPasswordResetEmail(email).then(()=>{
        window.alert('email has been sent')
     })
     .catch(err=>{
        let errorcode = err.code
        let errormsg = err.message
        window.alert(errormsg)
     })
    }else {
      window.alert('Please input an email')
    }
}

const history = useHistory()

  return (
    <>
    
 
  <div className="login-container">
     <Link to='/website' className='loginicon'>
     <Icon icon={'fad fa-long-arrow-alt-left '} />
     </Link>

      <div className='login flex'>
    <div className='centered'>
    <div className="title">
      <Logo notext={true}/>
    <h1 className='flexrow' style={{alignItems: 'center'}}>
      {forgotPassword?'Forgot Password':hasAccount?'Log In':'Register'}</h1>
    </div>
      <div className="inputscontainer">
     { 
       forgotPassword?
     <>
     <Input setState={setResetEmail} text='Email' value={resetEmail}/>
     <Themebtn classNames='prevBtn emailBtn' icon='fad fa-envelope-open' text='Send Email' clickEvent={sendEmail}/>
     <Themebtn classNames='prevBtn' icon='fad fa-long-arrow-alt-left' text='Go back' clickEvent={()=>setForgotPassword(false)}/>
     </>:
       <form onSubmit={(e)=>e.preventDefault()}>
          {!hasAccount&&
          <>
          <label>
          <Input text="Name" state={name} setState={setName}/>
         </label>
             </>
        }   

          <label>
            <Input text={'Email'} state={email} setState={setEmail}/>
            <p className='errormsgLogin'>{emailError}</p>
          </label>
          <label className='passwordinputlabel'>
            <Input icon={passwordbool?'fal fa-eye':'fal fa-eye-slash'} setIconstate={setPasswordbool} password={passwordbool} text={'Password'} state={password} setState={setPassword}/>
            <p className='errormsgLogin'>{passwordError}</p>
          </label>
          {hasAccount?
          <div className='btnContainer'>
           <Themebtn extraStyle={{marginTop: '10px', width: '100%'}} text='Log In' clickEvent={handleLogin}/>
         <div className='flex loginoptions' >
         <p exact to='/forgotpassword' style={{cursor: 'pointer'}} className='forgotPasswordButton' onClick={()=>setForgotPassword(true)}>Forgot your password?</p>
          <small>Don't have an account?<span onClick={()=>setHasAccount(!hasAccount)} style={{cursor: 'pointer'}}> Register</span></small>
         </div>
            
          </div>:
          <>
           <Select
            category={category}
            setCategory={setCategory}
            options={options}
            text='Categories:'
            />
            <Select
            category={salary}
            setCategory={setSalary}
            options={salaries}
            text={'Salaries:'}
            />
            <Locationinput state={cord} setState={setCord} setState3={setAdress}
            />
            <div className='btnContainer'>
              <Themebtn extraStyle={{marginTop: '10px', width: '100%'}} text='Register' clickEvent={handleSignup}/>
              <div className='flexrow loginoptions'>
              <small>Already have an account?<span onClick={()=>setHasAccount(!hasAccount)} style={{cursor:'pointer'}}> Sign in</span></small>
              </div>
              
          </div>
          </>
      }

          
        </form> 
      }
        
      </div>
      </div>
     </div>
  <div className='loginBanner flex'>
    <div className="img-authbtns">
          <div className="infoimg">
          <div>
      <h2>Welcome to Jobify</h2>
      <span>Easily find or create job listings.</span>
      </div>
    <div className='flex abs loginbtns'>
      <Themebtn  classNames='login-btn gog-btn br sa' icon='fab fa-google' text='Login with Google' clickEvent={loginwithGoogle}/>
      <Themebtn extraStyle={{marginTop: '10px'}} classNames='login-btn fb-btn br sa' icon='fab fa-facebook' text='Login with Facebook' clickEvent={loginwithFacebook}/>
     </div>
          </div>
     <img  src="https://i.imgur.com/YXlx7Tw.jpg" alt=""/>
    </div>
  </div>
</div>


     </>
  )
}
export default Login
