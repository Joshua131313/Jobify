import React from 'react'
import Defaultmsg from '../../../Defaultmsg/Defaultmsg'
import Icon from '../../../Icon/Icon'
import Input from '../../../Input/Input'
import Element from '../../../Themebtn/Element'
import './Searchcont.css'
function Searchcont(props){
  const {setState} = props
  return <div className="searchcont">
    <Icon icon='fal fa-times' clickEvent={()=>setState(false)}/>
    <div>
    <div className='one'>
    <h2>Search</h2>
   <div className="iconinput">
     <i className="fal fa-search"></i>
     <Input placeholder='Search...' focused={true}/>
   </div>
    </div>
    <div className="two">
      <Element El='h2' difcolor={true} styled='#fff' text='Jobs' icon='fal fa-car-building'/>
    <div className="jobssearch">
      <Defaultmsg icon='fal fa-exclamation-circle' text='No Jobs Found' link='website'/>
    </div>
    </div>
    </div>
  </div>
}
export default Searchcont