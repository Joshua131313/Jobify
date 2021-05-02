export function differenceInDays(date) {
  const currentdate = new Date()
  if(typeof date ==='object'){
    return ((currentdate.getTime() - date?.toDate().getTime())/(3600*1000*24))
  }
}