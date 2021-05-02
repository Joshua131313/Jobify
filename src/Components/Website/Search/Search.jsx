import React, { useContext, useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import Icon from '../../Icon/Icon'
import Input from '../../Input/Input'
import { options, salaries } from '../../Options'
import Select from '../../Select/Select'
import Element from '../../Themebtn/Element'
import Themebtn from '../../Themebtn/Themebtn'
import Wrappedmap from './Map/Wrappedmap'
import Option from './Option'
import './Search.css'
import Searchcont from './Searchcont/Searchcont'
import Geocode from "react-geocode";
import { db } from '../../../Fire'
import { ContextApp } from '../../../ContextAPI'
Geocode.setApiKey("AIzaSyC_kRll30Q2kyLh4ohCadNE4HRGbOP0GqA");

Geocode.setLanguage("en");

function Search(props) {
  const {
    userslocation, setUserslocation, 
    setKeyword, text, 
    category, setCategory, 
    radius, setRadius,
     jobs, setBanner, img,
    filterby} = props
  const {user} = useContext(ContextApp)
  const [selected, setSelected] = useState(false)
  const [search, setSearch] = useState(false)
  const [mapbool, setMapbool] = useState(false)
  const [adress, setAdress] = useState({
    postalcode: '',
    name: 'All Locations'
  })
  function removeItem(item) {
    const index = category.indexOf(item)
    setCategory(category.filter((_, i) => i !== index))
  }

  const optionsrow = options?.map(option=>{
    return <Option option={option} category={category} setCategory={setCategory} text={option.text} icon={option.icon}/>
  })
  const salariesrow = salaries?.map(salary=>{
    return <Option option={salary} category={category} setCategory={setCategory} text={salary.text} icon='fal fa-dollar-sign' />
  })

  const categoryrow = category?.map(item=>{
    return <div className="filtercategory">
      {filterby==='salary'
      &&
      <i className='fal fa-dollar-sign'></i>
      }
      {item}
      <Icon icon='fal fa-times' clickEvent={()=>removeItem(item)}/>
    </div>
  })
  const clearstyles = {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    color: 'var(--gray-text)',
    fontSize: '12px'
  }

  useEffect(()=>{
    setBanner(img)
    if(userslocation.lat!==null && userslocation.lng!==null) {
      Geocode.fromLatLng(userslocation.lat, userslocation.lng).then(
        (response) => {
          const address = response.results[0]?.formatted_address;
          const postalcode = response.results[0].address_components[7]?.long_name

          setAdress({
            postalcode: postalcode,
            name: address
          })
        },
      );
    }
    if(user) {
      db.collection('users').doc(user.uid).onSnapshot(snap=>{
        setCategory(snap.data()[filterby])
      })
    }

  },[userslocation, filterby])

  return <div className="search">
    <h3>{text}:</h3>
    <div className="filters">
      <div className="controls">
        <div className="inputsearch">
            <i className='fal fa-search'></i>
            <Input 
            placeholder={'Search...'} 
            setState={setKeyword}
            />
            <Icon icon='fal fa-plus filterplusicon' clickEvent={()=>setSelected(!selected)}/>
        </div>
        <div className="locations" id='locations'>
          <div className="divinput textoverflowing">
            <Element 
            El='span' 
            icon='fal fa-map-marker-alt' 
            text={radius===Infinity?'All Locations':adress.name}
            />
            <Icon 
            icon='fal fa-ellipsis-h-alt'
            clickEvent={()=>setMapbool(!mapbool)}
            />

          </div>
        </div>
      </div>
      <div className="filteritems">
        
          <div className="boxes">
            {filterby==='salary'?salariesrow:optionsrow}
          </div>
          <div className="filteritemsrow">
            {categoryrow}
            {
              category?.length>=1&&
              <div style={clearstyles} onClick={()=>setCategory([])}>
                Clear All
              </div>
            }
          </div>
          <CSSTransition in={selected} timeout={300}  classNames='filterscont'>
            <div className="filterscont">
              <Icon 
              icon='fal fa-times'  
              state={!selected} 
              setState={setSelected}
              />
            {filterby==='salary'?salariesrow:optionsrow}
            </div>
          </CSSTransition> 
       
      </div> 
  
    </div>
    {/* <CSSTransition unmountOnExit in={search} timeout={300} classNames='searchcont'>
              <Searchcont setState={setSearch}/>
    </CSSTransition> */}
    <CSSTransition in={mapbool} timeout={300} unmountOnExit classNames='map'>
              <Wrappedmap jobs={jobs} setUserslocation={setUserslocation} radius={radius} setRadius={setRadius} setMapbool={setMapbool} setAdress={setAdress} userslocation={userslocation}/>
    </CSSTransition>
  </div>
}

export default Search