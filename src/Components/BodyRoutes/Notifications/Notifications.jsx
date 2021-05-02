import React, { useContext, useEffect, useState } from 'react'
import { ContextApp } from '../../../ContextAPI'
import { db } from '../../../Fire'
import Applicationnotifi from '../Applicationnotificomponent/Applicationnotifi'

import './Notifications.css'

function Notifications(props) {
  const {alljobs} = props
  const [notifications, setNotifications] = useState([])
  const {user, notitype} = useContext(ContextApp)
  const [interviewsnoti, setInterviewsnoti] = useState([])
  const [appliedtonoti, setAppliedtonoti] = useState([])
  const [rejectednoti, setRejectednoti] = useState([])
  const [hirednoti, setHirednoti] = useState([])
  useEffect(()=>{
    if(user) {
      db.collection('notifications').doc(user.uid).onSnapshot(snap=>{
        const notidata = snap.data()
        setNotifications(notidata?.notifications)
      
        setInterviewsnoti(notidata?.notifications.filter(x=>x.type===notitype.accepted))
        setHirednoti(notidata?.notifications.filter(x=>x.type===notitype.hired))
        setRejectednoti(notidata?.notifications.filter(x=>x.type===notitype.rejected))
        setAppliedtonoti(notidata?.notifications.filter(x=>x.type===notitype.applied))
      
      })
    }
  },[user])
  return <div className="notifications">
      <Applicationnotifi 
        interviews={interviewsnoti}
        appliedto={appliedtonoti}
        hired={hirednoti}
        rejected={rejectednoti}
        type='notifications'
        alljobs={alljobs}
        gridviewauto={true}
      />
  </div>
}
export default Notifications