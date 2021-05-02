import { db } from "../Fire";
export function Senduernotification(paramters, firebase) {
  const {type, jobid, senderid, receiverid} = paramters
  const notificationinfo = {
    type: type,
    jobid: jobid,
    senderid: senderid,
    date: new Date(),
    notificationid: db.collection('users').doc().id,
    disabled: false
  }
  db.collection('notifications').doc(receiverid).update({
    notifications: firebase.firestore.FieldValue.arrayUnion(notificationinfo)
  })
  
}
export function Deletenotification(notification, firebase){
  const user = firebase.auth().currentUser
  db.collection('notifications').doc(user.uid).update({
    notifications: firebase.firestore.FieldValue.arrayRemove(notification)
  })
}