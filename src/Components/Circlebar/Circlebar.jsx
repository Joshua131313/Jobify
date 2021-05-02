import React, { useState } from 'react'
import './Circlebar.css'
import { buildStyles, CircularProgressbarWithChildren  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Tooltip from '@material-ui/core/Tooltip';

function Circlebar(props) {

  const {percentage, text, increase, color, special} = props
  const [legend, setLegend] = useState(false)
  
  return <div className="circlecontainer">
      <div className="circle">
      <CircularProgressbarWithChildren  strokeWidth='5'  value={percentage} 
      styles={buildStyles({
          pathColor: color?color:'#399ff3',
        })}
        >
          <Tooltip arrow={true}  title={special?`The percent of your total ${text} from this job`:`Your increase in ${text} in the past 7 days.`} aria-label="add">
             <span style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
             <strong>
              {text}
             </strong>
              <small style={{marginTop: '5px'}}>{increase&&<i className='fal fa-arrow-up' style={{marginRight: '5px'}}></i>}{percentage+'%'}</small>
             </span>
          </Tooltip>
        </CircularProgressbarWithChildren >
      </div>
  </div>
}
export default Circlebar