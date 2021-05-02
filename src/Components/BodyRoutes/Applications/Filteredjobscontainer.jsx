import React, { useContext } from 'react'
import { ContextApp } from '../../../ContextAPI'
import Element from '../../Themebtn/Element'
import Themebtn from '../../Themebtn/Themebtn'

function Filteredjobscontainer(props) {
  const {html, text, classNames, id, icon, gridviewauto} = props
  const {gridview} = useContext(ContextApp)

  return    <div className="recenttitle flat" id={id}>
    <div className="title">
      <Element El='h2' text={text} />
      <i className={icon}></i>
    </div>
  <div className={`alljobs flat ${(gridview || gridviewauto)?'gridview':''} ${classNames?classNames:''}`}>
    {html}
  </div>
</div>
}
export default Filteredjobscontainer