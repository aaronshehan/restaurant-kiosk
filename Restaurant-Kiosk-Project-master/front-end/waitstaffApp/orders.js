import firebase from '@react-native-firebase/app';
import '@react-native-firebase/functions';
import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

//hello
//function will add a order to the database
//the function will return the orderID
//the functions parameter is a string which is the customerID
//for example createOrder("l8qDPeaGzOC4egZMW5hW")
export async function createOrder(customerID) {
    let orderID;

    await firebase.firestore().collection('Orders').add({
        customerID: customerID,
        order: null,
    })
    .then((docRef) => {
        orderID = docRef.id;
    })
    .catch(function(error) {
        console.error("Error creating Order: ", error);
        orderID = null;
    });

    return orderID;
}


//this function will add an item to the order
//the parameter orderID is a string, and item is  a array of items
//for example: 
//let item=['Pizza', 'Cheese Cake'],
//addItemToOrder('v6J7iJmyHxW5CIdCosvK', item)
export async function addItemToOrder(orderID, item) {
    let isSuccess;

    await firebase.firestore().collection('Orders').doc(orderID).update({ item })
    .then((success) => {
        isSuccess = true;
    })
    .catch((error) => {
        console.log('Error adding to order: ', error);
        isSucces = false;
    });

    return isSuccess;
}

//this function will remove an order from the data base
//orderId is a string which is the order ID
//for example: removeOrder('v6J7iJmyHxW5CIdCosvK')
export async function removeOrder(orderId) {
    let isSuccess;

    await firebase.firestore().collection('Orders').doc(orderID).delete()
    .then(() => {
        isSuccess = 1;
    })
    .catch((error) => {
        console.log('Error deleting order: ', error);
        isSuccess = 0;
    });

    return isSuccess;
}


//this function gets all the orders in the database
export async function getOrders() {
    let query;

    await firebase.firestore().collection('Orders').get()
    .then((snapshot) => {
        query = snapshot.docs.map(doc => doc.data());
    })
    .catch ((error) => {
        console.log('Error getting document', error);
        query = null;
    });
    
    return query;
}


//this function updates a specific order in the database
//the function takes a object as it's parameter
//for example:
//let item = {
//     completionStatus: false,
//     customerID: "l8qDPeaGzOC4egZMW5hW",
//     orderID: "v6J7iJmyHxW5CIdCosvK",
//     orderedItems: ["Pizza" ,"Apple Pie"],
//     price: 8.99,
//     requests: "none",
//     tableNumber: "3",
//     waitstaff: "4MfW9403U5WqT5cSIgbG"
// }
//the completionStatus will remain false
//the customerID will remain the same
//the orderID will remain the same
//the orderedItems will change to Pizza and Cheese Cake
//the price will change to 20.99
//the requests will change to make the pizza well done
//the table number will remain the same
//the waitstaff will remain the same
//for example: updateOrderInformation(item)
export async function updateOrderInformation(item) {
    let isSuccess;

    await firebase.firestore().collection('Orders').doc(item.orderID).update(item)
    .then(() => {
        isSuccess = true;
    })
    .catch((error) => {
        console.error("Error updating Order in database table: ", error);
        isSuccess = false;
    });

    return isSuccess;
}


//this function will get table orders
//the parameter is a string which is the table number
//for example getTableOrders('3')
export async function getTableOrders(tableNumber){

    let orders = []

    await firebase.firestore().collection('Inventory').where('tableNumber', '==', tableNumber).get()
    .then((snapshot) => {
        orders = snapshot.docs.map(doc => doc.data());
        console.log('Successfully retreived orders.')
    })
    .catch ((error) => {
        alert('Unable to retrieve order information', error);
    });

    if (orders = []) {
        return 'No orders for this table';
    }

    return orders;
}