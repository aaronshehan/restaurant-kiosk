import firebase from '@react-native-firebase/app'
import '@react-native-firebase/functions'
import '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

/* The call server function I use turns call server status
 from false to true in the data base.*/
export async function callServer (tableNumber) {
  console.log(tableNumber)
  let isSuccess
  let call = {
    tableNumber: tableNumber,
    callServer: true
  }

  firebase
    .firestore()
    .collection('CallServer')
    .doc(call.tableNumber)
    .update(call)
    .then(() => {
      isSuccess = true
    })
    .catch(error => {
      console.error('Error calling server.', error)
      isSuccess = false
    })

  return isSuccess
}

export async function setToFalse (tableNumber) {
  let isSuccess
  let call = {
    tableNumber: tableNumber,
    callServer: false
  }

  await firebase
    .firestore()
    .collection('callServer')
    .doc(call.tableNumber)
    .update(call)
    .then(() => {
      isSuccess = true
    })
    .catch(error => {
      console.error('Error updating callServer table', error)
      isSuccess = false
    })

  return isSuccess
}
