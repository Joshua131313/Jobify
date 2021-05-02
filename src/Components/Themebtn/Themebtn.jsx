import React from 'react'
import './Themebtn.css'
function Themebtn(props) {
  const {disabled,clickEvent, text, extraStyle, classNames, icon, warning} = props

  return  <button 
            disabled={disabled}
            className={warning?`${classNames} themeBtn warning`:`${classNames} themeBtn`}
            style={extraStyle}
            onClick={()=>clickEvent?.()}
            >
           <i className={warning?'fal fa-exclamation-circle':icon}></i>
           <span>{warning?"Fill out the inputs...":text}</span>
          </button>
}
export default Themebtn