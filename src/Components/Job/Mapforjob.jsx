import React from 'react'
import Element from '../Themebtn/Element'
import Individmap from '../Website/Search/Map/Individmap'

function Mapforjob(props) {
  const {job, userslocation, joblocation, setJoblocation} = props

  return    <div className="mapcontdashboard">
  <Element El='h2' text='Job Location' />
  <div className="split">
  <Individmap userslocation={userslocation} destination={joblocation} setDefaultCenter={setJoblocation} defaultCenter={joblocation}/>
  <img src="https://i.imgur.com/60DRoQl.png" alt=""/>
  </div>
  </div>
}
export default Mapforjob