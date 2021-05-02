import React from 'react'
import { Link } from 'react-router-dom'
import Element from '../Themebtn/Element'
import './Dropdown.css'


function Dropdown(props) {

  const  {list, handleLogout} = props

  const listrow = list?.map(item=>{
    if(item.logout) {
      return <Link to='/website' onClick={()=>handleLogout()}>
        <Element El='span' text={item.text} icon={item.icon}/>
      </Link>
    } 
    else if(item.title) {
      return <Element El='h3' text={item.text}/>
    }
    else {
      return <Link to={item.link}>
        <Element El='span' icon={item.icon} text={item.text}/>
      </Link>
    }    
  })

  return <div id='dropdown' className="dropdown">
    {listrow}
  </div>
}
export default Dropdown