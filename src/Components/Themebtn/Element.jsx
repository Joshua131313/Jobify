import React from 'react'
import './Element.css'
function Element(props) {
  const {icon, text, El, clickEvent, classNames} = props

  return <El target='__blank' onClick={()=>clickEvent &&clickEvent()} className={classNames&&classNames}>
   <i className={icon}></i>
   <small className='graytext' style={{transition: 'all 0.3s'}}>{text}</small>
  </El>
}
export default Element