import { useEffect, useState } from "react"
import Charts from "react-apexcharts"
import './Chart.css'
function Apexchart(props) {

  const {type, title1, title2, opts, data, data2, series1, types} = props
  const [points, setPoints] = useState({})
  const [secondpoints, setSecondpoints] = useState({})
  const [charttype, setCharttype] = useState('area')
  const days = ['Sunday','Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 
  'Saturday' ]
  const typesrow = types?.map(type=>{
    return <section className={`type ${type===charttype?'activetype':''}`} onClick={()=>setCharttype(type)}>
      <i className={`fal fa-chart-${type}`}></i>
      <span style={{textTransform: 'capitalize'}}>{type}</span>
    </section>
  })
  const options = {
    chart: {
      height: '100%',
      id: 'area',
      toolbar: {
        show: false,
        tools: {
          zoom:false,
          pan: false,
          reset: false,
          zoomin: false,
        }
      }
    },
    dataLabels: {
      enabled: true
    },
    xaxis: {
        categories: days,
    },
    yaxis: [
      {
        labels: {
          formatter: function (val){
            return parseFloat(val).toFixed(0)
          }
        }
      }
    ],
    stroke: {
      curve: charttype==='line'?'straight':'smooth'
    },
    fill: {
      opacity: 0.5,
  
    },
    markers: {
      size: 5,
      hover: {
        size: 9
      }
    },
    legend: {
      position: 'top'
    },
    grid: {
      show: false,
      padding: {
        top: 10,
        right: 0,
        bottom: 0,
        left: 15
    },  
    },
    responsive: [{
      breakpoint: 100,
      options: {
        chart: {
          width: '100%',
          height: '100%',
        },

      }
    }]
  }
  const series0 = [
    {
      name: title1,
      data: [ 
        points.Sunday??0, 
        points.Monday??0, 
        points.Tuesday??0, 
        points.Wednesday??0, 
        points.Thursday??0, 
        points.Friday??0, 
        points.Saturday??0
      ]
    },
  ]
  
  const series = [
    {
      name: title1,
      data: [ 
        points.Sunday??0, 
        points.Monday??0, 
        points.Tuesday??0, 
        points.Wednesday??0, 
        points.Thursday??0, 
        points.Friday??0, 
        points.Saturday??0
      ]
    },
    {
      name: title2,
      data: [
        secondpoints.Sunday??0,
        secondpoints.Monday??0,
        secondpoints.Tuesday??0,
        secondpoints.Wednesday??0,
        secondpoints.Thursday??0,
        secondpoints.Friday??0,
        secondpoints.Saturday??0,
      ]
    }
    
  ] 

  useEffect(()=>{
    var dates = data

    
    var daysOfWeek =dates&& dates.map(el=>{
      return days[el.toDate().getDay()];
    });
    
    var counts = {};
    daysOfWeek&& daysOfWeek.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
    days.forEach(item => {
      if(!Object.keys(counts).includes(item)) {
        counts[item] = 0;
      }
   });
    setPoints(counts)
    var sdates = data2

    
    var sdaysOfWeek =sdates&& sdates.map(el=>{
      return days[el.toDate().getDay()];
    });
    
    var scounts = {};
    sdaysOfWeek&& sdaysOfWeek.forEach(function(x) { scounts[x] = (scounts[x] || 0)+1; });
    days.forEach(item => {
      if(!Object.keys(scounts).includes(item)) {
        scounts[item] = 0;
      }
   });
    setSecondpoints(scounts)
  },[data, data2])

    return <div className="chart">
     <section className="typescontainer">
       <h3>{props.title}</h3>
      <div>
      {typesrow}
      </div>
     </section>
      <Charts options={options} series={series1?series0:series} type={charttype}/>
     </div> 
}
export default Apexchart