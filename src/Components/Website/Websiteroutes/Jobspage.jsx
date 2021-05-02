import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../../Fire'
import Mappedarray from '../../BodyRoutes/Dashboard/Mappedarray'
import Job from '../../Job/Job'
import Jobcard from '../../Job/Jobcard'
import Websitemappedarray from '../Websitemappedarray'
import firebase from 'firebase'
import { ContextApp } from '../../../ContextAPI'
import { Route, Switch } from 'react-router-dom'
import Webjob from '../../Job/Webjob'
function Jobspage(props) {
  const {gridview} = useContext(ContextApp)
  const {alljobs, link, webnotifications, pattern, category, keyword, radius, userslocation, filterby} = props
  const alljobsrow = <Websitemappedarray filterby={filterby} reverse userslocation={userslocation} radius={radius} keyword={keyword} pattern={pattern} category={category} array={alljobs} webnotifications={webnotifications}>
  {({type})=>(
      <Jobcard job={type} notificationsystem={webnotifications} type='website' apply={true}/>    
  )}
  </Websitemappedarray>
  


  return <div className={gridview?"alljobs jobspage gridview":'alljobs jobspage'}>
     <Switch>
     <Route path={link}>
        {alljobsrow}
      </Route>
     </Switch>
  </div>
}
export default Jobspage