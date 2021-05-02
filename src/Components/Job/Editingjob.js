import { db } from "../../Fire"
import firebase from 'firebase'
import { addNotification } from "../BodyRoutes/Account/Accountroutes/Addnotifi"
const check = 'fal fa-check-circle'
const exclamation = 'fal fa-exclamation-circle'
export function updateJobHelper(
    alljobs, 
    job, 
    oldcover,
    jobtitle, 
    cover, 
    descrip, 
    uselogo, 
    companylogo, 
    logo, 
    email, 
    phone,
    usecompanylocation,
    location,
    notificationsystem,
    category
    ){

    alljobs && alljobs.map(jobm=>{
        if(jobm.jobid===job.jobid){
          const index = alljobs.indexOf(jobm)
          alljobs[index].job = jobtitle
          alljobs[index].cover = cover
          alljobs[index].descrip = descrip
          alljobs[index].logo = uselogo?companylogo:logo
          alljobs[index].email = email
          alljobs[index].phone = phone
          alljobs[index].category = category
          alljobs[index].usecompanylogo = uselogo
          alljobs[index].usecompanylocation = usecompanylocation
          alljobs[index].lat = location.lat
          alljobs[index].lng = location.lng
          db.collection('alljobs').doc('alljobs').update({
            jobs: alljobs
          }).then(()=>{
            const parameters = {
              msg: 'Job successfully updated!',
              icon: check,
              notificationsystem
            }
            addNotification(parameters)
          }).catch(()=>{
            const parameters = {
              msg: 'Something is wrong...',
              icon: exclamation,
              notificationsystem
            }
            addNotification(parameters)

          })
     
        }
    })
  } 
export  function bookmarkHelper(alljobs, type, job, user, notificationsystem){
  if(type==='add') {
    alljobs && alljobs.map(jobm=>{
      if(jobm.jobid===job.jobid){
        const index = alljobs.indexOf(jobm)
        alljobs[index].savedby.push(user.uid)
        db.collection('alljobs').doc('alljobs').update({
          jobs: alljobs
        }).then(()=>{
          const parameters = {
            msg: 'Bookmarked!',
            icon: 'fas fa-bookmark',
            notificationsystem
          }
          addNotification(parameters)
        }).catch(()=>{
          const parameters = {
            msg: 'Something is wrong...',
            icon: exclamation,
            notificationsystem
          }
          addNotification(parameters)
        })
      }
     })
     
  } 
  else {
    alljobs && alljobs.map(jobm=>{
      if(jobm.jobid===job.jobid){
        const index = alljobs.indexOf(jobm)
         alljobs[index].savedby.filter(x=>x===user.uid).forEach(el=>{
            let itemindex = alljobs[index].savedby.indexOf(el)
            alljobs[index].savedby.splice(itemindex, 1)
         })
        db.collection('alljobs').doc('alljobs').update({
          jobs: alljobs
        }).then(()=>{
          const parameters = {
            msg: 'Unbookmarked!',
            icon: 'fal fa-bookmark',
            notificationsystem
          }
          addNotification(parameters)
        }).catch(()=>{
          const parameters = {
            msg: 'Something is wrong...',
            icon: exclamation,
            notificationsystem
          }
          addNotification(parameters)
        })
      }
     })
  }
  
}
export function deleteJobHelper(alljobs, job, notificationsystem) {
  let confirmdelete = window.confirm(`Are you sure you want to delete ${job.job}`)

  if(confirmdelete) {
    alljobs && alljobs.map(jobm=>{
      if(jobm.jobid===job.jobid){
        const index = alljobs.indexOf(jobm)
        alljobs.splice(index, 1)
        db.collection('alljobs').doc('alljobs').update({
          jobs: alljobs
        }).then(()=>{
          const parameters = {
            msg: 'Deleted!',
            icon: 'fal fa-trash',
            notificationsystem
          }
          addNotification(parameters)
        }).catch(()=>{
          const parameters = {
            msg: 'Something is wrong...',
            icon: exclamation,
            notificationsystem
          }
          addNotification(parameters)
        })
      }
    })
  }
}