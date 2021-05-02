import React, { useContext, useEffect, useState } from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import { ContextApp } from '../../../../ContextAPI'
import { db } from '../../../../Fire'
import Icon from '../../../Icon/Icon'
import {  Alterjobuserids } from '../../../RemoveAccept'
import Element from '../../../Themebtn/Element'
import Themebtn from '../../../Themebtn/Themebtn'
import User from '../../../User/User'
import './Notificationcard.css'
import firebase from 'firebase'
import { addNotification } from '../../Account/Accountroutes/Addnotifi'
import { Deletenotification, Senduernotification } from '../../../Sendusernotification'
function Notificationcard (props) {
  const {notification, alljobs} = props
  const {notitype, user, notificationsystem} = useContext(ContextApp)
  const [allnotification, setAllnotification] = useState([])
  const [senderinfo, setSenderinfo] = useState({
    company: '',
    logo: '', 
    userid: notification.senderid,
    job: '',
    jobid: ''
  })
  function determineClass(){
    if(notification.type===notitype.rejected) {
      return 'rednoti'
    }
    if(notification.type===notitype.applied){
      return 'themenoti bigger'
    }
    if(notification.type===notitype.hired) {
      return 'greennoti'
    }
    return 'themenoti timer'
  }
  

  function acceptRejectApplication(type, add=false){
    const removeparameters = {
      alljobs,
      notification,
      removetype: type===notitype.hired?'accepted':'viewedby',
      addtype: type===notitype.hired?'hiredusers':'accepted',
      removetypedate: type===notitype.hired?'interviewdates':'viewdates',
      addtypedate: type===notitype.hired?'hireddates':'interviewdates'
    }
      const parameters = {
        notificationsystem,
        msg: `${senderinfo.job} will be notified!`,
        icon: `fal fa-${type===notitype.accepted?'check-circle':type===notitype.hired?'fal fa-check-circle':'pennant'}`,
      }
    const notificationparameters = {
      type: type, 
      jobid: notification.jobid,
      senderid: user.uid,
      receiverid: notification.senderid
    }
    addNotification(parameters)
    Alterjobuserids(removeparameters,add)
    Senduernotification(notificationparameters, firebase)
   if(type===notitype.rejected) {
    Deletenotification(notification, firebase)
   }else {
    allnotification && allnotification.map(noti=>{
      if(noti.notificationid === notification.notificationid) {
        const notiindex = allnotification.indexOf(noti)
        allnotification[notiindex].disabled = true
        db.collection('notifications').doc(user.uid).update({
          notifications: allnotification
        })
      }
    })
   }
  }



  useEffect(()=>{
    db.collection('users').doc(notification.senderid).onSnapshot(snap=>{
      const usersdata = snap.data()
      setSenderinfo({
        job: notification.type===notitype.applied?usersdata.userinfo.name:usersdata.companyinfo.companyname,
        logo: notification.type===notitype.applied?usersdata.userinfo.cover:usersdata.companyinfo.logo,
        userid: usersdata.uid,
        company:alljobs && alljobs.filter(x=> x.jobid === notification.jobid)[0]?.job,
        jobid: notification.jobid
      })
    })
    db.collection('notifications').doc(user.uid).onSnapshot(snap=>{
      setAllnotification(snap.data().notifications)
    })
  },[notification, alljobs])

  return <div className={`notificationcard ${determineClass()}`}>
      <div className="notiinfo">
       <i className={determineClass()}></i>
      <div>
        <span>Status: </span>
        <strong className={determineClass()}>{notification.type}</strong>
      </div>
      <div>
          <span>Job Title: </span>
          <Link to={`/website/job/${notification.jobid}`} className='notilink'><strong>{senderinfo.company}</strong></Link>
      </div>
        {
          notification.type===notitype.applied&&
          <>
          {!notification.disabled&&
          <div className=''>
          <span>Decision: </span>
          <div className='acceptrejectbtns'>
          <Icon  icon='fal fa-check-circle' clickEvent={()=>acceptRejectApplication(notitype.accepted, true)}/>
           <Icon  icon='fal fa-pennant' clickEvent={()=>acceptRejectApplication(notitype.rejected)}/>
          </div>
         </div>
          }
          {notification.disabled &&<div className='acceptrejectbtns mrnone' style={{marginTop: '10px'}}>
          <span>Hire:</span>
          <Icon icon='fal fa-check-circle' clickEvent={()=>acceptRejectApplication(notitype.hired, true)}/>
          </div>}
          </>
        }
      </div>
    <User link={senderinfo.userid} job={senderinfo} listing={true}/>
  </div>
}
export default Notificationcard