import React, { useEffect, useState } from 'react'
import { db } from '../../Fire'
import './Userpage.css'
import firebase from 'firebase'
import Specialbanner from '../Job/Specialbanner/Specialbanner'
import Element from '../Themebtn/Element'
import Hrtitle from './Hrtitle/Hrtitle'
import Locationtext from '../Locationinput/Locationtext'
import { options } from '../Options'
import { HashLink as Link } from 'react-router-hash-link'
import Ratings from './Ratings/Ratings'
import { NavLink, Route, Switch } from 'react-router-dom'
import Jobcard from '../Job/Jobcard'
import Jobcards from './Jobcards'
import Aboutuser from './Aboutuser/Aboutuser'

function Userpage (props) {
  const {userid, alljobs, webnotifications} = props
  const currentuser = firebase.auth().currentUser
  const [userinfo, setUserinfo] = useState({
    name: '',
    age: '',
    cover: '',
    email: '',
    phone: '',
    companyname: '',
    companydescrip: '',
    logo: '',
    cv: '',
    lat: null,
    lng: null,
    created: new Date(),
    profession: ''
  })
  const [userinterested, setUserinterested] = useState([])
  const [userratings, setUserratings] = useState([])
  const [avgrating, setAvgrating] = useState(0)
  const [currentuserrating, setCurrentuserrating] = useState(0)
  const [joblistings, setJoblistings] = useState([])
  const [workingat, setWorkingat] = useState([])
  const tab = [
    {
      text: 'About',
      link: '',
      html:<Aboutuser userinfo={userinfo}/>
    },
    {
      text: 'Jobs',
      link: 'userjobs',
      html: <Jobcards array={joblistings} />
    },
    {
      text: 'Work',
      link: 'work',
      html: <Jobcards array={workingat} />
    },
    
  ]
 
  const workingatrow =  workingat?.slice(0, 2).map((job, i)=>{
    return <div className="workingatjob">
      <div className="titlejob">
        <Link smooth to={`/website/job/${job.jobid}#top`}>
        {job.job}
        </Link>
        <span>{i+1}</span>
      </div>
      <div className="joblocation">
        <Locationtext notificationsystem={webnotifications} location={{lat: job.lat, lng: job.lng}}/>
      </div>
    </div>
  })
  const userinterestedrow = userinterested.map(el=>{
    return <>
            {
              options.map(opt=>{
                if(opt.text===el){
                  return <div className="item">
                    <i className={opt.icon}></i>
                    <span>{opt.text}</span>
                  </div>
                }
              })
            }
        </> 
  })

  const tablinks = tab?.map(({link, text})=>{
    return <NavLink exact activeClassName='activetab' to={`/website/user/${userid}/${link}`}>
        {text}
    </NavLink>
  }) 
  const tabroutes = tab?.map(({link, html})=>{
      return <Route exact path={`/website/user/${userid}/${link}`}>
          {html}
      </Route>
  })

  useEffect(()=>{
    db.collection('users').doc(userid).onSnapshot(snap=>{
      const userdata = snap.data()
      setUserinfo({
        name: userdata.userinfo.name,
        email: userdata.userinfo.email,
        phone: userdata.userinfo.phone,
        cover: userdata.userinfo.cover,
        age: userdata.userinfo.age,
        companyname: userdata.companyinfo.companyname,
        companydescrip: userdata.companyinfo.description,
        logo: userdata.companyinfo.logo,
        cv: userdata.cv,
        lat: userdata.lat,
        lng: userdata.lng,
        created: userdata.created,
        profession: userdata.profession
      })
      setUserratings(userdata.ratings)
      setAvgrating((userdata.ratings.reduce((n, {rating})=> n + rating, 0))/userdata.ratings.length)
      userdata.ratings.map(rating=>{
        if(rating.userid === currentuser.uid && currentuser) {
          setCurrentuserrating(rating.rating)
        }
      })
      setUserinterested(userdata.interested)
    })

    setWorkingat(alljobs.filter(x=>x.applicants.hiredusers.includes(userid)))
    if(currentuser) {
      setJoblistings(alljobs.filter(x=>x.creatorid===currentuser.uid))
    }

  },[userid, alljobs, currentuser])

  return <div className="userpage">
    {/* <Specialbanner text='Started:'  type={userinfo} img='https://i.imgur.com/QT23fX6.png' />  */}
    <div className="userinfocontainer">
      <div className="leftsection">
          <div className="userimg">
            <img src={userinfo.cover} alt=""/>
          </div>
          <div className="upper">
            <div>
            <div className="righttitle">
            <h3>{userinfo.name}</h3>
            <span>{userinfo.profession}</span>
          </div>
          <h4>Ratings</h4>
          <div className="userrating">
          <Element El='span' text='Rate:'/>
          <Ratings currentuserrating={currentuserrating} userid={userid} userratings={userratings}/>
          <Element El='span' text='Average Rating:'/>
          <Ratings currentuserrating={avgrating} readOnly={true}/>
          </div>
            </div>
       
          </div>
         
      </div>
      <div className="rightsection">
      <div>
          <Hrtitle text='Work:' />
          <div className="workingat">
            {workingatrow}
          </div>
          <Hrtitle text='Interested:' />
          <div className="userinterested">
          {userinterestedrow}
          </div>
          </div>
          <div className="lowerright">
          <div className="tablinks">
            {tablinks}
          </div>
          <div className="tabroutes">
            <Switch>
              {tabroutes}
            </Switch>
          </div>
          </div>
      </div> 
    </div>
  </div>
}
export default Userpage