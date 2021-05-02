import React, { useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import Element from '../Themebtn/Element'
import User from '../User/User'
import Dropdown from './Dropdown'

function Dropdownuser(props) {
  const {setDropdown, dropdown, list, handleLogout} = props
  
  useEffect(()=>{
    document.addEventListener('click', ()=>{
      setDropdown(false)
    })
  },[])

  return    <div id='dropdowncontainer' className="rightside">
  <User setDropdown={setDropdown}/>
  <CSSTransition in={dropdown} unmountOnExit timeout={300}  classNames='dropdown'>
    <Dropdown list={list} handleLogout={handleLogout}/>
  </CSSTransition>
</div>
}
export default Dropdownuser