import firebase from '@react-native-firebase/app';
import '@react-native-firebase/functions';
import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

//hello
//NOTE-------make sure to set ordersComplete to false when adding a table number-------NOTE
//this function will add a table to the database
//the functions parameter is a item object.
//for example:
/*let item = {
    available: false,
    ordersComplete: false,
    tableNumber: '1',
    waitstaff: 'Dak Prescott',
    }*/
//then pass item to the function i.e, addTables(item)
//NOTE-------make sure to set ordersComplete to false when adding a table number-------NOTE 
export async function addTables(item) {
    let isSuccess;
    await firebase.firestore().collection('Tables').doc(item.tableNumber).set(item)
    .then(() => {
        console.log("Successfully added table to the table doc.");
        isSuccess = true;
    })
    .catch((error) => {
        alert("Error adding table to table doc: ", error);
        isSuccess = false;
    });
    return isSuccess;

    
}


//this function is used delete a table from the database
//the functionsparamater is a string which is the table number i.e., deleteTables('1') will delete the table who's number is 1
export async function deleteTables(tableNumber) {
    
    let isSuccess;

    await firebase.firestore().collection('Tables').doc(tableNumber).delete()
    .then(() => {
        isSuccess = true;
    })
    .catch((error) => {
        console.error("Error deleting Table from Table database table: ", error);
        isSuccess = false;
    });

    return isSuccess;
}


//this function will get all of the tables in the Tables database
export async function getTables() {
    let tables = []
    
    await firebase.firestore().collection('Tables').where('available', '==', false).get()
    .then((snapshot) => {
        tables = snapshot.docs.map(doc => doc.data());
    })
    .catch ((error) => {
        alert('Failure getting tables.', error);
    });
    
    return tables;
}


//this function is used to update table infromation to the database
//the functionsparameter is a item object.
//for example:
/*let item = {
    available: false,
    ordersComplete: true,
    tableNumber: '1',
    waitstaff: 'Tony Romo',
    }*/
//then pass item to the function i.e, updateTableInformation(item)
//this will update the table which is table number 1
//the available status will change to false,
//the ordersComplete status will change to true,
//table number will remain 1,
//waitstaff will be changed to Tony Romo
//updateTableInformation(item)
export async function updateTableInformation(item) {
    let isSuccess;
    await firebase.firestore().collection('Tables').doc(item.tableNumber).update(item)
    .then(() => {
        console.log('Successfully updated table.');
        isSuccess = true;
    })
    .catch((error) => {
      alert("Error updating Table in database table: ", error);
      isSuccess = false;
     
    });
    return isSuccess;
}


//this function is used to mark a particular tables order status as true
//the function takes a number which is a string as it's parameter
//for example: markTableOrderStatusAsTrue('1')
//this will mark the ordersComplete status for table number as true
//markTableOrderStatusAdTrue(tableNum)
export async function markTableOrderStatusAsTrue(tableNum) {
    let isSuccess;
    let table = {
        tableNumber: tableNum,
        orderComplete: true
    }
    
    await firebase.firestore().collection('Tables').doc(tableNumber).update(table)
    .then(() => {
        console.log('Successfully updated table.');
        isSuccess = true;
    })
    .catch((error) => {
      alert("Error updating Table in database table: ", error);
      isSuccess = false;
     
    });
    return isSuccess;
}
