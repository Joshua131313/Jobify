import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../Fire'
import Element from '../Themebtn/Element'
import './Job.css'
import ReactTimeAgo from 'react-time-ago'
import User from '../User/User'
import Themebtn from '../Themebtn/Themebtn'
import {  HashLink as Link} from 'react-router-hash-link'
import Input from '../Input/Input'
import { useLocation } from 'react-router-dom'
import Uploadimg from '../Uploadimg/Uploadimg'
import Locationinput from '../Locationinput/Locationinput'
import firebase from 'firebase'
import 'react-circular-progressbar/dist/styles.css';
import Tooltip from '@material-ui/core/Tooltip';
import Tooltipel from '../Circlebar/Tooltipel'
import Icon from '../Icon/Icon'
import {updateJobHelper, bookmarkHelper, deleteJobHelper} from './Editingjob'
import Jobinfoinputs from './Jobinfoinputs'
import Jobinputs from './Jobimginputs'
import Jobimginputs from './Jobimginputs'
import { DeleteImgFromStorage } from './DeleteImgStorage'
import { Formatmoney } from './Formatmoney'

function Job(props) {
  const user = firebase.auth().currentUser
  const {job, apply, jobs, type, gridview, notificationsystem, setEditc, noedit} = props 
  const [link, setLink] = useState(`/${type}/job/`+job.jobid)
  const [edit, setEdit] = useState(false)
  const [uselogo, setUselogo] = useState(job.usecompanylogo)
  const [cover, setCover] = useState(job.cover)
  const [oldcover, setOldcover] = useState(job.cover)
  const [oldlogo, setOldlogo] = useState(job.logo)
  const [descrip, setDescrip] = useState(job.descrip)  
  const [email, setEmail] = useState(job.cover)  
  const [jobtitle, setJobtitle] = useState(job.job)  
  const [usecompanylocation, setUsecompanylocation] = useState(job.usecompanylocation)
  const [phone, setPhone] = useState(job.phone)  
  const [wage, setWage] = useState(job.wage)  
  const [category, setCategory] = useState(job.category)

  const [companyinfo, setCompanyinfo] = useState({
    job: '',
    logo: '',
  })

   const [location, setLocation] = useState({
    lng: job.lng,
    lat: job.lat,
  })  
  const [logo, setLogo] = useState(job.logo)
  const [companylogo, setCompanylogo] = useState('')
  const [date, setDate] = useState(job.created)
  const [alljobs, setAlljobs] = useState([])
  const [copy, setCopy] = useState(false)
  
  function updateJob(){
    updateJobHelper(
      alljobs, 
      job, 
      oldcover,
      jobtitle, 
      cover, 
      descrip, 
      uselogo, 
      companylogo, 
      logo, 
      email, 
      phone,
      usecompanylocation,
      location,
      notificationsystem,
      category
      )
    setEdit(false)
    if(oldcover !== cover) {
      DeleteImgFromStorage(oldcover)
    }
    if(oldlogo !== logo) {
      DeleteImgFromStorage(oldlogo)
    }
  } 



  function deleteJob() {
   deleteJobHelper(alljobs, job, notificationsystem)
   setEdit(false)
   DeleteImgFromStorage(logo)
   DeleteImgFromStorage(oldcover)

  } 
  function bookmark(type){
   bookmarkHelper(alljobs, type, job, user, notificationsystem)
  }
  useEffect(()=>{
    db.collection('users').doc(job.creatorid).onSnapshot(snap=>{
      const userdata = snap.data()
      setCompanyinfo({
        job: userdata.companyinfo.companyname,
        logo: job&& job.usecompanylogo?userdata.companyinfo.logo:job.logo,
      })
      if(usecompanylocation) {
        setLocation({
          lat: userdata.lat,
          lng: userdata.lng
        })
      }else {
        setLocation({
          lat: job.lat,
          lng: job.lng
        })
      }
      setCompanylogo(userdata.companyinfo.logo)
    })
  
    db.collection('alljobs').doc('alljobs').onSnapshot(snap=>{
      setAlljobs(snap.data().jobs)
    })

    setOldcover(job.cover)
    setOldlogo(job.logo)
  
  }, [job, uselogo, usecompanylocation])
  
  useEffect(()=>{
    if(gridview) {
      setEdit(false)
    } 
  },[gridview])

  return <div className={edit?"job editjob":'job'} id={job.jobid}>
     {!edit?<> 
     <div className="sectionimg">
       <Link smooth to={`/${type}/job/`+job.jobid+'#top'}>
        <img src={job.cover} onError={e=>e.target.src='https://i.imgur.com/s1BCVzn.jpg'} alt=""/>
       </Link>
       <div className="extracontent">
         <Element El='h3' text={'Job Description'}/>
         <Element El='span' text={Formatmoney(job.wage)}/>
         <Element El='h3'  text='Location'/>
         <Tooltip arrow={true} title={copy?'Copied!':'Copy to clipboard'} aria-label='Tooltip'>
          <div>
          <Locationinput readonly={true} setCopy={setCopy}  state={{lat: job.lat, lng: job.lng}} disabled={false} copy={true}/></div>
        </Tooltip>
        </div>
      {!apply&&
      <Link smooth onClick={()=>setEditc(true)} className='absoluteicon' to={'/dashboard/job/'+job.jobid+"#top"}>
         <Icon icon='fal fa-edit' />
       </Link>
      }
      </div>
      <div className="sectioncont">
        <div className="info">
       
            <Link smooth to={`/${type}/job/`+job.jobid+'#top'}>
              <h2>{job.job}</h2>
            </Link>
            <Element  El='h3' text={Formatmoney(job.wage)}/>
            {apply?
           <Link smooth to={`/${type}/job/`+job.jobid+'#apply'}>
            <Themebtn text='Apply' icon='fal fa-envelope-open'/>
            </Link>
            :
           <Link smooth to={`/dashboard/jobs#${job.jobid}#top`}>
             <Themebtn clickEvent={()=>{!edit?setEdit(true):updateJob()}} text={!edit?'Edit':'Save'} icon={!edit?'fal fa-edit':'fal fa-save'}/>
           </Link>
            }
          {job.savedby.includes(user.uid)?
          <Themebtn text='Bookmarked' icon='fa fa-bookmark' clickEvent={()=>bookmark('remove')}/>
          :
          <Themebtn text='Bookmark'  icon='fal fa-bookmark' classNames='outline' clickEvent={()=>bookmark('add')}/>}
        
        </div>
        <User link={job.creatorid} jobid={job.jobid} type={type} date={job.created} time={true} listing job={companyinfo}/>
      </div>
      <div className="gridcont">
         <Link to={'/dashboard/job/'+job.jobid+'#top'}>
           <Element El='h2' text={job.job}/>
         </Link>
          <User link={job.creatorid} jobid={job.jobid} type={type} date={job.created} time={true} listing job={companyinfo}/>
      </div>
      </>
      :<>
   <div className="sectionimg">
   <div>
   <Element El='h2' text='Logo' />
    <Uploadimg state={job.usecompanylogo?companylogo:logo} setState={setLogo} disabled={uselogo}/>
    <Themebtn classNames='uselogo fullwidth' text={uselogo?"Don't use company logo":'Use company logo'} clickEvent={()=>setUselogo(!uselogo)}/>
   </div>
   <div>
    <Element El='h2' text='Cover'/>
    <Uploadimg state={cover} setState={setCover}/>
   </div>
  </div>
      <div className="sectioncont">
        <div className="info">
          <Jobinfoinputs 
           jobtitle={jobtitle} setJobtitle={setJobtitle} 
           descrip={descrip} setDescrip={setDescrip} 
           wage={wage} setWage={setWage} 
           phone={phone} setPhone={setPhone}
           email={email} setEmail={setEmail}
           cover={cover} setCover={setCover}
           logo={logo} setLogo={setLogo}
           uselogo={uselogo} usecompanylocation={usecompanylocation}
           setUsecompanylocation={setUsecompanylocation}
           location={location} setLocation={setLocation}
           deleteJob={deleteJob} updateJob={updateJob}
           category={category} setCategory={setCategory}
          />
          <div style={{height: '20px'}}></div>
        </div>
      </div>

      </>} 

  </div>
}
export default Job