import React, { useState } from 'react'
import Input from '../Input/Input'
import Locationinput from '../Locationinput/Locationinput'
import Select from '../Select/Select'
import Textarea from '../Textarea/Textarea'
import Element from '../Themebtn/Element'
import Themebtn from '../Themebtn/Themebtn'

function Jobinfoinputs(props) {
  const {
       jobtitle, setJobtitle, 
       descrip, setDescrip, 
       wage, setWage, 
       phone, setPhone, 
       email, setEmail,
       cover, setCover,
       logo, setLogo,
       uselogo, usecompanylocation,
       setUsecompanylocation,
       location, setLocation,
       deleteJob, updateJob,
       category, setCategory
      } = props
      const [selected, setSelected] = useState(false)

  return <>
           <Element El='h2' text='Job Info'/>
          <Input state={jobtitle} setState={setJobtitle} text='Job'/>
          <Textarea state={descrip} setState={setDescrip} text='Job Description'/>
          <Select category={category} setCategory={setCategory} state={selected} setState={setSelected}/>
          <Input state={wage} setState={setWage} text='Wage (per hour)'/>
          <Element El='h2' text='Contact Info'/>
          <Input state={phone} setState={setPhone} text='Phone Number'/>
          <Input state={email} setState={setEmail} text={'Email'}/>
          <Input state={cover} setState={setCover} text={'Cover Image'}/>
          <Input state={logo} disabled={uselogo} setState={setLogo} text='Logo'/>
          <Locationinput state={location}  setState={setLocation} disabled={usecompanylocation}/>
        <div className='btndiv'>
        <Themebtn classNames='fullwidth' text={usecompanylocation?"Don't Use Company Location":"Use Company Location"} clickEvent={()=>setUsecompanylocation(!usecompanylocation)}/>
        </div>
         <div className="btnscontainer">
          <Themebtn text='Delete' icon='fal fa-trash' classNames='warning' clickEvent={()=>deleteJob()}/>
          <Themebtn text='Save' icon='fal fa-save' clickEvent={()=>{updateJob()}}/>
         </div>
  </>
}
export default Jobinfoinputs