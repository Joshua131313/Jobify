import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../Fire'
import Element from '../Themebtn/Element'
import './Jobcard.css' 
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
import Jobdescription from './Jobdescription'
import { defaultProps } from 'react-notification-system'
import { options } from '../Options'
import Highlightercomp from '../Highlighter/Highlightercomp'

function Jobcard(props) {
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
  
 
  function bookmark(type){
    bookmarkHelper(alljobs, type, job, user, notificationsystem)
   }
 
   useEffect(()=>{
    db.collection('users').doc(job.creatorid).onSnapshot(snap=>{
      const userdata = snap.data()
      setCompanyinfo({
        job: userdata?.companyinfo.companyname,
        logo: job&& job.usecompanylogo?userdata?.companyinfo.logo:job.logo,
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
      setCompanylogo(userdata?.companyinfo.logo)
    })
  
    db.collection('alljobs').doc('alljobs').onSnapshot(snap=>{
      setAlljobs(snap.data().jobs)
    })

    setOldcover(job.cover)
    setOldlogo(job.logo)
  }, [job, uselogo, usecompanylocation])

  return <div id={job.jobid}  className="jobcard"><Link  to={`/${type}/job/`+job.jobid+'#top'}>

      <div className="jobtitle">
        <i className={options.filter(x=>job.category.includes(x.text))[0].icon}></i>
        <h3><Highlightercomp text={job.job} /></h3>
      </div>

      <Jobdescription job={job} />

      <div className="salary">
        <Element El='h3' text='Salary'/>
        <small>
          <Highlightercomp text={Formatmoney(job.wage)} />
        </small>
      </div>

      <div className="location">
      <Element El='h3'  text='Location'/>
         <Tooltip arrow={true} title={copy?'Copied!':'Copy to clipboard'} aria-label='Tooltip'>
          <div>
          <Locationinput readonly={true} setCopy={setCopy}  state={{lat: job.lat, lng: job.lng}} disabled={false} copy={true}/>
          </div>
        </Tooltip>
      </div>
      
      <div className="controlbtns">
        
      </div>  
      </Link>
      <User link={job.creatorid} jobid={job.jobid} type={type} date={job.created} time={true} listing job={companyinfo}/>
      {
      !apply?<Link smooth onClick={()=>setEditc(true)} className='editicon'  to={'/dashboard/job/'+job.jobid+"#top"}>
         <Icon icon='fal fa-edit ' />
       </Link>
       :user&&
        <div className='editicon' onClick={e=>e.preventDefault()}>
             <Icon  
              text={job.savedby.includes(user.uid)?'Bookmarked':'Bookmark'} 
              icon={`${job.savedby.includes(user.uid)?'fa':'fal'} fa-bookmark `} 
              clickEvent={()=>bookmark(job.savedby.includes(user.uid)?'remove':'add')}
              />
        </div>
      }
      </div>
}
export default Jobcard