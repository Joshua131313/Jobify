import React from 'react'
import ReactTimeAgo from 'react-time-ago'
import Element from '../../Themebtn/Element'
import './Specialbanner.css'
function Specialbanner(props) {
  const {img, type, jobs, text} = props
  return <div className="jobheader">
  
  <div className='webjobtitle'>
     <div>
     <h2>{jobs?type.job:type.name}</h2>
         <span>
           <Element El='h3' text={text}/>
           {typeof type.created.toDate === 'function'&&
            <Element El='span' text={
              <ReactTimeAgo date={type && type.created.toDate()} />}
              />
            }
         </span> 
            {
              jobs &&
                 <span>
                 <Element El='h3' text={'Views:'}/>
                 <Element El='span' text={type.viewed.viewedby.length}/>
               </span>
              }
         </div>      
   </div>    
    <div className="sidebanner">
         <img src={img} alt=""/>
     </div>
   </div>
}
export default Specialbanner