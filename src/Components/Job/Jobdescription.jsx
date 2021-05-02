import React from 'react'
import Highlightercomp from '../Highlighter/Highlightercomp'
import Element from '../Themebtn/Element'
import './Jobdescription.css'
function Jobdescription(props) {
  const {job, El='h3'} = props
  return  <div className="jobdescription">
  <Element El={El} text='Job Description'/>
  <ul>
  {job.descrip.split('-').filter(Boolean).map(x =>
     <li>
     <small><Highlightercomp text={x} /></small>
     </li>
  )}
  </ul>
</div>
}
export default Jobdescription
