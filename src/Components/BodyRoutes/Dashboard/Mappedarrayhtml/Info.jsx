import React from 'react'
import Circlebar from '../../../Circlebar/Circlebar'
import Element from '../../../Themebtn/Element'

function Info(props) {

  const {type} = props
  return <div className={type.circle?'flexcenter':''}>
 {!type.circle?<> <Element El='p' text={type.text}/>
  <strong>{type.length}</strong>
  </>:
  <Circlebar percentage={type.length} increase text='Hire Rate'/>
  }
</div>
}
export default Info