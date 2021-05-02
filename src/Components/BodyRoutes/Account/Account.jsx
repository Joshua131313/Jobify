import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import User from '../../User/User'
import './Account.css'
import Accountlink from './Accountcomponents/Accountlink'
import Accounttab from './Accountroutes/Accounttab'
import Company from './Accountroutes/Company'
import Customizaton from './Accountroutes/Customization'
import Notifications from './Accountroutes/Notifications'
function Account() {

  const links = [
    {
      link: '/dashboard/account/',
      text: 'Account',
      icon: 'fal fa-sliders-h-square',
      exact: true,
      html: <Accounttab />
    }, 
    {
      link: '/dashboard/account/company',
      text: 'Company',
      icon: 'fal fa-briefcase',
      html: <Company />
    },
    {
      link: '/dashboard/account/customization',
      text: 'Customization',
      icon: 'fal fa-paint-brush',
      html: <Customizaton />
    },
    {
      link: '/dashboard',
      text: 'Dashboard',
      icon: 'fal fa-th',
      exact: true,
    },
    {
      link: '/website',
      text: 'Home',
      icon: 'fal fa-home'
    }
  ]

  const accountlinksrow = links?.map(link=>{
    return <Accountlink icon={link.icon} exact={true} link={link.link} text={link.text} />
  })
  const accountroutes = links?.map(link=>{
    return <Route exact path={link.link}>
        <h2 className='tabtitle'>
          <span>{link.text}</span> 
           {(link.text==='Account'||link.text==='Company')&&<User dashboard={link.text==='Company'}/>}
           {link.text==='Customization'&&<div className='color'></div>}
        </h2>
        {link.html}
    </Route>
  })

  return <div className="account">
    <div className="accountsidebar">
      <div className="accounttitle">
        <h2>Settings</h2>
      </div>
      <div className="accountlinks">
        {accountlinksrow}
      </div>
      <div className="uximg">
        <img src="https://i.imgur.com/I8trDF3.png" alt=""/>
      </div>
    </div>
    <div className="accountwindow">
      <Switch>
         {accountroutes}
      </Switch>
    </div>
  </div>
}
export default Account