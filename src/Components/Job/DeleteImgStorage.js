import firebase from 'firebase'
export function DeleteImgFromStorage(url) {

if(url.includes('https://firebasestorage.googleapis.com/v0/b/jobify-a7a4a.appspot.com/o')){
  firebase.storage().refFromURL(url).getDownloadURL().then(exists, dne)
  function exists(foundUrl) {
    firebase.storage().refFromURL(foundUrl).delete()
  }
  function dne(error){
  }
}
}