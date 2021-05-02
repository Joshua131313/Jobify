import React from 'react'
import './Input.css'
function Color(props) {
  const {state, setState, text} = props

  return <div className="colorinputcontainer">
    <small>{text}</small>
    <input type="color" onChange={e=>setState(e.target.value)} value={state}/>
  </div>
}
export default Color