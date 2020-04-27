import firebase from '@react-native-firebase/app'
import '@react-native-firebase/functions'
import '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

//function to add a table to the database
//parameter is a item object.
//for example:
/*let item = {
    available: false,
    tableNumber: '1',
    waitstaff: 'Dak Prescott',
    }*/
//then pass item to the function i.e, addTables(item)
export async function addTables (item) {
  let isSuccess

  await firebase
    .firestore()
    .collection('Tables')
    .add(item)
    .then(() => {
      isSuccess = true
    })
    .catch(error => {
      console.error('Error adding Table to database table: ', error)
      isSuccess = false
    })

  return isSuccess
}

//function to delete a table from the database
//paramater is a string which is the table number i.e., deleteTables('1') will delete the table who's number is 1
export async function deleteTables (tableNumber) {
  let isSuccess

  await firebase
    .firestore()
    .collection('Tables')
    .doc(tableNumber)
    .delete()
    .then(() => {
      isSuccess = true
    })
    .catch(error => {
      console.error('Error deleting Table from Table database table: ', error)
      isSuccess = false
    })

  return isSuccess
}

//function to get table information from the database
//paramater is a string which is the table number i.e., getTables('1') will get the table data for the table who's number is 1
export async function getTable (tableNumber) {
  let query

  await firebase
    .firestore()
    .collection('Tables')
    .where('tableNumber', '==', tableNumber)
    .get()
    .then(snapshot => {
      query = snapshot.docs.map(doc => doc.data())
    })
    .catch(error => {
      console.log('Error getting document', error)
      query = null
    })

  return query
}
export async function getTables() {
    let tables = []
    
    await firebase.firestore().collection('Tables').where('available', '==', false).where('ordersComplete', '==', false).get()
    .then((snapshot) => {
        tables = snapshot.docs.map(doc => doc.data());
    })
    .catch ((error) => {
        alert('Failure getting tables.', error);
    });
    
    return tables;
}
//function to update table infromation to the database
//parameter is a item object.
//for example:
/*let item = {
    available: false,
    tableNumber: '1',
    waitstaff: 'Tony Romo',
    }*/
//then pass item to the function i.e, updateTableInformation(item)
//this will update the table which is table number 1s
//the available status will change to false,
//table number will remain 1
//waitsatff will be changed to Tony Romo
export async function updateTableInformation (item) {
  let isSuccess

  await firebase
    .firestore()
    .collection('Tables')
    .doc(item.tableNumber)
    .update(item)
    .then(() => {
      isSuccess = true
    })
    .catch(error => {
      console.error('Error updating Table in database table: ', error)
      isSuccess = false
    })

  return isSuccess
}

export function markTableOrderStatusAsTrue(tableNum) {
    console.log(tableNum)
    let table = {
        tableNumber: tableNum,
        ordersComplete: true
    }
    console.log(table)
     firebase.firestore().collection('Tables').doc(tableNum).update(table)
    .then((data) => {
        console.log('Successfully updated table.');
        console.log(data)
    })
    .catch((error) => {
      alert("Error updating Table in database table: ", error);
     
    });
}


