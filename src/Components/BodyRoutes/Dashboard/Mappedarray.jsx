import React, { useContext } from 'react'
import { HashLink as Link} from 'react-router-hash-link'
import { ContextApp } from '../../../ContextAPI'
import Defaultmsg from '../../Defaultmsg/Defaultmsg'
import { useLocation } from 'react-router-dom'
function Mappedarray(props) {
  const {array, reverse} = props
  const {pattern} = useContext(ContextApp)
  const location = useLocation()
  const lnk =location.pathname.slice(1, location.pathname.length)
  const options = ['text', 'job', 'wage', 'descrip']
  const filteredarray = array
  ?.filter(type => (
    options.some(el=>pattern.test(type[el]))
 )) 
 .map(type => props.children({
  type: type
 }))
 const arrayrow = filteredarray?.length? (reverse?filteredarray.reverse():filteredarray): <section className="flexed"><Defaultmsg icon='fal fa-exclamation-circle' text='Nothing found...' link={lnk}/></section>

  return <>{arrayrow}</>
}
export default Mappedarray