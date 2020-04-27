import firebase from '@react-native-firebase/app';
import '@react-native-firebase/functions';
import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'


//this function adds a customer to the database
//the function takes a object as it's parameter
//for example:
//let Customer = {
//     email:"johndoe@gmail.com",
//     id: "l8qDPeaGzOC4egZMW5hW",
//     name: "John Doe",
//     orderID: ["v6J7iJmyHxW5CIdCosvK""],
//     password: "password"
// }
//addCustomer(Customer)
//function returns a string if email already exists
//function returns true if Customer is added, false if not
export async function addCustomer(Customer) {
    
    let isSuccess;
    let validEmail = true;
    
    await firebase.firestore().collection('Customers').where('email', '==', Customer.email).get()
    .then((snapshot) => {
        if (snapshot.empty) {
            validEmail = false;
        } 
        
    })
    .catch (error => {
        console.log('error getting doc', error);
    });
    if(validEmail==true)
    {
        console.log('Email already exists');
        let emailExist = 'Email already exists'
        return emailExist
    }
    
    
    let autoID = firebase.firestore().collection('Customers').doc().id;

    Customer.id = autoID;

    await firebase.firestore().collection('Customers').doc(autoID).set(Customer)
    .then(() => {
        console.log("Customer added Successfully");
        isSuccess = true;
    })
    .catch((error) => {
        console.error("Error adding Customer to Customer table: ", error);
        isSuccess = false;
    });
    return isSuccess;
}


//this function deletes a customer from the database
//CustomerID is the ID of the customer which is a string
//for example: deleteCustomer("l8qDPeaGzOC4egZMW5hW")
export async function deleteCustomer(CustomerID) {
    
    let isSuccess;

    await firebase.firestore().collection('Customers').doc(CustomerID).delete()
    .then(() => {
        isSuccess = true;
    })
    .catch((error) => {
        console.error("Error deleting customer from customer table: ", error);
        isSuccess = false;
    });

    return isSuccess;
}


//this function stores the customers email and password to the database
//the function parameter is a email and password which are both strings
//for example:
//login("abcd@gmail.com", "password1234")
export async function login(email, password) {
    let validEmail = true;
    let customer;

    await firebase.firestore().collection('Customers').where('email', '==', email).get()
    .then((snapshot) => {
        if (snapshot.empty) {
            validEmail = false;
        } 
        else {
            customer = snapshot.docs.map(doc => doc.data());
        }
    })
    .catch (error => {
        console.log('Error getting document', error);
    });
    
    if (validEmail) {
        if (password != customer.password) {
            return 'Invalid Email or Password';
        }
    }
    else {
        return 'Invalid Email or Password';
    }
    
    return customer;
}

//this function gets all the customers in the database
export async function getCustomers() {
    let query;

    await firebase.firestore().collection('Customers').get()
    .then((snapshot) => {
        query = snapshot.docs.map(doc => doc.data());
    })
    .catch ((error) => {
        console.log('Error getting document', error);
        query = null;
    });
    
    return query;
}


//this function updates a customers information
//the functions parameter is a object
//for example:
//let item = {
//     email:"johndoe1234@gmail.com",
//     id: "l8qDPeaGzOC4egZMW5hW",
//     name: "John Bob",
//     orderID: ["v6J7iJmyHxW5CIdCosvK""],
//     password: "hello1234"
// }
//this email will change to jhondoe1234@gmail.com
//the id will remain the same
//the name will chage ot John Bob
//the order id will remain the same
//the pasword will change to hello1234
//updateCustomerInformation(item)
export async function updateCustomerInformation(item) {
    let isSuccess;

    await firebase.firestore().collection('Customers').doc(item.id).update(item)
    .then(() => {
        isSuccess = true;
    })
    .catch((error) => {
        console.error("Error updating Order in database table: ", error);
        isSuccess = false;
    });

    return isSuccess;

}
