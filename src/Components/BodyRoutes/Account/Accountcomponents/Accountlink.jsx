import React from 'react'
import { NavLink } from 'react-router-dom'
import './Accountlink.css'
function Accountlink(props){
  const {link, text, icon, exact} = props
  return <NavLink exact={exact} to={link} activeClassName='activeaccountlink'>
    <i className={icon}></i>
    <span>{text}</span>
  </NavLink>
}
export default Accountlink