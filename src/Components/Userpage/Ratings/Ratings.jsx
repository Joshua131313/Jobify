import React, { useState } from 'react'
import './Ratings.css'
import Rating from '@material-ui/lab/Rating'
import firebase from 'firebase'
import { db } from '../../../Fire'
function Ratings(props) {
  const {currentuserrating, readOnly, userratings, userid} = props
  const currentuser = firebase.auth().currentUser 

  function updateUserRating(value) {
    userratings && userratings.map(rating=>{
          if(rating.userid === currentuser.uid) {
            const ratingindex = userratings.indexOf(rating)
            userratings[ratingindex].rating = value
            db.collection('users').doc(userid).update({
              ratings: userratings
            })
          }
        else {
          db.collection('users').doc(userid).update({
            ratings: firebase.firestore.FieldValue.arrayUnion({
              rating: value, 
              userid: currentuser.uid
            })
          })
        }
    })
  }
  return <div className="ratings">
        <Rating
          size='small'
          name="simple-controlled"
          value={currentuserrating}
          onChange={(event, newValue) => {
            updateUserRating(newValue)
          }}
          precision={0.5}
          readOnly={readOnly}
        />

  </div>
}
export default Ratings