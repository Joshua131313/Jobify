import React, { useContext, useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'
import './Bodyroutes.css'
import Create from './Create/Create'
import Jobs from './Jobs/Jobs'
import Home from './Dashboard/Home'
import { ContextApp } from '../../ContextAPI'
import { db } from '../../Fire'
import DashboardJob from '../Job/Dashboardjob'
import Motiondiv from '../Motiondiv/Motiondiv'
import Account from './Account/Account'
import NotificationSystem from 'react-notification-system';
import Applications from './Applications/Applications'
import Notifications from './Notifications/Notifications'

function Bodyroutes(props) {
  const {user, notificationsystem} = useContext(ContextApp)
  const [userjobs, setUserjobs] = useState([])
  const [alljobs, setAlljobs] = useState([])
 
  const userjobsroute = userjobs?.map(job=>{
   return <Route path={`/dashboard/job/${job.jobid}`}>
     <Dashboard html={
        <DashboardJob job={job} alljobs={alljobs}/>
     }/>
   </Route>
 })
 
 const style = {
  NotificationItem: {
    DefaultStyle: {
      backgroundColor: '#fff',
      borderRadius: '10px',
      border: 'solid 1px rgb(0, 0,0,0)',
      boxShadow: 'var(--light-shadow)',
      height: '45px',
      display: 'flex',
      alignItems: 'center'
    },
    warning: {
    }
  }
}
  useEffect(()=>{
    if(user) {
      db.collection('alljobs').doc('alljobs').onSnapshot(snap=>{
        setUserjobs(snap.data().jobs.filter(x=>x.creatorid===user.uid))
        setAlljobs(snap.data().jobs)
      })
    }
   }, [user])
  return <div className="routes">
    <NotificationSystem  style={style} ref={notificationsystem}/>
      <Route path='/dashboard/create'>
        <Motiondiv html={
        <Create />}
        />
      </Route>
      <Route exact path='/dashboard'>
        <Dashboard  html={<Home alljobs={alljobs}/>}/>
      </Route>
      <Route path='/dashboard/jobs'>
        <Dashboard html={<Jobs />}/>
      </Route>
      {userjobsroute}
      <Route path='/dashboard/applications'>
        <Dashboard html={<Applications alljobs={alljobs}/>} />
      </Route>
      <Route path='/dashboard/notifications'>
          <Dashboard html={<Notifications alljobs={alljobs}/>} />
      </Route>
      <Route path='/dashboard/account'>
        <Account />
      </Route>
      <Route path='/ads'></Route>
  </div>
}
export default Bodyroutes