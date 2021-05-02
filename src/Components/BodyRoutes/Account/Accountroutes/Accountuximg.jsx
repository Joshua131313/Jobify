import React from 'react'
import './Accountuximg.css'
function Accountuximg(props) {
  const {img, left} = props

  return <img style={left?{left: 0, transform: 'translateX(0)', height: '130px'}:{}} src={img} className='accountuximg' alt=""/>
}
export default Accountuximg