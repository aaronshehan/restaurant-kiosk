import firebase from '@react-native-firebase/app'
import '@react-native-firebase/functions'
import '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
export async function getTableOrders (tableNumber) {
  let orders = []

  await firebase
    .firestore()
    .collection('Orders')
    .where('tableNumber', '==', tableNumber)
    .where('completionStatus', '==', false)
    .get()
    .then(snapshot => {
      orders = snapshot.docs.map(doc => doc.data())
      console.log('Successfully retreived orders.')
      console.log(orders)
    })
    .catch(error => {
      alert('Unable to retrieve order information', error)
    })

  return orders
}
export async function updateOrderInformation (item) {
  let isSuccess
  console.log(item)
  await firebase
    .firestore()
    .collection('Orders')
    .doc(item.orderID)
    .update(item)
    .then(() => {
      isSuccess = true
    })
    .catch(error => {
      console.error('Error updating Order in database table: ', error)
      isSuccess = false
    })

  return isSuccess
}
