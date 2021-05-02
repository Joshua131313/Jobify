import React from 'react'
import Element from '../../Themebtn/Element'
import './Hrtitle.css'
function Hrtitle(props) {
  const {text} = props
  return <div className="hrtitle">
    <Element El='span' text={text} /> 
      <hr/>
  </div> 
}
export default Hrtitle