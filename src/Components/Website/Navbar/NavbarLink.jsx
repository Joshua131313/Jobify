import React from 'react'
import { NavLink } from 'react-router-dom'

function NavbarLink(props) {
  const {link, text, setBanner, img, exact} = props

  return <NavLink exact={exact} onClick={()=>setBanner(img)} to={link} activeClassName='activelink'>
    {text}
  </NavLink>
}
export default NavbarLink