import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './Banner.css'
function Banner(props) {
  const {img} = props


  return <div className={"banner "}>
    <img src={img} alt=""/>
  </div>
}   
export default Banner