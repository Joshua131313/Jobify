import React, { useContext, useState, useEffect } from 'react'
import Element from '../../Themebtn/Element'
import { HashLink as Link } from 'react-router-hash-link';
import {  types, info, jobs, links } from '../Arrayvariables';
import User from '../../User/User';
import Mappedarray from './Mappedarray';
import { ContextApp } from '../../../ContextAPI';
import Boxes from './Mappedarrayhtml/Boxes';
import Info from './Mappedarrayhtml/Info';
import Interviews from './Mappedarrayhtml/Interviews';
import Numcont from './Mappedarrayhtml/Numcont';
import Icon from '../../Icon/Icon';
import Chartel from '../../Chart/Chart';
import { db } from '../../../Fire';
import Apexchart from '../../Chart/Apexchart';
import Jobcard from '../../Job/Jobcard';
import { differenceInDays } from '../../../Differenceintime';
function Home(props) {
  
  const {alljobs} = props
  const {pattern, keywor, views, user, notitype} = useContext(ContextApp)
  const [userjobs, setUserjobs] = useState([])
  const [interviews, setInterviews] = useState([])
 
  const [newlength, setNewlength] = useState([])
  const [waitinglength, setWaitinglength] = useState([])
  const [interviewslength, setInterviewslength] = useState([])
  const [rejectedlength, setRejectedlength] = useState([])
  const [hiredlength, setHiredlength] = useState([])
  const [notificationslength, setNotificationslength] = useState([])
  const [candidates, setCandidates] = useState([])
  const [hirerate, setHirerate] = useState([])
  const [totalviewedjobs, setTotalviewedjobs] = useState([])
  const [avgtime, setAvgtime] = useState(0)
 
  const types = [
    {
    text: 'New',
    length: newlength?.length,
    link: '/applications',
    icon: 'fal fa-sparkles'
  },
  {
    text: 'Waiting',
    length: waitinglength?.length,
    link: '/applications',
    icon: 'fal fa-eye'
  }, 
  {
    text: 'Interviews',
    length: interviewslength?.length,
    link: '/applications/interviews',
    icon: 'fal fa-handshake'
  }, 
  {
    text: 'Hired',
    length: hiredlength?.length,
    link: '/applications/hiredjobs',
    icon: 'fal fa-check-circle'
  },
  {
    text: 'Rejected',
    length: rejectedlength?.length,
    link: '/applications/rejected',
    icon: 'fal fa-exclamation-circle'
  },
  {
    text: 'Notifications',
    icon: 'fal fa-bell',
    link: '/notifications',
    length: notificationslength?.length
  }
  ]
   const numcont = [
    {
      text: 'Applications',
      length: waitinglength?.length,
      icon: 'fal fa-arrow-up'
    },
    {
      text: 'Candidates',
      length: candidates?.length,
      icon: 'fal fa-arrow-up'
    },
    {
      text: 'Hire Rate',
      length: hirerate?.length,
      icon: 'fal fa-arrow-up'
    }
    ]
    const info = [
      {
        text: 'Weekly Viewed Jobs',
        length: totalviewedjobs?.length,
      },

      {
        text: 'Average time to recruit',
        length: isNaN(differenceInDays(avgtime)?.toFixed(0))?'N/A':differenceInDays(avgtime)?.toFixed(0),
        date: true
      },
      {
        text: 'Average hiring rate',
        length: hirerate?.length*5,
        circle: true
      }
      ]
  const numcontrow = 
  <Mappedarray array={numcont}>
  {({type})=>(
    <Numcont type={type}/>
  )}
  </Mappedarray>
  const boxesrow = 
  <Mappedarray array={types} length=''>
  {({type})=>(
    <Boxes type={type}/>
  )
  }
  </Mappedarray>
  const inforow = 
  <Mappedarray array={info} >
    {({type})=>(
      <Info type={type}/>
    )
    }
  </Mappedarray>



const jobsrow = 
<Mappedarray array={userjobs} >
  {({type})=>(
    <User job={type} jobs={userjobs} link={`/dashboard/jobs#${type.jobid}`} listinglink listing={true}/>
  )}
</Mappedarray>

const interviewsrow = 
<Mappedarray array={interviews} >
  {({type})=>(
   <Interviews job={type} alljobs={interviews}/>
  )
  }
</Mappedarray>


 useEffect(()=>{
  if(user) {
    db.collection('alljobs').doc('alljobs').onSnapshot(snap=>{
      const jobsdata = snap.data()
      setUserjobs(jobsdata.jobs.filter(x=>x.creatorid===user.uid))
      setWaitinglength(jobsdata.jobs.filter(x=>x.applicants.viewedby.includes(user.uid)))
      setInterviewslength(jobsdata.jobs.filter(x=>x.applicants.accepted.includes(user.uid)))
      setHiredlength(jobsdata.jobs.filter(x=>x.applicants.hiredusers.includes(user.uid)))
      setRejectedlength(jobsdata.jobs.filter(x=>x.applicants.rejected.includes(user.uid)))
      setTotalviewedjobs(jobsdata.jobs.filter(x=>x.viewed.viewedby.includes(user.uid)))
    }) 
    db.collection('notifications').doc(user.uid).onSnapshot(snap=>{
      const notificationsdata = snap.data()
      setNewlength(notificationsdata?.notifications.filter(x=>differenceInDays(x.date)<1 && (x.type===notitype.accepted || x.type===notitype.hired)))
      setNotificationslength(notificationsdata?.notifications)
    })
    db.collection('users').doc(user.uid).onSnapshot(snap=>{
      const usersdata = snap.data()
      setCandidates(usersdata.candidates)
      setHirerate(usersdata.hiredusers)
      setAvgtime(usersdata.lastrecruit)
    })
  } 
  setInterviews(alljobs && alljobs.filter(x=> x.applicants.accepted.includes(user.uid)))
 
}, [user, alljobs])

  return <> 
   <div className="firstpart">
  <section className="boxenotis">
  <Element El='h2' text='QuickLinks'/>
    <div>{boxesrow}</div>
  </section>
</div>
<div className="secondpart">
  <div className="overview">
    <Element El='h2' text='Overview'/>
    <div className="numcont">
      {numcontrow}
    </div>
    <hr/>
    <div className="inforow">
      {inforow}
    </div>
  </div>
  <div className="joblistings">
    <Element El='h2' text='Job Listings'/>
    <div className="listings">
      {jobsrow}
    </div>
  </div>
  <div className="upcoming" >
    <Element El='h2' text='Upcoming Interviews'/>
    <Link smooth to='/dashboard/applications#interviews' className='viewall'>
      <Icon icon='fal fa-eye'/>
    </Link>
    {interviewsrow}
  </div>
  <div className="viewschart">
      {/* <Chartel data={views.viewdates}/> */}
      <Apexchart title='Weekly Views' types={['area', 'bar','line']} data={views.viewdates} title1={'Weekly Views'} series1={true}/>
  </div>
</div>
</>
}
export default Home