import React from 'react'
import './Option.css'
function Option(props) {
  const {option,icon, text, category, setCategory} = props
  
  function configureOptions(option,e){
    if(e.target.checked){
      setCategory(prev=>[...prev, option.text]) 
    } 
    else {
      const index = category.indexOf(option.text)
      setCategory(category.filter((_, i) => i !== index))
    }
  }

  return <>
  <label className='box'>

      <div className={category?.includes(option.text)?"filteritem included":'filteritem'} >
          <input type="checkbox" checked={category?.includes(option.text)} onChange={(e)=>configureOptions(option,e)} style={{display: 'none'}}/>
          <i className={icon}></i>
          <span>{text}</span>
      </div>

  </label>
  </>
}
export default Option