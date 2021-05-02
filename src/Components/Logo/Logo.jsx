import React from 'react'
import { Link } from 'react-router-dom'
import './Logo.css'
function Logo(props) {
  const {notext} = props
  return <Link to='/website' className='nostyles'>
   <div className="logo">
    <img src={'https://i.imgur.com/pSLzx6i.jpg'} alt=""/>
  {!notext&&<h3>Jobify</h3>}
  </div>
  </Link>
}
export default Logo