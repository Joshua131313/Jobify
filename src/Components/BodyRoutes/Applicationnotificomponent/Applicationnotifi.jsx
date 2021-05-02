import React, { useContext, useEffect, useState } from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
import { ContextApp } from '../../../ContextAPI'
import { db } from '../../../Fire'
import Themebtn from '../../Themebtn/Themebtn'
import Filteredjobscontainer from '../Applications/Filteredjobscontainer'
import Mappedarraycomp from '../Applications/Mappedarraycomp'

function Applicationnotifi(props) {
  const {interviews, appliedto, hired, rejected, jobcard, type, alljobs, gridviewauto} = props
  const {user}  = useContext(ContextApp)
  const allfilteredjobs = [
    {
      link: '',
      html: <Mappedarraycomp array={interviews} jobcard={jobcard} alljobs={alljobs}/>,
      text: 'Interviews',
      icon: 'fa fa-hourglass-start',
      exact: true
    },
    {
      link: '/applications',
      html: <Mappedarraycomp array={appliedto} jobcard={jobcard} alljobs={alljobs}/>,
      text: 'Applications',
      icon: 'fa fa-envelope-open'
    },      {
      link: '/hiredjobs',
      html: <Mappedarraycomp array={hired} jobcard={jobcard} alljobs={alljobs}/>,
      text: 'Hired',
      icon: 'fal fa-check-circle',
      classNames: 'successjobs'
    },
    {
      link: '/rejected',
      html: <Mappedarraycomp array={rejected} jobcard={jobcard} alljobs={alljobs}/>,
      text: 'Rejected',
      icon: 'fa fa-pennant',
      classNames: 'warningjobs'
    },

  ]
  const filteredjobsroute = allfilteredjobs?.map(jobs=>{
    return <Route exact path={`/dashboard/${type}${jobs.link}`}>
      <Filteredjobscontainer gridviewauto={gridviewauto} classNames={jobs.classNames} html={jobs.html} text={jobs.text} icon={jobs.icon} />      
    </Route>
  })
  const tabslinks = allfilteredjobs?.map(jobs=>{
    return <NavLink 
            exact={true}
            to={`/dashboard/${type}${jobs.link}`}
            activeClassName='activetab'
            >
        <i className={jobs.icon}></i>
        <span>{jobs.text}</span>
    </NavLink>
  })

  function clearNotifi() {
    db.collection('notifications').doc(user.uid).update({
      notifications: []
    })
  }

  return  <div className="applications jobs">
    <h2 style={{textTransform: 'capitalize', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <span>{type}</span>
      {type==='notifications'&&<Themebtn text='Clear Notifications' icon='fal fa-trash' classNames='clearnotibtn' clickEvent={()=>clearNotifi()}/>}
      </h2>
    
  <div className="applicationstabs">
  {tabslinks}
  </div>
  <div className="applicationsroute">
 <Switch>
 {filteredjobsroute}
 </Switch>
  </div>
</div>
  
}
export default Applicationnotifi