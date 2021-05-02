import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { NavHashLink } from 'react-router-hash-link';
import {links} from '../../BodyRoutes/Arrayvariables'
import { CSSTransition } from 'react-transition-group'
import Element from '../../Themebtn/Element'
import Themebtn from '../../Themebtn/Themebtn'
import User from '../../User/User'
import './Sidebar.css'
function Sidebar(props) {
  const {hide, setHide} = props
  const [position, setPosition] = useState(1)
  const linksrow = links.map((link, i)=>{
  if(!link.title) {
    return  <NavHashLink 
              smooth
              exact={link.exact}  
              to={link.link}
              isActive={(match, location)=>{
             if(location.pathname.includes('/dashboard/applications') && link.text==='Applications') 
              {
                return true
              }else if(match) {
                return true
              }
            }} 
              activeClassName={`activesidelink`}
              onClick={()=>setPosition(i)}
              >
            <Element El='span' icon={link.icon} text={link.text}/> 
         
          </NavHashLink>
    
}
  })
  return <div className="sidebar">   
  {
  !hide&&
  <>
  <div className="upper">
      <User link={'/dashboard/account'} company={true} dashboard={true}/>
      <NavHashLink to='/dashboard/create/jobinfo' activeClassName={'activeBtn'} onClick={()=>setHide(true)} isActive={(match, location)=>{return match?.url===location.pathname}}>
      <Themebtn text='Create New Job' icon='fal fa-plus'/>
    </NavHashLink>
  </div>    
  <div className="sidebarlinks">
      {linksrow}
      
      <Link onClick={()=>setHide(true)}>
        <Element El='span' icon={'fal fa-arrow-left'} text='Hide Sidebar'/>
      </Link>
     
  </div>
  <div className="lower">
    <div className="contenttext">
        <Element El='span' text='Easily Manage Anything With Jobify'/>
       <Link to='/dashboard'> <Themebtn text='Learn More'/></Link>
    </div>
    <img src="https://i.imgur.com/yl8XeDe.png" alt=""/>
  </div>
  </>
  }
    {hide&&<i className='fal fa-arrow-right' onClick={()=>setHide(false)}></i>}
  </div>
}
export default Sidebar