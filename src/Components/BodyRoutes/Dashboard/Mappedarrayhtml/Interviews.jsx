import React, { useContext, useEffect, useState } from 'react'
import { ContextApp } from '../../../../ContextAPI'
import User from '../../../User/User'

function Interviews(props) {
  const {job, alljobs} = props
  const {user} = useContext(ContextApp)
  const [month, setMonth] = useState('')
  const [usersid, setUsersid] = useState(job.userid)
  const [monthday, setMonthday] = useState('')
  useEffect(()=>{
    if(user) {
      const timeindex = job.applicants.accepted.indexOf(user.uid)
      setMonth(job && job.applicants.interviewdates[timeindex].toDate().toLocaleString('default', {month: 'long'}))
      setMonthday(job && job.applicants.interviewdates[timeindex].toDate().getDate())
      setUsersid(job.creatorid)
    }
  },[job, user])

  return <div className='interview'>
  <User job={job} link={`/website/job/${job.jobid}`} listing listinglink={true}/>
   <div className="date">
   <span> {month}</span>
   <strong>{monthday}</strong>
    </div>

</div>
}
export default Interviews