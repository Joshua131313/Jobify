import React, { useState } from 'react'
import { HashLink } from 'react-router-hash-link'
import { addNotification } from '../../BodyRoutes/Account/Accountroutes/Addnotifi'
import Element from '../../Themebtn/Element'
import './Columns.css'
function Columns (props) {
  const {column, webnotifications, setBanner} = props
  const [expanded, setExpanded] = useState(false)
  
  function copyToClipBoard(e) {
    e.target.select()
    document.execCommand('copy')
    const parameters = {
      msg: 'Copied to clipboard!',
      icon: 'fal fa-copy',
      notificationsystem: webnotifications
    }
    addNotification(parameters)
  }
  return <div className="col">
      <div className='expandtitle' onClick={()=>setExpanded(!expanded)}>
      <h3>{column.title}</h3>      
      {!column.logo&&<i className={`fal fa-arrow-${expanded?'right transformed':'right'}`}></i>}
      </div>
      <div className={expanded?"expand expanded":'expand'}>
      {column.links?.map(link=>{
       return  <HashLink smooth to={link.link+'#top'}  onClick={()=>{link.img&&setBanner(link.img)}}>
              <div className='columnlinks' >
               {column.copy? <input className='linkcont' onClick={(e)=>{copyToClipBoard(e)}}  type="text" value={link.text} readOnly/>:
                <p className='linkcont'>{link.text}</p>
              }
              </div> 
             </HashLink>
           })}
      </div>
 </div>
}

export default Columns