import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import { ContextApp } from '../../ContextAPI'
import { db } from '../../Fire'
import './User.css'
import { HashLink as Link } from 'react-router-hash-link'
import ReactTimeAgo from 'react-time-ago'
import Loaderel from '../Loader/Loader'

function User(props) {
  const {setDropdown,time,
         date, link, 
         dashboard, dynamic, 
         listing, job,  
         jobuser, jobuserinfo,
          type, jobid} = props
  const user =firebase.auth().currentUser
  const [userinfo, setUserinfo] = useState({})
  const [companyinfo, setCompanyinfo] = useState({})
  const [loading, setLoading] = useState(true)

  const loader = <Loaderel type={'Puff'} size={30}/>

  useEffect(()=>{
    if(user) {
        db.collection('users').doc(user.uid).onSnapshot(snap=>{
          setUserinfo(snap.data().userinfo)
          setCompanyinfo(snap.data().companyinfo)
          setLoading(false)
        })
    }
    setTimeout(()=>{
      setLoading(false)
    },300)
  },[user])

  return <div className="user" onClick={e=>e.stopPropagation()}>
   {
     dashboard?
     <Link smooth className='companyuser' to={link&&link} >
     <small>
       <span>{companyinfo?.companyname}</span>
       <span>{companyinfo?.description}</span>
     </small>
   {loading?loader:<img src={companyinfo?.logo} alt=""/>}
    </Link>
    :
    listing?
    <Link smooth className='joblisting' to={props.listinglink?link:`/website/user/`+link+'#top'} >
      <small>
        <span>{job?.job}</span>
      {time?<ReactTimeAgo date={date.toDate()}/>:<span>{job?.company}</span>}
      </small>        
      {loading?loader: <img src={job?.logo} alt=""/>}
   </Link>
    :
    user?
    <> 
   <Link smooth to={link&&link} onClick={()=>setDropdown?.(prev=>!prev)}>
    <p>{dynamic?<><span style={{fontWeight: 'bold'}}>Hello {userinfo?.name},</span> here's an overall summary.</>:userinfo?.name}</p>
    {loading?loader:<img src={userinfo?.cover} alt=""/>}
   </Link>
    </>
    :
    <Link smooth to='/login' className='loginuser'>
      <span>Login</span>
    </Link>
  }
  </div>
}
export default User