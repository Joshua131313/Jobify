import React from 'react'
import Element from '../Themebtn/Element'
import Themebtn from '../Themebtn/Themebtn'
import Uploadimg from '../Uploadimg/Uploadimg'

function Jobimginputs(props) {
  const {
     job, companylogo, 
     logo, setLogo,
     uselogo, setUselogo,
     cover, setCover} = props
  return  <div className="sectionimg">
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
}
export default Jobimginputs