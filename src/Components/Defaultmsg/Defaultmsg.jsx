import React from 'react'
import { Link } from 'react-router-dom'
import Element from '../Themebtn/Element'
import './Defaultmsg.css'
function Defaultmsg(props) {
  const {icon, text, link} = props


  return <Link className='defaultmsg' to={`/${link}`}>
      <Element El='span' icon={icon} text={text} difcolor={true} styled='#fff' />
  </Link>
}
export default Defaultmsg