import React from 'react'
import './Input.css'
function Input(props) {
  const {title,setIconstate,icon,state, setState, number, text, setState2, setState3, placeholder, password, focused, disabled, iconFunction, setDisabled} = props

  return<label className='themeLabel'>
   <input
    disabled={disabled}
    autoFocus={focused}
    onFocus={()=>{setState3 && setState3(true)}} 
    onClick={()=>{setState2 && setState2(true)}}
    className='themeInput' 
    type={number?"number":password?'password':'text'} 
    value={state} 
    required
    onChange={(e)=>{setState(e.target.value);setState2 && setState2(false); setDisabled && setDisabled(true)}} 
    min='0'
    placeholder={placeholder&&placeholder}
    />
    <span>{text}</span>
    <i className={icon&&icon} title={title&&title} onClick={()=>{setIconstate && setIconstate(prev=>!prev); iconFunction && iconFunction(state)}}></i>
    </label>
}
export default Input