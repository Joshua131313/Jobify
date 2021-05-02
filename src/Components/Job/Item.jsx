import React from 'react'
import Element from '../Themebtn/Element'

function Item(props) {
  const {title, text, el} = props

  return <div className="item">
    <strong>{title}</strong>
    <Element text={text} El={el?el:'span'} />
  </div>
}
export default Item