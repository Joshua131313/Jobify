import React, {createContext, useState, useEffect, useRef} from 'react'
import firebase from 'firebase'
import { db } from './Fire'
import { differenceInDays } from './Differenceintime'
export const ContextApp = createContext()

  const ContextAppProvider = (props) =>{
  const user = firebase.auth().currentUser
  const [darkmode, setDarkmode] = useState(false)
  const [themecolor, setThemecolor] = useState(false)
  const [userinfo, setUserinfo] = useState({})
  const [gridview, setGridview] = useState(false)
  const [hidenav, setHidenav] = useState(false)
  const [notifi, setNotifi] = useState({
    text: '',
    icon: ''
  })
  const [companyinfo, setCompanyinfo] = useState({})
  const [keyword, setKeyword] = useState('')
  const pattern = new RegExp('\\b' + keyword.replace(/[^a-zA-Z0-9 ]/g, ""), 'i')
  const [userjobs, setUserjobs] = useState([])
  const [notifibool, setNotifibool] = useState(false)
  const [activity, setActivity] = useState('')
  const [applications, setApplications] = useState({})
  const [views, setViews] = useState([])
  const [lastupdated, setLastupdated] = useState('')
  const currentdate = new Date()
  const differenceintime = differenceInDays(activity.lastdate)
  const differenceindays = differenceintime/(1000 * 3600 * 24) 
  const [savedjobs, setSavedjobs] = useState([])
  const [editc, setEditc] = useState(false)
  const notificationsystem = useRef()
  const [themesecond, setThemesecond] = useState('')
  const [notitype, setNotitype] = useState({
    accepted: 'Accepted',
    hired: 'Hired',
    rejected: 'Rejected',
    applied: 'Applied'
  })
  const [allusers, setAllusers] = useState([])
  const [scrolled, setScrolled] = useState(false)
  useEffect(()=>{
    if(user) {
      db.collection('users').doc(user.uid).onSnapshot(snap=>{
        const userdata = snap.data()
        setUserinfo(userdata.userinfo)
        setCompanyinfo(userdata.companyinfo)
        setThemecolor(userdata.customization.themecolor)
        setHidenav(userdata.customization.hidenav)
        setDarkmode(userdata.customization.darkmode)
        setGridview(userdata.customization.gridview)
        setActivity(userdata.activity)
        setApplications(userdata.applications)
        setViews(userdata.views)
        setThemesecond(userdata.customization.themesecond) 
      }) 


      const currendate = new Date()
     if(currendate.getDay()===2&& (differenceInDays(lastupdated))>1){
       db.collection('users').doc(user.uid).update({
         views: {
          lastdate: new Date(),
          lastupdated: new Date(),
          viewdates: []
         }
       })
     }


    }
    db.collection('allusers').doc('allusers').onSnapshot(snap=>{
      const allusersdata = snap.data()
      setAllusers(allusersdata.users)
    })
  },[user])

  return (
    <ContextApp.Provider 
      value={{user,gridview,
      hidenav, setHidenav,
      setGridview,
      userinfo,darkmode,
      setDarkmode, themecolor,
      setThemecolor, notifi, setNotifi,
      setNotifibool, notifibool,
      keyword, setKeyword, pattern,
      userjobs, setUserjobs, companyinfo, 
      setCompanyinfo, views, applications, activity,
      differenceindays, editc, setEditc,
      notificationsystem, themesecond,
      notitype, scrolled, setScrolled,
      setAllusers, allusers,
    }}>
      {props.children}
    </ContextApp.Provider>
  )
}
export default ContextAppProvider