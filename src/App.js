import { useCallback, useContext, useEffect, useState } from "react";
import { BrowserRouter as Router,useLocation,Switch,Route,Link,NavLink, Redirect, useHistory } from "react-router-dom" 

import firebase from 'firebase'
import {db, Fire} from './Fire'
import "./styles.css";
import Body from './Components/Body/Body'
import Login from './Components/Login/Login'
import ContextAppProvider from "./ContextAPI";
import Navbar from "./Components/Website/Navbar/Navbar";
import Website from "./Components/Website/Website";
import { AnimatePresence } from 'framer-motion'

export default function App() {
  const [user, setUser]=useState('')
  const [name, setName]=useState('')
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const [emailError, setEmailError]=useState('')
  const [passwordError, setPasswordError]=useState('')
  const [hasAccount, setHasAccount]=useState(false)
  const [lname, setlName]=useState('')
  const [userinfo, setUserinfo]=useState([])
  const [users, setUsers]=useState([])
  const [cover, setCover]=useState('https://www.gettyimages.ca/gi-resources/images/500px/983794168.jpg')
  const [forgotpassword, setForgotpassword]=useState(false)
  const [msgids, setMsgIds] = useState([''])
  const [loading, setLoading]=useState(false)
  const [category, setCategory] = useState([])
  const [salary, setSalary] = useState([])
  const [cord, setCord] = useState({
    lat: null,
    lng: null,
  })
  const [adress, setAdress] = useState({
    name: '',
    postalcode: ''
  })
  const [companyname, setCompanyname] = useState('Your Company Name')
  const [descrip, setDescrip] = useState('About Your Company')
  const [logo, setLogo] = useState('https://i.imgur.com/PolYt1e.png')
  const [specialnoti, setSpecialnoti] = useState(false)
  const [banner, setBanner] = useState('https://i.imgur.com/YKM0cyU.png')

  const clearInputs = () => {
    setEmail('')
    setPassword('')
  }
  const clearErrors = () => {
    setEmailError('')
    setPasswordError('')
  }
  const handleLogin = () => {
   
    clearErrors()
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(()=>{setLoading(true)})
    .catch(err => {
      switch(err.code) {
        case "auth/invalid-email":
          setEmailError(err.message)
          break
        case "auth/user/disabled":
        case "auth/user-not-found":
          setEmailError('Email does not exist')
        break
        case "auth/wrong-password":
          setPasswordError('Incorrect Password')
        break
        default:
      }  
    })

  } 
  const handleSignup = () => {
    clearErrors()
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(err => {
        
        switch(err.code) {
        case "auth/email-already-in-use":
          setEmailError(err.message)
          break
        case "auth/invalid-email":
          setEmailError(err.message)
        break
        case "auth/weak-password":
          setPasswordError(err.message)
        break
        default: 
        setEmailError('Invalid')
      }
      setTimeout(()=>{
        setEmailError('')
        setPasswordError('')
      },3000)
    })
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
          user.updateProfile({
            displayName: name
          }) 
          db.collection('users').doc(user.uid).set({
            created: new Date(), 
            uid: user.uid,
            userinfo: {
              name:name,
              cover: cover,
              age: '', 
              phone: '', 
              email: email,
              uid: user.uid,
            },
            lng: cord.lng,
            lat: cord.lat,
            postalcode: adress.postalcode,
            adress: adress.name,
            customization: {
              themecolor: '#399ff3',
              darkmode: false,
              gridview: false,
              hidenav:false,
              secondthem: '#728eec'
            },
            companyinfo : {
              logo,
              companyname,
              description: descrip
            },
            interviews: [],
            salary: salary,
            interested: category,
            appliedto: [],
            cv:'',
            activity: {
              percent: 0,
              lastdate: new Date(),
              lastupdated: new Date()
            },
            applications: {
              applicants: [],
              lastdate: new Date(),
              lastupdated: new Date()
            },
            views: {
              viewdates: [],
              lastdate:  new Date(),
              lastupdated: new Date()
            },
            candidates: [],
            hiredusers: [],
            lastrecruit: null,
            profession: '',
            ratings: []

        })
          db.collection('createdjobs').doc(user.uid).set({
            views: []
          })
          db.collection('notifications').doc(user.uid).set({
            notifications: []
          })
          db.collection('allusers').doc('allusers').update({
            users: firebase.firestore.FieldValue.arrayUnion(user.uid)
          })

      }//if (user)
      else {
        setUser('')
      } 
    }) 
  }
  const handleLogout = () => {
    if(user) {
      db.collection('users').doc(user.uid).update({online: false})
    }
    window.location.reload()
    firebase.auth().signOut()
  }


  const authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        clearInputs()
        setUser(user)
      }
      else {
          setUser('')
      }  
    })
  } 
  
  function loginwithGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');

    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      if(result.additionalUserInfo.isNewUser){
            /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
  
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      db.collection('users').doc(user.uid).set({
        created: new Date(), 
        uid: user.uid,
        userinfo: {
          name: user.displayName,
          cover: user.photoURL,
          age: '', 
          phone: user.phoneNumber, 
          email: user.email,
          uid: user.uid,
        },
        lng: cord.lng,
        lat: cord.lat,
        postalcode: adress.postalcode,
        adress: adress.name,
        customization: {
          themecolor: '#399ff3',
          darkmode: false,
          gridview: false,
          hidenav:false,
          themesecond: '#728eec'
        },
        companyinfo : {
          logo,
          companyname,
          description: descrip
        },
        interested: category,
        salary: salary,
        appliedto: [],
        interviews: [],
        cv: '',
        activity: {
          percent: 0,
          lastdate: new Date(),
          lastupdated: new Date()
        },
        applications: {
          applicants: [],
          lastdate: new Date(),
          lastupdated: new Date()
        },
        views: {
          viewdates: [],
          lastdate:  new Date(),
          lastupdated: new Date()
        },
        candidates: [],
        hiredusers: [],
        lastrecruit: null,
        profession: '',
        ratings: []

    })
      db.collection('createdjobs').doc(user.uid).set({
        views: []
      })
      db.collection('notifications').doc(user.uid).set({
        notifications: []
      })
      db.collection('allusers').doc('allusers').update({
        users: firebase.firestore.FieldValue.arrayUnion(user.uid)
      })
      .then(()=>{
        setSpecialnoti(true)
      })
      }

    })

    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      setEmailError(error.message)
      setTimeout(()=>{
        setEmailError('')
      },3000)
    });
  }
  function loginwithFacebook(){
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope("email");

    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      if(result.additionalUserInfo.isNewUser){
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
  
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var usergoogle = result.user;
        // ...
        db.collection('users').doc(usergoogle.uid).set({
          created: new Date(), 
          uid: usergoogle.uid,
          userinfo: {
            name: usergoogle.displayName,
            cover: usergoogle.photoURL,
            age: '', 
            phone: usergoogle.phoneNumber, 
            email: usergoogle.email,
            uid: usergoogle.uid,
          },
          companyinfo : {
            logo,
            companyname,
            description: descrip
          },
          lng: cord.lng,
          lat: cord.lat,
          postalcode: adress.postalcode,
          adress: adress.name,
          customization: {
            themecolor: '#399ff3',           
            darkmode: false,
            gridview: false,
            hidenav:false,
            themesecond: '#728eec'
          },
          interested: category,
          salary: salary,
          appliedto: [],
          interviews: [],
          cv: '',
          activity: {
            percent: 0,
            lastdate: new Date(),
            lastupdated: new Date()
          },
          applications: {
            applicants: [],
            lastdate: new Date(),
            lastupdated: new Date()
          },
          views: {
            viewdates: [],
            lastdate:  new Date(),
            lastupdated: new Date()
          },
          candidates: [],
          hiredusers: [],
          lastrecruit: null,
          profession: '',
          ratings: []
      })
        db.collection('createdjobs').doc(user.uid).set({
          views: []
        })
        db.collection('notifications').doc(user.uid).set({
          notifications: []
        })
        db.collection('allusers').doc('allusers').update({
          users: firebase.firestore.FieldValue.arrayUnion(user.uid)
        })
        .then(()=>{
          setSpecialnoti(true)
        })
    }
    })

    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
  
      // ...
      setEmailError(email)
      setTimeout(()=>{
        setEmailError('')
      },3000)
    });
  
  }

  useEffect(() => { 
    authListener()
  },[])   


  return (

    <Router>
      {user?<Redirect to='/dashboard'/>:<Redirect to='/website'/>}
      <AnimatePresence>
      <ContextAppProvider> 
         <Switch >
       
        {
        user&& 
         <Route path='/dashboard'>
        
            <>
            <div className='app dashboard'>
            
              <Body 
                handleLogout={handleLogout} 
                setLoading={setLoading} 
                loading={loading}
                specialnoti={specialnoti}
                setSpecialnoti={setSpecialnoti}
                />
            </div>
            </>
          
         </Route>
         }
            <div className={"app website"}>
            <Route  path='/website'>
              <Navbar setBanner={setBanner} handleLogout={handleLogout} />
              <Website setBanner={setBanner} banner={banner}/>
            </Route>
            <Route  path='/login'>
            <Login 
              loginwithFacebook={loginwithFacebook}
              loginwithGoogle={loginwithGoogle} 
              loading={loading} 
              name={name} 
              setName={setName} 
              lname={lname} 
              setlName={setlName}
              email={email} 
              setEmail={setEmail} 
              password= {password} 
              setPassword={setPassword} 
              handleLogin={handleLogin} 
              handleSignup={handleSignup} 
              hasAccount={hasAccount} 
              setHasAccount={setHasAccount} 
              emailError={emailError} 
              category={category}
              salary={salary}
              setSalary={setSalary}
              setCategory={setCategory}
              passwordError={passwordError}
              cord={cord}
              setCord={setCord}
              adress={adress}
              setAdress={setAdress}
              />
            </Route>
            </div>
       </Switch> 
       </ContextAppProvider>  
      
      </AnimatePresence>
    </Router>
  );
}
