import React from 'react'
import { HashLink as Link } from 'react-router-hash-link'

function Boxes(props) {

  const {type} = props
 
  return <Link className='box' smooth to={`/dashboard${type.link}`}>
  <i className={type.icon}></i>
  <div>
    <strong>{type.text}</strong>
  </div>
  <div>
    <h3>{type.length}</h3>
  </div>
</Link>
}
export default Boxes