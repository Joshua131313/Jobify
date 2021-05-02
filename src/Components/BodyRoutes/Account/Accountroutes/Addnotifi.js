import Element from "../../../Themebtn/Element"

export   function addNotification(parameters, time=7, position='tr'){
  const options = parameters
   const notification = parameters.notificationsystem.current
 notification &&  notification.addNotification({
     message:  <> 
      <div>
      <i className={options.icon}></i> 
       <Element El='strong' text={options.msg} />
       {options&&options.button}
      </div>
       <i className='fal fa-times'></i>  
      </> ,
     level: 'warning',
     position:  position,
     autoDismiss: time
   })
 }