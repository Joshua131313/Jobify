import React from 'react'
import { formatPhoneNumber } from '../../Job/Formatphone'
import Locationtext from '../../Locationinput/Locationtext'
import Element from '../../Themebtn/Element'
import './Aboutuser.css'
import Spacebetween from './Spacebetween'
function Aboutuser(props) {
  const {userinfo} = props
  return  <div className="aboutuser">
    <h3>User Info</h3>
    <Spacebetween text='Company Name:' type='companyname' userinfo={userinfo} icon='fal fa-building'/>
    <Spacebetween text='Company Description:' type='companydescrip' userinfo={userinfo} icon='fal fa-info-circle'/>

    <Spacebetween text='Email:' type='email' userinfo={userinfo} icon='fal fa-envelope'/>
    <div className="spacebetween">
    <span>
      <i className="fal fa-phone"></i>
      <span>
      Phone Number:
      </span>
    </span>
    <Element El='span' text={formatPhoneNumber(userinfo.phone)}/>
    </div>
    <Spacebetween text='Profession:' type='profession' userinfo={userinfo} icon='fal fa-user-tie'/>
    <div className="spacebetween">
      <span>
        <i className="fal fa-map-marker-alt"></i>
        <span>
        Adresss
        </span>
      </span>
      <Locationtext location={{lat: userinfo.lat, lng: userinfo.lng}}/>
    </div>
    <div className="spacebetween">
      <span>
        <i className="fal fa-file"></i>
        <span>
        CV:
        </span>
      </span>
      <a href={userinfo.cv} className='graytext' target='__blank'>CV</a>
    </div>
  </div>
}
export default Aboutuser