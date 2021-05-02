import React from 'react'
import Element from '../../../Themebtn/Element'

function Numcont(props) {
  const {type} = props
  return <div>
  <span> 
    <strong>{type.length}</strong>
    <i className={type.icon}></i>
  </span>
  <Element El='p' text={type.text}/>    
    
</div>
}
export default Numcont