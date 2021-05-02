import React, { useContext, useState, useEffect } from 'react'
import { ContextApp } from '../../../ContextAPI'
import Jobcard from '../../Job/Jobcard'
import Element from '../../Themebtn/Element'
import Mappedarray from '../Dashboard/Mappedarray'
import Filteredjobscontainer from './Filteredjobscontainer'
import './Applications.css'
import Mappedarraycomp from './Mappedarraycomp'
import { NavLink, Route, Switch } from 'react-router-dom'
import Applicationnotifi from '../Applicationnotificomponent/Applicationnotifi'
function Applications(props) {
  const {alljobs} = props
  const {user, notificationsystem} = useContext(ContextApp)
  const [interviews, setInterviews] = useState([])
  const [appliedto, setAppliedto] = useState([])
  const [rejected, setRejected] = useState([])
  const [hired, setHired] = useState([])
  
    const allfilteredjobs = [
      {
        link: '',
        html: <Mappedarraycomp array={interviews} />,
        text: 'Interviews',
        icon: 'fa fa-hourglass-start',
        exact: true
      },
      {
        link: '/applications',
        html: <Mappedarraycomp array={appliedto} />,
        text: 'Applications',
        icon: 'fa fa-envelope-open'
      },      {
        link: '/hiredjobs',
        html: <Mappedarraycomp array={hired} />,
        text: 'Hired',
        icon: 'fal fa-check-circle',
        classNames: 'successjobs'
      },
      {
        link: '/rejected',
        html: <Mappedarraycomp array={rejected} />,
        text: 'Rejected',
        icon: 'fa fa-pennant',
        classNames: 'warningjobs'
      },

    ]
    const filteredjobsroute = allfilteredjobs?.map(jobs=>{
      return <Route exact path={`/dashboard/applications${jobs.link}`}>
        <Filteredjobscontainer classNames={jobs.classNames} html={jobs.html} text={jobs.text} icon={jobs.icon} />      
      </Route>
    })
    const tabslinks = allfilteredjobs?.map(jobs=>{
      return <NavLink 
              exact={true}
              to={`/dashboard/applications${jobs.link}`}
              activeClassName='activetab'
              >
          <i className={jobs.icon}></i>
          <span>{jobs.text}</span>
      </NavLink>
    })
    useEffect(()=>{
      if(user) {
        setInterviews(alljobs && alljobs.filter(x=> x.applicants.accepted.includes(user.uid)))
        setRejected(alljobs && alljobs.filter(x=> x.applicants.rejected.includes(user.uid)))
        setAppliedto(alljobs && alljobs.filter(x=> x.applicants.viewedby.includes(user.uid)))
        setHired(alljobs && alljobs.filter(x=> x.applicants.hiredusers.includes(user.uid)))
      
      }
    },[alljobs, user]) 
  return <Applicationnotifi
        jobcard 
        interviews={interviews} 
        appliedto={appliedto} 
        hired={hired} 
        rejected={rejected}
        type='applications'
        alljobs={alljobs}/>
 }
export default Applications