import React from 'react'
import './Icon.css'
function Icon(props) {
  const {icon, clickEvent, setState, state} = props

  return <i className={icon+ ' icon'} onClick={()=>{setState?.(state);clickEvent?.()}}></i>
}
export default Icon