import React, { useEffect, useState } from 'react'
import { CSSTransition, TransitionGroup } from "react-transition-group";
import './Select.css'
function Select (props) {
  const [state, setState] = useState(false)
  const { category, setCategory, icon, options, text} = props
  function configureOptions(el,e){
    if(e.target.checked){
      setCategory(prev=>[...prev, el])
    } else {
      const index = category.indexOf(el)
      setCategory(category.filter((_, i) => i !== index))
    }
    }
    const optionsrow = options?.map(el=>{
      return <label className="option">
        <input checked={category && category.some(x=>x===el.text)} type="checkbox" onChange={(e)=>{configureOptions(el.text,e)}}/>
        <p >{el.text}</p>
      </label>
    })

    useEffect(()=>{
      document.addEventListener('click', function (){
        setState(false) 
      })
    },[])
  return <>
  {state&&
  <div className="transparent" onClick={()=>setState(false)}></div>}
  
  <div className={category.length>=1?'selectlabel selected':'selectlabel'} style={{width: '100%'}} onClick={e=>e.stopPropagation()}>
      <div className="select" onClick={()=>setState(true)}>
              <p>{icon?<i className='fal fa-plus'></i>:category?`${text} ${category.length} ${(category.length>1||category.length<1)?'Items':'Item'}`:'Select'}</p>
        <CSSTransition in={state} timeout={300} classNames='options' unmountOnExit>
              <div className="options" >
              {optionsrow}
              </div>
        </CSSTransition>
      </div>
</div>
</>
}
export default Select