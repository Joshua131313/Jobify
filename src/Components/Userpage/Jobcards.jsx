import React from 'react'
import Jobcard from '../Job/Jobcard'

function Jobcards(props) {
  const {array} = props
  return <div className="alljobs gridview">
  { array && array.map(job=>{
   return <Jobcard job={job} apply={true}/>
 })}
 </div>
}
export default Jobcards