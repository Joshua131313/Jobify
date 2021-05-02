import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import {  ChartPie,ChartDonut ,ChartThemeVariant, ChartThemeColor, ChartLine, ChartArea} from '@patternfly/react-charts';

export default function MyChart(props) {
  const {data} = props
  const [points, setPoints] = useState([])
  const [length, setLength] = useState(0)
  const [chartdata, setChartdata] = useState({
    options: {
      chart: {
        id: 'Chart'
      }
    }
  })
    useEffect(()=>{
       var dates = data
      const days = ['Sunday','Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 
      'Saturday' ]
      
      var daysOfWeek =dates&& dates.map(el=>{
        return days[el.toDate().getDay()];
      });
      
      var counts = {};
      daysOfWeek&& daysOfWeek.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
      setPoints(counts)
      setLength((counts.Sunday?counts.Sunday:0)+(counts.Monday?counts.Monday:0)+(counts.Tuesday?counts.Tuesday:0)+(counts.Wednesday?counts.Wednesday:0)+(counts.Thursday?counts.Thursday:0)+(counts.Friday?counts.Friday:0)+(counts.Saturday?counts.Saturday:0))

    },[data])
  return (
    <div className='chartcontainer' style={{ height: '245px', width: '375px' }}>
   <ChartDonut
    
    ariaDesc="Average number of views of all your jobs"
    ariaTitle="Chart"
    constrainToVisibleArea={true}
    data={[
      { x: 'Sunday', y: points.Sunday?(points.Sunday*100/length):0 }, 
      { x: 'Monday', y: points.Monday?(points.Monday*100/length):0 }, 
      { x: 'Tuesday', y: points.Tuesday?(points.Tuesday*100/length):0 },
      { x: 'Wednesday', y: points.Wednesday?(points.Wednesday*100/length):0 },
      { x: 'Thursday', y: points.Thursday?(points.Thursday*100/length):0 },
      { x: 'Friday', y: points.Friday?(points.Friday*100/length):0 },
      { x: 'Saturday', y: points.Saturday?(points.Saturday*100/length):0 },
    ]}
    labels={({ datum }) => `${datum.x}: ${datum.y}%`}
    themeColor={ChartThemeColor.blue}
    legendData={[
      { name:  `Sunday ${+points.Sunday?points.Sunday:0}`}, 
      { name:  `Monday ${points.Monday?points.Monday:0}`  }, 
      { name:  `Tuesday ${points.Tuesday?points.Tuesday:0 }`},
      { name: `Wednesday ${points.Wednesday?points.Wednesday:0 }`},
      { name:  `Thursday ${points.Thursday?points.Thursday:0}` },
      { name: `Friday ${points.Friday?points.Friday:0}` },
      { name: `Saturday ${points.Saturday?points.Saturday:0}` },
    ]}
    legendOrientation="vertical"
    legendPosition="right"
    padding={{
      bottom: 20,
      left: 20,
      right: 140, // Adjusted to accommodate legend
      top: 20
    }}
    subTitle="Average Views"
    title={length}
    width={350}
  />
    </div>
  )
}
