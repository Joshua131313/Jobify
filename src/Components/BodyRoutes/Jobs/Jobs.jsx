import React, { useContext, useEffect, useState } from 'react'
import { ContextApp } from '../../../ContextAPI'
import { differenceInDays } from '../../../Differenceintime'
import { db } from '../../../Fire'
import Circlebar from '../../Circlebar/Circlebar'
import DashboardJob from '../../Job/Dashboardjob'
import Job from '../../Job/Job'
import Element from '../../Themebtn/Element'
import Mappedarray from '../Dashboard/Mappedarray'
import Nav from '../Nav/Nav'
import Icon from '../../Icon/Icon'
import './Jobs.css'
import Defaultmsg from '../../Defaultmsg/Defaultmsg'
import Jobcard from '../../Job/Jobcard'
import { addNotification } from '../Account/Accountroutes/Addnotifi'

function Jobs(props) {
  const {setEditc, notificationsystem} = useContext(ContextApp)
  const [savedjobs, setSavedjobs] = useState([])
  const [userjobs, setUserjobs] = useState([])
  const { activity, applications, views, user, differenceindays, gridview, darkmode, hidenav, themecolor, pattern, themesecond} = useContext(ContextApp)
  const differenceintime = differenceInDays(activity.lastupdated)
  const differenceindaysupdated = differenceintime/(1000 * 3600 * 24) 
  const userjobsrow = <Mappedarray reverse array={userjobs}>
    {({type})=>(
      <Jobcard job={type} setEditc={setEditc} notificationsystem={notificationsystem} gridview={gridview} type={'dashboard'}/>
    )}
  </Mappedarray>

      
  const circlebars = [
 {
      percentage: activity.percent,
      color: '#399ff3',
      text: 'Activity'
  },
   {
    percentage: views.viewdates.length,
    color: '#728eec',
    text: 'Views'
  },
  {
    percentage: applications.applicants.length,
    color:'rgb(25, 221, 25)',
    text: 'Applications'
  }
]
const circlebarsrow =  <Mappedarray array={circlebars}>
    {({type})=>(
      <Circlebar  percentage={type.percentage} color={type.color} text={type.text}/>
    )}
</Mappedarray>

const [allviews, setAllviews] = useState([])

function gridView(){
  db.collection('users').doc(user.uid).update({
    customization: {
      darkmode,
      gridview: !gridview,
      hidenav,
      themecolor,
      themesecond
    }
  })
}

useEffect(()=>{
  if(user) {
    if(differenceindaysupdated>1){
      db.collection('users').doc(user.uid).update({
        activity: {
          lastdate: activity.lastdate,
          percent: (differenceindays>3&&differenceindays<5)?activity.percent-5:(differenceindays>5&&differenceindays<7)?activity.percent-10: 0,
          lastupdated: new Date()
        }
      })
    }
    db.collection('alljobs').doc('alljobs').onSnapshot(snap=>{
      const userdata = snap.data()
        setUserjobs(userdata && userdata.jobs.filter(x=>x.creatorid===user.uid))
        setSavedjobs(userdata && userdata.jobs.filter(x=>x.savedby.includes(user.uid)))
    })  
  }
}, [activity, user])

  return <div className="jobs">
   <div className="recenttitle flat">
     <Element  El='h2' text='Your Job Listings'/>
    <div className="flexwrapped">
    {circlebarsrow}
    </div>
   </div>
  <div className={`elementicon flat ${gridview?'activegridviewbtn':''}`}>
      <Element clickEvent={()=>{
        gridView(); 
        addNotification({notificationsystem, msg: `${gridview?'Disabled':'Enabled'} grid view!`, icon: 'fal fa-th'})
       }
       } 
        El='span' icon='fal fa-th' text='Grid View'/>
  </div>
   <div className={gridview?"alljobs flat gridview":'alljobs flat'}>
      {userjobsrow} 
   </div>
  </div>
}
export default Jobs