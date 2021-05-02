import React, { useContext, useState, useEffect } from 'react'
import Element from '../Themebtn/Element'
import Circlebar from '../Circlebar/Circlebar'
import { ContextApp } from '../../ContextAPI'
import Mappedarray from '../BodyRoutes/Dashboard/Mappedarray'
import './Dashboard.css'
import Individmap from '../Website/Search/Map/Individmap'
import { db } from '../../Fire'
import ReactTimeAgo from 'react-time-ago'
import Item from './Item'
import Themebtn from '../Themebtn/Themebtn'
import { CSSTransition } from 'react-transition-group'
import Icon from '../Icon/Icon'
import { useHistory } from 'react-router-dom'
import Jobinfoinputs from './Jobinfoinputs'
import { deleteJobHelper, updateJobHelper } from './Editingjob'
import Jobimginputs from './Jobimginputs'
import firebase from 'firebase'
import { DeleteImgFromStorage } from './DeleteImgStorage'
import { Formatmoney } from './Formatmoney'
import Apexchart from '../Chart/Apexchart'
import  './Joblocation'
import Jobdescription from './Jobdescription'
import Jobinfo from './Jobinfo'
import Mapforjob from './Mapforjob'
function DashboardJob(props) {

  const {job, alljobs} = props
  const {views, applications, user, setEditc, editc, notificationsystem} = useContext(ContextApp)
  const [jobtitle, setJobtitle] = useState(job.job)
  const [uselogo, setUselogo] = useState(job.usecompanylogo)
  const [cover, setCover] = useState(job.cover)
  const [descrip, setDescrip] = useState(job.descrip)  
  const [email, setEmail] = useState(job.cover)  
  const [logo, setLogo] = useState(job.logo)
  const [usecompanylocation, setUsecompanylocation] = useState(job.usecompanylocation)
  const [phone, setPhone] = useState(job.phone)  
  const [wage, setWage] = useState(job.wage)  
  const [oldcover, setOldcover] = useState(job.cover)
  const [oldlogo, setOldlogo] = useState(job.logo)
  const [category, setCategory] = useState(job.category)
  const [companylogo, setCompanylogo] = useState('')
  const history = useHistory()
  const [joblocation, setJoblocation] = useState({
    lat: job.lat,
    lng: job.lng
  })
  const [userslocation, setUserslocation] = useState({
    lat: null,
    lng: null
  })
  // const circlebars  = [
  //   {
  //     color:'#728eec',
  //     percentage: job&&(job.viewed.length*100)/(views.viewdates.length===0?1:views.viewdates.length),
  //     text: 'Views',
  //     customtext: true,
  //   },
  //   {
  //     color: 'rgb(25, 221, 25)',
  //     text: 'Applicants',
  //     customtext: true,
  //     percentage: job&&(job.applicants.length*100)/(applications.applicants.length===0?1:applications.applicants.length),
  //   }
  // ]
  const jobcharts = [
    job.viewed.viewdates, job.applicants.viewdates
  ]
 const Chartapex = <Apexchart title='Analytics' types={['area', 'line','bar']} data={jobcharts[0]} title1={'Weekly Views'} title2={'Weekly Applicants'} data2={jobcharts[1]} />
//   const circlebarsrow =  <Mappedarray array={circlebars}>
//   {({type})=>(
//     <Circlebar  percentage={type.percentage} color={type.color} text={type.text} special={type.customtext}/>
//   )}
// </Mappedarray>



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
    joblocation,
    notificationsystem,
    category
    )
  setEditc(false)
 if(oldcover!==cover) {
  DeleteImgFromStorage(oldcover)
 } 
 if(oldlogo!==logo) {
  DeleteImgFromStorage(oldlogo)
 }
} 



function deleteJob() {
 deleteJobHelper(alljobs, job, notificationsystem)
 setEditc(false)
 DeleteImgFromStorage(oldcover)
 DeleteImgFromStorage(logo)
} 


    useEffect(()=>{
      if(user){
        db.collection('users').doc(user.uid).onSnapshot(snap=>{
          setUserslocation({
            lat: snap.data().lat,
            lng: snap.data().lng
          })
          setCompanylogo(snap.data().companyinfo.logo)
        })
      }
      setOldcover(job.cover)
      setOldlogo(job.logo)
    },[user, job])

  return <div className="dashboardjob" id={job.jobid}>

    <div className='jobtitle'>
      <Icon icon='fal fa-arrow-left' clickEvent={()=>history.goBack()}/>
    <h2>{job.job}</h2>
    </div>
    <div className="jobimgcircles">
      <div className="imgcontainer">
      <img src={job.cover} onError={(e)=>e.target.src='https://i.imgur.com/s1BCVzn.jpg'} alt=""/>
      </div>
      <div className="circlebarscontainer">
        <div>
          {Chartapex} 
        </div>
      </div>
    </div>
    <div className="jobinfo">

      <h2 style={{paddingLeft: '20px'}}>Job Info</h2>
      <div className="infoitems">
          <Jobinfo job={job} />
        <Themebtn classNames='auto' text={'edit'} icon='fal fa-edit' clickEvent={()=>setEditc(!editc)}/>
      </div>
      <img src="https://i.imgur.com/N7XMp4s.png" alt=""/>
    </div>
      <Mapforjob joblocation={joblocation} userslocation={userslocation} setJoblocation={setJoblocation}/>
      <Jobdescription job={job} />

      
      <div  className={editc?"edittab edittab-enter-done":'edittab'}>
        {editc&&<Icon icon='fal fa-times edittabtimes' clickEvent={()=>setEditc(false)}/>}
      <h2>Edit Job</h2>
      <Jobimginputs 
       job={job} companylogo={companylogo}
       logo={logo} setLogo={setLogo}
       uselogo={uselogo} setUselogo={setUselogo}
       cover={cover} setCover={setCover}
      />
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
           location={joblocation} setLocation={setJoblocation}
           deleteJob={deleteJob} updateJob={updateJob}
           category={category} setCategory={setCategory}
          />
      </div>
  </div>
}
export default DashboardJob