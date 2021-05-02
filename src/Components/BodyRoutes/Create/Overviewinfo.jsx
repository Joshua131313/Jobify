import React, { useState } from 'react'
import './Overviewinfo.css'
function Overviewinfo(props) {
  const {text,state, setState, number} = props
  const [edit, setEdit] = useState(false)
  return <div className="overviewinfo">
    <strong>{text}</strong>
    <input disabled={!edit} min={0}  type={(number)?'number':'text'} value={state} placeholder='Not Filled Out' onChange={e=>{setState(e.target.value)}}/>
   {!edit? <i className="fal fa-edit" onClick={()=>setEdit(true)}></i>:
    <i className='fal fa-save' onClick={()=>setEdit(false)}></i>
  }
  </div>
}
export default Overviewinfo