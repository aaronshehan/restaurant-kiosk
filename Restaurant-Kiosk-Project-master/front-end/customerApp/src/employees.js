import firebase from '@react-native-firebase/app';
import '@react-native-firebase/functions';
import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'


//this function will add a employee to the database
//the function takes in a object as it's parameter
//for example:
//let employee = {
    //dob: "03/23/1989",
    // hourlyRate: 15.5,
    // id: "4MfW9403U5WqT5cSIgbG",
    // name: "Tony Romo",
    // role: "waitstaff"
// }
//addEmployee(employee)
//function returns a string if email already exists
//function returns true if employee is added, false if not
export async function addEmployee(employee) {
    
    let isSuccess;
    let validEmail = true;
    
    await firebase.firestore().collection('Employees').where('email', '==', employee.email).get()
    .then((snapshot) => {
        if (snapshot.empty) {
            validEmail = false;
        } 
        
    })
    .catch (error => {
        console.log('error getting doc', error);
    });
    if(validEmail==false)
    {
        console.log('Email already exists');
        let emailExist = 'Email already exists'
        return emailExist
    }

    let autoID = firebase.firestore().collection('Employees').doc().id;

    employee.id = autoID;

    await firebase.firestore().collection('Employees').doc(autoID).set(employee)
    .then(() => {
        console.log("Employee added Successfully");
        isSuccess = true;
    })
    .catch((error) => {
        console.error("Error adding Employee to Employee table: ", error);
        isSuccess = false;
    });
   

    return isSuccess;
}


//this function will delete a employee from the database
//this function takes a string for the parameter which is the employeeID, for example:
//deleteEmployee("4MfW9403U5WqT5cSIgbG")
export async function deleteEmployee(employeeID) {
    
    let isSuccess;

    await firebase.firestore().collection('Employees').doc(employeeID).delete()
    .then(() => {
        isSuccess = true;
    })
    .catch((error) => {
        console.error("Error deleting Employee from Employees table: ", error);
        isSuccess = false;
    });

    return isSuccess;
}


//gets all the employees in the database
export async function getEmployees() {
    let query;

    await firebase.firestore().collection('Employees').get()
    .then((snapshot) => {
        query = snapshot.docs.map(doc => doc.data());
    })
    .catch ((error) => {
        console.log('Error getting document', error);
        query = null;
    });
    
    return query;
}


//this function will update the employee information
//this function takes a object as it's parameter
//for example:
//let employee = {
    //dob: "03/23/1989",
    // hourlyRate: 20.5,
    // id: "4MfW9403U5WqT5cSIgbG",
    // name: "Dak Romo",
    // role: "manager"
// }
//for the employee with the id 4MfW9403U5WqT5cSIgbG
//the employees dob will remain the same
//the hourlyRate will change to 20.5
//the id will remain the same
//the name will change to Dak Romo
//the role will change to manager
//updateEmployeeInformation(item)
export async function updateEmployeeInformation(item) {
    let isSuccess;

    await firebase.firestore().collection('Employees').doc(item.id).update(item)
    .then(() => {
        isSuccess = true;
    })
    .catch((error) => {
        console.error("Error updating Employees in database table: ", error);
        isSuccess = false;
    });

    return isSuccess;

}

//this function stores the employees email and password to the database
//the function parameter is a email and password which are both strings
//for example:
//login("abcd@gmail.com", "password1234")
export async function login(email, password) {
    let validEmail = true;
    let employee;

    await firebase.firestore().collection('Employees').where('email', '==', email).get()
    .then((snapshot) => {
        if (snapshot.empty) {
            validEmail = false;
        } 
        else {
            employee = snapshot.docs.map(doc => doc.data());
        }
    })
    .catch (error => {
        console.log('Error getting document', error);
    });
    
    if (validEmail) {
        if (password != employee.password) {
            return 'Invalid Email or Password';
        }
    }
    else {
        return 'Invalid Email or Password';
    }
    
    return employee;
}
