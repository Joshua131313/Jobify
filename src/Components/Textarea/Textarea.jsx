import React, { useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import './Textarea.css'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ReactTooltip from 'react-tooltip'
import { Tooltip } from '@material-ui/core';
import { addNotification } from '../BodyRoutes/Account/Accountroutes/Addnotifi';
 
function Textarea(props) {
  const tipref = useRef()
  const {state, setState, text, readonly, notificationsystem} = props
  const [copied, setCopied] = useState(false)
  function copyFunc(){
    addNotification({
      notificationsystem,
      msg: 'Copied to clipboard!',
      icon: 'fal fa-copy'
    })
    setCopied(true)
    setTimeout(()=>{
      setCopied(false)
    },3000)
  }

  return  <div>
      <CopyToClipboard text={state} onCopy={()=>copyFunc()}>
       <Tooltip arrow={true} placement='bottom' title={copied?'Copied':'Copy'}>
         <TextareaAutosize ref={tipref} data-tip={copied?'Copy':'Copied' } readOnly={readonly} required className='resizabletextarea' onChange={(e)=>setState?.(e.target.value)} value={state}/>
       </Tooltip>
      </CopyToClipboard>
      <span>{text}</span>
    </div>   


}
export default Textarea