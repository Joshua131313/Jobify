import React, { useContext } from 'react'
import { ContextApp } from '../../../ContextAPI'
import Dropdownuser from '../../Dropdown/Dropdownuser'

function Nav(props) {
  const { links, dropdown, setDropdown} = props
  const {keyword, setKeyword} = useContext(ContextApp) 
  return  <section className="header" >
    <div id="top" style={{position: 'absolute',top: '-100vh'}}></div>
  <div className="searchbar">
    <i className="fal fa-search"></i>
   <input value={keyword} type="text" onChange={e=>setKeyword(e.target.value)}/>
  </div>
 <Dropdownuser list={links} dropdown={dropdown} setDropdown={setDropdown}/>
 </section>
}
export default Nav