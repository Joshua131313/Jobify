import React, { useContext, useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { ContextApp } from '../../../ContextAPI'
import Dropdown from '../../Dropdown/Dropdown'
import Dropdownuser from '../../Dropdown/Dropdownuser'
import Logo from '../../Logo/Logo'
import User from '../../User/User'
import { links } from '../Links'
import './Navbar.css'
import NavbarLink from './NavbarLink'
function Navbar(props){ 
  const {handleLogout, setBanner} = props
  const [dropdown, setDropdown] = useState(false)
  const {scrolled, setScrolled, user} = useContext(ContextApp)
  
  
  const list = [
    {
    text: 'Navigate',
    title: true
  },  
   {
    text: 'Home',
    icon: 'fal fa-home',
    link: '/website',
  },
  {
    text: 'My Account',
    icon: 'fal fa-user',
    link: '/dashboard/account',
  },
  {
    text: 'Dashboard',
    icon: 'fal fa-th',
    link: '/dashboard',

  },
  {
      logout: true,
      text: 'Logout',
      icon: 'fal fa-sign-out-alt',
  },
]
  const linksrow = links?.map(link=>{
    return <NavbarLink exact={link.exact} setBanner={setBanner} text={link.text} img={link.img} link={!(link.checkuser && !user)?link.link:'/login'}/>
  })
  function vh(v) {
    var h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    return (v * h) / 100;
  }
  function handleScroll(){
    if (window.scrollY > vh(30)) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }
  useEffect(()=>{
    window.addEventListener("scroll", handleScroll);
  },[])
  return <>
  <div id="top" ></div>
  <div className={scrolled?"navbar scrolled":'navbar'}>
    <div className="leftside" onClick={()=>setBanner('https://i.imgur.com/YKM0cyU.png')}>
      <Logo />
    </div>
    <div className="midside">
      {linksrow}
    </div>
    <Dropdownuser handleLogout={handleLogout} setDropdown={setDropdown} list={list} dropdown={dropdown}/>
  </div>
  </>
}
export default Navbar