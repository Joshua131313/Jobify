import React from 'react'
import { Formatmoney } from './Formatmoney'
import Item from './Item'
import ReactTimeAgo from 'react-time-ago'
import { formatPhoneNumber } from './Formatphone'
function Jobinfo(props) {
  const {job} = props

  return <>
          <Item title={'Company Name:'} text={job && job.company}/>
        <Item title={'Salary:'} text={Formatmoney(job.wage)}/>
        <Item title={'Phone Number:'} text={job&& formatPhoneNumber(job.phone)}/>
        <Item title={'Email:'} text={job && job.email}/>
        <Item title={'Posted:'} text={
          <ReactTimeAgo date={job && job.created.toDate()}/>
        }/>
  </>
}
export default Jobinfo