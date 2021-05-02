import React, { useContext, useEffect, useState } from 'react'
import Icon from '../Icon/Icon'
import Element from '../Themebtn/Element'
import Themebtn from '../Themebtn/Themebtn'
import './Webjob.css'
import ReactTimeAgo from 'react-time-ago'
import Jobdescription from './Jobdescription'
import { ContextApp } from '../../ContextAPI'
import { db } from '../../Fire'
import firebase from 'firebase'
import Jobinfo from './Jobinfo'
import Mapforjob from './Mapforjob'
import { addNotification } from '../BodyRoutes/Account/Accountroutes/Addnotifi'
import { Senduernotification } from '../Sendusernotification'
import { differenceInDays } from '../../Differenceintime'
import Specialbanner from './Specialbanner/Specialbanner'
function Webjob(props) {
  const {user, notitype, views} = useContext(ContextApp)
  const {job, setBanner, alljobs, webnotifications} = props
  const img = 'https://i.imgur.com/xt3lE8Q.png'
  const [joblocation, setJoblocation] = useState({
    lat: job.lat,
    lng: job.lng
  })
  const [userslocation, setUserslocation] = useState({
    lat: null,
    lng: null
  })
  
  function sendApplication() {
    alljobs && alljobs.map(jobc=>{
      if(jobc.jobid===job.jobid) {
        const jobindex = alljobs.indexOf(jobc)
        alljobs[jobindex].applicants.viewedby.push(user.uid)
        alljobs[jobindex].applicants.viewdates.push(new Date())
        db.collection('alljobs').doc('alljobs').update({
          jobs: alljobs
        }).then(()=>{
          const parameters = {
            msg: 'Application successfully sent!',
            icon: 'fal fa-check-circle',
            notificationsystem: webnotifications
          }
          const usernotification = {
            jobid: job.jobid,
            senderid: user.uid,
            receiverid: job.creatorid,
            type: notitype.applied,
          }
          Senduernotification(usernotification, firebase)
          addNotification(parameters)
          addNotification({
            msg: 'Update your CV at any time in settings!',
            icon: 'fal fa-pen',
            notificationsystem: webnotifications

          })
        }).catch(()=>{
          const parameters = {
            msg: 'Try Again!',
            icon: 'fal fa-exclamation-circle',
            notificationsystem: webnotifications
          }
      
          addNotification(parameters)
        })
      }
    })
  }

  useEffect(()=>{
    if(!(job.viewed.viewedby.includes(user?.uid)) && user){
      alljobs && alljobs.map(jobc=>{
        if(jobc.jobid === job.jobid) {
          const jobindex = alljobs.indexOf(job)
          const currendate = new Date()
          alljobs[jobindex].viewed.lastdate = new Date()
          alljobs[jobindex].viewed.lastupdated = new Date()
          alljobs[jobindex].viewed.viewedby.push(user.uid)
          alljobs[jobindex].viewed.viewdates.push(new Date())
        
          if(currendate.getDay()===2&& (differenceInDays(job.viewed.lastupdated))>1) {
            alljobs[jobindex].viewed.lastupdated = new Date()
            alljobs[jobindex].viewed.lastdate = new Date()
            alljobs[jobindex].viewed.viewdates = []
            alljobs[jobindex].viewed.viewedby = []
          } 
          db.collection('alljobs').doc('alljobs').update({
            jobs: alljobs
          })
       
        }
      })
      views.viewdates.push(new Date())
      views.lastdate = new Date()
      views.lastupdated = new Date()
      db.collection('users').doc(user.uid).update({
        views: views
      })
    }
  },[])
  useEffect(()=>{
    if(user) {
      db.collection('users').doc(user.uid).onSnapshot(snap=>{
        const usersdata = snap.data()
        setUserslocation({
          lat: usersdata.lat,
          lng: usersdata.lng
        })
      })
    }
  },[user])
  return <div className="webjob">
    <Specialbanner text='Views:' img={img} type={job} jobs/>
    <div className="aboutjob">
      <div className="infoitems">
        <Element El='h2' text='Job Info'/>
        <Jobinfo job={job} />
      </div>
      <Jobdescription job={job} El='h2'/>
      <Mapforjob joblocation={joblocation} userslocation={userslocation} setJoblocation={setJoblocation}/>

    </div>
          
    {
      (job.creatorid !== user?.uid && user)
      &&
      <Icon 
      clickEvent={()=>(job.applicants.viewedby.includes(user.uid)||job.applicants.accepted.includes(user.uid))?
       addNotification({
        msg: 'Application already sent!',
        icon: 'fal fa-exclamation-triangle',
        notificationsystem: webnotifications
        })
        :
        sendApplication()  
      }
      icon={(job.applicants.viewedby.includes(user.uid)||job.applicants.accepted.includes(user.uid))?`fas fa-envelope-open applyicon`:'fal fa-envelope applyicon'}
      />
    }   <Icon 
    clickEvent={()=>(job.applicants.viewedby.includes(user.uid)||job.applicants.accepted.includes(user.uid))?
     addNotification({
      msg: 'Application already sent!',
      icon: 'fal fa-exclamation-triangle',
      notificationsystem: webnotifications
      })
      :
      sendApplication()  
    }
    icon={(job.applicants.viewedby.includes(user.uid)||job.applicants.accepted.includes(user.uid))?`fas fa-envelope-open applyicon`:'fal fa-envelope applyicon'}
    />
  </div>
}
export default Webjob