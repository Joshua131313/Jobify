import React from 'react'
import Element from '../../Themebtn/Element'

function Spacebetween(props) {
  const {userinfo, text, type, icon, cv} = props 
  return     <div className="spacebetween">
  <span>
    <i className={icon}></i>
    <span>
    {text}
    </span>
  </span>
  <Element El={cv?'span':'a'}  text={userinfo[type]}/>
</div>
}
export default Spacebetween