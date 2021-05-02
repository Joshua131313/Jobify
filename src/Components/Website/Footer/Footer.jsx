import React, { useContext } from 'react'
import { HashLink as Link} from 'react-router-hash-link'
import Logo from '../../Logo/Logo'
import Columns from './Columns'
import './Footer.css'
import Accountuximg from '../../BodyRoutes/Account/Accountroutes/Accountuximg'
import Element from '../../Themebtn/Element'
import Icon from '../../Icon/Icon'
import './Socialicon.css'
import { links } from '../Links'
import firebase from 'firebase'
function Footer(props) {
  const {webnotifications, setBanner} = props
  const user = firebase.auth().currentUser

  const columns = [
    {
      title: <> <Logo /> </>,
      logo: true
    },
    {
      title: 'Services',
      links
    },
    {
      title: 'Contact Jobify',
      links: [
        { text: '(514) 176-5623',link:'/website/contact'},
        { text: 'jobify@job.com', link: '/website/contact'}
      ],
      copy: true
    },
    {
      title: 'Jobify Website',
      links: [
       {text: 'Privacy Policy',link: '/website/privacy'},
       {text: 'Terms and Conditions', link: '/website/terms'},
       {text:  'Dashboard', link: user?'/dashboard':'/login'},
       {text:  'Learn More', link: '/website/about'}
      ]
    }
  ]
  const socialicons = [
    {text: 'Facebook', icon: 'fab fa-facebook'},
    {text: 'Instagram', icon: 'fab fa-instagram'},
    {text: 'Twitter', icon: 'fab fa-twitter'},
    {text: 'Pinterest', icon: 'fab fa-pinterest'},
  ]

  const columnsrow = columns?.map(column=>{
    return <Columns setBanner={setBanner} column={column} webnotifications={webnotifications}/>
  })
  const socialiconsrow = socialicons?.map(icon=>{
    return <Icon icon={icon.icon+' socialicon'}/>
  })
  return <div className="footer">
      <div className="footergrid">
          {columnsrow}
      </div>
      <div className="bottomcontent">
        <div className="rightsreserved">
          <Element El='span' text='All Rights Reserved Jobify 2021, made by TurtleDesigns'/>
        </div>
        <div className="socialicons">
          {socialiconsrow}
        </div>
      </div>
      <Accountuximg img='https://i.imgur.com/z8PimdM.png'/>
  </div>
}

export default Footer