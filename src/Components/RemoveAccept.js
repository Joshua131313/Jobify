import { db } from "../Fire";

export function Alterjobuserids(parameters, add) {
  const {alljobs, notification, removetype, addtype, removetypedate, addtypedate} = parameters
   console.log(parameters) 
   alljobs && alljobs.map(jobc=>{
    if(notification.jobid===jobc.jobid) {
     const jobindex = alljobs.indexOf(jobc)
     const root = alljobs[jobindex].applicants
     const editingarray = root[removetype]
     const editingdate = root[removetypedate]
     const editingarray2 = root[addtype]
     const editingdate2 = root[addtypedate]
     const userindex = editingarray.indexOf(notification.senderid)
  
     if(userindex > -1) {
        editingarray.splice(userindex, 1)
        editingdate.splice(userindex, 1)
        if(add) {
        editingdate2.push(new Date())
        editingarray2.push(notification.senderid)
        }
         db.collection('alljobs').doc('alljobs').update({
           jobs: alljobs
         })
     }
    }
  })
}
export function Adduseridtojob(parameters){
  const {alljobs} = parameters
  alljobs && alljobs.map(jobc=>{
  })
}