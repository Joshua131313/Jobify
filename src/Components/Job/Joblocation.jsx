import React from 'react'
import Wrappedmap from '../Website/Search/Map/Wrappedmap'

function Joblocation(props) {

  const {joblocation} = props

  return <div className="joblocation">
      <Wrappedmap userslocation={joblocation}/>
  </div>
}
export default Joblocation