import React, { useContext, useEffect, useRef, useState } from 'react'
import Search from './Search/Search'
import './Website.css'
import firebase from 'firebase'
import {db} from '../../Fire'
import Motiondiv from '../Motiondiv/Motiondiv'
import Banner from './Banner'
import Footer from './Footer/Footer'
import NotificationSystem from 'react-notification-system';
import { Route, Switch } from 'react-router-dom'
import Jobspage from './Websiteroutes/Jobspage'
import { addNotification } from '../BodyRoutes/Account/Accountroutes/Addnotifi'
import { links } from './Links'
import Webjob from '../Job/Webjob'
import Icon from '../Icon/Icon'
import { ContextApp } from '../../ContextAPI'
import Userpage from '../Userpage/Userpage'


function Website(props) {
  const user = firebase.auth().currentUser
  const {keyword, setKeyword} = useContext(ContextApp)
  const [userslocation, setUserslocation] = useState({
    lat: null,
    lng: null
  })
  const {scrolled, allusers, setAllusers} = useContext(ContextApp)
  const [category, setCategory] = useState([])
  const [salary, setSalary] = useState([])
  const {banner, setBanner} = props
  const webnotifications = useRef()
  const [alljobs, setAlljobs] = useState([])
  const [savedjobs, setSavedjobs] = useState([])
  const [radius, setRadius] = useState(Infinity)
  
  const pattern = new RegExp('\\b' + keyword.replace(/[^a-zA-Z0-9 ]/g, ""), 'i')
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
    const routes=[
    {
      link: '/website',
      html: <>
      <Jobspage 
      webnotifications={webnotifications} 
      userslocation={userslocation} 
      radius={radius} 
      keyword={keyword} 
      category={category} 
      pattern={pattern} 
      filterby={'category'} 
      alljobs={alljobs}/>
      </>,
      text: 'Job Search',
     jobs: alljobs,
     filterby: 'interested',
     index: 0,
     category,
     setCategory 
    },
    {
      link: '/website/saved',
      html: <>
      <Jobspage 
      webnotifications={webnotifications} 
      userslocation={userslocation} 
      radius={radius} 
      keyword={keyword} 
      category={category} 
      pattern={pattern} 
      filterby={'category'}  
      alljobs={savedjobs}/>
      </>,
      text: 'Saved Job Search',
      jobs: savedjobs,
      filterby: 'interested',
      index: 1,
      category,
      setCategory 
    },
    {
      link: '/website/salaries',
      html: <>
      <Jobspage 
      webnotifications={webnotifications} 
      userslocation={userslocation} 
      radius={radius} 
      keyword={keyword} 
      category={salary} 
      pattern={pattern} 
      filterby={'salary'}  
      alljobs={alljobs}/>
      </>,
      text: 'Find Salaries',
      index: 2,
      salary: true,
      filterby: 'salary',
      category:salary,
      setCategory: setSalary 
    },
    {
      link: '/dashboard/applications',
      html: '',
      index: 3,
    }
  ]
  const jobsroute = alljobs?.map(job=>{
    return <Route exact path={`/website/job/${job.jobid}`}>
      <Webjob webnotifications={webnotifications} job={job} alljobs={alljobs} setBanner={setBanner}/>
    </Route>
  })    
  const routesrow = routes?.map(route=>{
     return <Route exact path={route.link}>
        <Banner img={banner}/>
          <Search 
          link={route.link}
          img={links[route.index].img}
          setBanner={setBanner} 
          filterby={route.filterby} 
          jobs={route.jobs}
          radius={radius} 
          setRadius={setRadius} 
          category={route.category} 
          setCategory={route.setCategory} 
          text={route.text} 
          userslocation={userslocation} 
          setUserslocation={setUserslocation} 
          setKeyword={setKeyword}
          />
          
          {route.html}
     </Route>
  })
  const userpageroutes = allusers?.map(userid=>{
    return <Route  path={`/website/user/${userid}`}>
        <Userpage webnotifications={webnotifications} userid={userid} alljobs={alljobs}/>
    </Route>
  })
  useEffect(()=>{
    if(user){
      db.collection('users').doc(user.uid).onSnapshot(snap=>{
        const usersdata = snap.data()
        setUserslocation({
            lat: usersdata.lat, 
           lng: usersdata.lng
          })
          setCategory(usersdata.interested)
          setSalary(usersdata.salary)
      })

      } 
      db.collection('alljobs').doc('alljobs').onSnapshot(snap=>{
        const jobsdata = snap.data()
        setAlljobs(jobsdata.jobs)
        if(user) {
          setSavedjobs(jobsdata.jobs.filter(x=>x.savedby.includes(user.uid)))
        }
      })
      const parameters = {
        msg: 'Job Cards are scrollable!',
        icon: 'fal fa-info-circle',
        notificationsystem: webnotifications
      }
      addNotification(parameters)
  },[user])

  return <Motiondiv html={
    <>
    <NotificationSystem  style={style} ref={webnotifications}/>
   
 
    <div className={!scrolled?"web webscrolledtop":'web'}> 
            
         <Switch>
           {routesrow} 
           {jobsroute}
           {userpageroutes}
           <Route>
                asd
           </Route>
         </Switch>    
        <Icon icon='fal fa-arrow-up scrolltotop' clickEvent={()=>window.scrollTo(0, 0)}/>
    </div>

    <Footer setBanner={setBanner} webnotifications={webnotifications}/>
  </>
  }/>
}
export default Website