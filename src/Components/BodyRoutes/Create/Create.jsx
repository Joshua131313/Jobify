import React, { useContext, useEffect, useState } from 'react'
import { ContextApp } from '../../../ContextAPI'
import Input from '../../Input/Input'
import Locationinput from '../../Locationinput/Locationinput'
import Element from '../../Themebtn/Element'
import './Create.css'
import Textarea from '../../Textarea/Textarea'
import { Link, NavLink, Route } from 'react-router-dom'
import Themebtn from '../../Themebtn/Themebtn'
import Map from '../../Website/Search/Map/Map'
import Wrappedmap from '../../Website/Search/Map/Wrappedmap'
import Individmap from '../../Website/Search/Map/Individmap'
import Uploadimg from '../../Uploadimg/Uploadimg'
import Overviewinfo from './Overviewinfo'
import { db } from '../../../Fire'
import firebase from 'firebase'
import {addNotification} from '../Account/Accountroutes/Addnotifi'
import Select from '../../Select/Select'
import { options, salaries } from '../../Options'

function Create(props) {
  const {user, setNotifi, companyinfo, activity, notificationsystem} = useContext(ContextApp)
  const [clicked, setClicked] = useState(false)
  const [usecompanylogo, setUsecompanylogo] = useState(false)
  const [companylocation, setCompanylocation] = useState({
    lat: null,
    lng: null
  })
  const [customlocation, setCustomlocation] = useState({
    lat: null,
    lng: null,
  })
  const [job, setJob] = useState('')
  const [descrip, setDescrip] = useState('')
  const [wage, setWage] = useState(null)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [cover, setCover] = useState('')
  const [logo, setLogo] = useState('')
  const [category, setCategory] = useState([])
  const [salary, setSalary] = useState([])
  const currentdate = new Date()
  const differenceintime = currentdate.getTime() - activity.lastdate.toDate().getTime()
  const differenceindays = differenceintime/(1000 * 3600 * 24) 
  const [viewedalert, setViewedalert] = useState(false)

  function createJob() {
    if(job||descrip||wage||email||cover||category) {
      const jobinfo = {
        job,
        descrip,
        wage,
        email,
        phone,
        cover,
        logo,
        viewed: {
            lastupdated: new Date(),
            lastdate: null,
            viewdates: [],
            viewedby: []
          },
        lng: !clicked?customlocation.lng:companylocation.lng,
        lat: !clicked?customlocation.lat:companylocation.lat,
        usecompanylogo,
        usecompanylocation: clicked, 
        creatorid: user.uid,
        jobid: db.collection('createdjobs').doc().id,
        created: new Date(),
        company: companyinfo.companyname,
        savedby: [],
        applicants: {
            lastupdated: new Date(),
            lastdate: null,
            viewdates: [],
            viewedby: [],
            accepted: [],
            rejected: [],
            interviewdates: [],
            hiredusers: [],
            hireddates: []
          },
        category,
        salary
      }

      db.collection('alljobs').doc('alljobs').update({
        jobs: firebase.firestore.FieldValue.arrayUnion(jobinfo)
      }).then(()=>{
        const parameters = {
          msg: 'Job successfully posted!',
          icon: 'fal fa-check-circle',
          notificationsystem
        }
        addNotification(parameters)
      },[])
      db.collection('users').doc(user.uid).update({
        activity: {
          lastupdated: new Date(),
          lastdate: new Date(),
          percent:  differenceindays>7?activity.percent+20:(differenceindays<1&&activity.percent>80)?activity.percent+1:activity.percent+5
        }
      })
      setJob('')
      setDescrip('')
      setWage('')
      setEmail('')
      setPhone('')
      setCover('')
      setLogo('')
      setCategory([])
      setSalary([])
    }
  }
  
  const tabs = [
    {
      link: 'jobinfo',
      text: 'Job Info',
      html: <> <Input text='Job' state={job} setState={setJob}/>
      <div onClick={()=>{!viewedalert&&addNotification(
        {
          msg: `Note, use dashes (-) to start a new line!`,
          icon: 'fal fa-exclamation-circle',
          notificationsystem
        },
        Infinity,
        'tr'
      );
      setViewedalert(true)
      }}>
      <Textarea text='Job Description' state={descrip} setState={setDescrip}/>
      </div>
      <Input text='Wage (per hour)' state={wage} setState={setWage} number={true}/> 
      <Select options={salaries} text='Salary Range:' category={salary} setCategory={setSalary} />
      <Select options={options} text='Categories:' category={category} setCategory={setCategory} />
      <Input text='Email' state={email} setState={setEmail}/>
      <Input text='Phone Number' state={phone} setState={setPhone}/></>,
      title: <Element El='h2' text='Job Info'/>
      
    },
    {
      link: 'location',
      text: 'Job Location',
      html: <>
      <Locationinput setState={setCustomlocation} state={customlocation} disabled={clicked}/> 
      <Themebtn text={!clicked?'Use Company Adress':"Don't Use Company Adress"} clickEvent={()=>setClicked(!clicked)}/>
     <div className="jobmap">
         <Element El='h3' text='View Map'/>
         <Individmap userslocation={clicked?companylocation:customlocation} defaultCenter={clicked?companylocation:customlocation}/>
     </div>
      </>,
      title: <Element El='h2' text='Location'/>


    },
    {
      link: 'customize',
      text:'Customize',
      html: 
      <div className="coverimgs">
        <div>
        <Element El='h3' text='Cover Image'/>
        <Input text='Cover Image' state={cover}  setState={setCover}/>
        <Uploadimg   state={cover} setState={setCover}/>
      </div>
      <div>
        <Element El='h3' text='Logo'/>
        <Input text='Logo' disabled={usecompanylogo} state={logo} setState={setLogo}/>
        <Uploadimg disabled={usecompanylogo} state={logo} setState={setLogo}/>
        <Themebtn text={!usecompanylogo?'Use Company Logo':"Don't Use Company Logo"} clickEvent={()=>setUsecompanylogo(!usecompanylogo)}/>
      </div>
      </div>
      ,
      title: <Element El='h2' text='Logo and Cover Image'/>

    },
    {
      text: 'Finalize',
      link: 'finalize',
      html: <>
       <div className="finalize" id='imp'>
        <Element El='h2' text='Overview'/>
        <div className="infojob">
          <Overviewinfo text='Job' state={job} setState={setJob}/>
          <Overviewinfo text='Job Description' state={descrip} setState={setDescrip}/>
          <Overviewinfo text='Wage' number={true} state={wage} setState={setWage}/>
          <Overviewinfo text='Email' state={email} setState={setEmail}/>
          <Overviewinfo text='Phone' state={phone} setState={setPhone}/>
          <Overviewinfo text='Job Cover' state={cover} setState={setCover}/>
          <Overviewinfo text='Logo' state={logo} setState={setLogo}/>
          <div className='btnd'>
         <Link to={(job===''||descrip===''||wage===''||email===''||cover==='')?'/dashboard/create/finalize':'/dashboard/jobs'}> 
         <Themebtn text='Post' icon='fal fa-plus-circle' clickEvent={()=>createJob()} disabled={job===''||descrip===''||wage===''||email===''||cover===''||category===''}/>
         </Link>
          </div>
        </div>
       </div>
      </>,
      title: <Element El='h2' text='Finalize'/>
    }
  ]

  const tabsrow = tabs?.map(tab=>{
    return <NavLink to={`/dashboard/create/${tab.link}`} activeClassName='activetab'>
      {tab.text}
    </NavLink>
  })
  const tabsroute = tabs?.map(tab=>{
    return <Route path={`/dashboard/create/${tab.link}`}>
        {tab.title}
        {tab.html}
    </Route>
  })

  useEffect(()=>{
    if(user){
      db.collection('users').doc(user.uid).onSnapshot(snap=>{
        const usersdata = snap.data()
        setLogo(usersdata.companyinfo.logo)
        setCompanylocation({lat: usersdata.lat, lng: usersdata.lng})
      })
    }
  },[user])
  return <div className="create overflow">
       <div className="tabs">
        {tabsrow}
       </div>
    <div className="createinfo" >
    {tabsroute}
    </div>
  </div>
}
export default Create