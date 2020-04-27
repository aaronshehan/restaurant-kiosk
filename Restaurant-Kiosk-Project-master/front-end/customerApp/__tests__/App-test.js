// /**
//  * @format
//  */

// import 'react-native';
// import React from 'react';
// import App from '../App';

// // Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

// it('renders correctly', () => {
//   renderer.create(<App />);
// });

const firebase = require("@firebase/testing");
// require( '@react-native-firebase/functions');
// require( '@react-native-firebase/auth');
// const firestore = require('@react-native-firebase/firestore');


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
it("should add tables doc", async () => {
async function addTables(item) {
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
let item = {
  available: false,
  ordersComplete: false,
  tableNumber: '1',
  waitstaff: 'Dak Prescott',
  }

addTables(item)
});


//this function is used delete a table from the database
//the functions parameter is a string which is the table number i.e., deleteTables('1') will delete the table who's number is 1
it("should delete table", async () => {
async function deleteTables(tableNumber) {
    
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
deleteTables('1')
});

//this function will get all of the tables in the Tables database
it("should get table", async () => {
async function getTables() {
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
getTables()
});

//this function is used to update table information to the database
//the function's parameter is a item object.
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
it("should update table", async () => {
async function updateTableInformation(item) {
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
let item = {
  available: false,
  ordersComplete: false,
  tableNumber: '1',
  waitstaff: 'Dak Prescott',
  }

updateTableInformation(item)
});


//this function is used to mark a particular tables order status as true
//the function takes a number which is a string as it's parameter
//for example: markTableOrderStatusAsTrue('1')
//this will mark the ordersComplete status for table number as true
//markTableOrderStatusAdTrue(tableNum)
it("should mark table as true", async () => {
async function markTableOrderStatusAsTrue(tableNum) {
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
markTableOrderStatusAsTrue('1')
});

it("should get staff assigned to table", async () => {
async function getStaffAssignedToTable(tableNum) {
    let isSuccess;
    let staff;
    
    await firebase.firestore().collection('Tables').where('tableNumber', '==', tableNum).get()
    .then((snapshot) => {
        console.log('Successfully retrieved waitstaff id.');
        staff = tables = snapshot.docs.map(doc => doc.data());
    })
    .catch((error) => {
      alert("Error getting waitstaff id from table: ", error);
      isSuccess = false;
     
    });
    
    if (!isSuccess) {
        return false;
    }
    
    return staff[0];
}
getStaffAssignedToTable('1')
});


it("should set call server to true", async () => {
    async function callServer(tableNumber) {
        let isSuccess;
        let call = {
            tableNumber: tableNumber,
            callServer: true
        };
        
        await firebase.firestore().collection('CallServer').doc(call.tableNumber).update(call)
        .then(() => {
            isSuccess = true;
        })
        .catch((error) => {
            console.error("Error calling server.", error);
            isSuccess = false;
        });
    
        return isSuccess;
    }

    callServer('1');
});


it("should set call server to false", async () => {
    async function setToFalse(tableNumber) {
        let isSuccess;
        let call = {
            tableNumber: tableNumber,
            callServer: false
        };
        
        await firebase.firestore().collection('CallServer').doc(call.tableNumber).update(call)
        .then(() => {
            isSuccess = true;
        })
        .catch((error) => {
            console.error("Error updating CallServer table", error);
            isSuccess = false;
        });
    
        return isSuccess;
    }

    setToFalse('1');
});

it("should add customer to customer table", async () => {
    async function addCustomer(Customer) {
    
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
            isSuccess = true;
            console.log("Customer added Successfully");
            isSuccess = true;
        })
        .catch((error) => {
            isSuccess = false;
            console.error("Error adding Customer to Customer table: ", error);
            isSuccess = false;
        });
        return isSuccess;
    }

    let Customer = {
            email:"johndoe@gmail.com",
            id: "l8qDPeaGzOC4egZMW5hW",
            name: "John Doe",
            orderID: ["v6J7iJmyHxW5CIdCosvK"],
            password: "password"
    };
    
    addCustomer(Customer);
});

it("should delete customer from customer table", async () => {
    async function deleteCustomer(CustomerID) {
    
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

    deleteCustomer('l8qDPeaGzOC4egZMW5hW');
});

it("should login the customer", async () => {
    async function login(email, password) {
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
            if (password != customer[0].password) {
                return 'Invalid Email or Password';
            }
        }
        else {
            return 'Invalid Email or Password';
        }
        
        return customer;
    }

    login('aaronshehan28@gmail.com', 'password');
});

it("should retrieve all customers", async () => {
    async function getCustomers() {
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

    getCustomers();
});

it("should update customer information", async () => {
    async function updateCustomerInformation(item) {
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

    let Customer = {
        email:"johndoe@gmail.com",
        id: "l8qDPeaGzOC4egZMW5hW",
        name: "John Doe",
        orderID: ["v6J7iJmyHxW5CIdCosvK"],
        password: "password"
    };

    updateCustomerInformation(Customer);
});

///////////////////////////////////////////////Employee Section

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
it("should add employee", async () => {
    async function addEmployee(employee) {

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

    let employee = {
         dob: "03/23/1989",
         hourlyRate: 15.5,
         id: "4MfW9403U5WqT5cSIgbG",
         name: "Tony Romo",
         role: "waitstaff"
        };

    addEmployee(employee);
});

//gets all the employees in the database
it("should retrieve all employees", async () => {
    async function getEmployees() {
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

    getEmployees();
});

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
it("should update employee info", async () => {
    async function updateEmployeeInformation(item) {
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
        let employee = {
             dob: "03/23/1989",
             hourlyRate: 20.5,
             id: "4MfW9403U5WqT5cSIgbG",
             name: "Dak Romo",
             role: "manager"
        }

        updateEmployeeInformation('4MfW9403U5WqT5cSIgbG');
});

//this function stores the employees email and password to the database
//the function parameter is a email and password which are both strings
//for example:
//login("abcd@gmail.com", "password1234")
it("should store employee login info", async () => {
        async function login(email, password) {
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
        login("abcd@gmail.com", "password1234");
});

//this function will delete a employee from the database
//this function takes a string for the parameter which is the employeeID, for example:
//deleteEmployee("4MfW9403U5WqT5cSIgbG")
it("should delete employee", async () => {
    async function deleteEmployee(employeeID) {

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
    deleteEmployee('4MfW9403U5WqT5cSIgbG');
});

///////////////////////////////////////////////Coupon Section

it("should validate coupon", async () => {
    async function validateCoupon(couponCode) {
      let validCoupon;
      let coupon;

      await firebase.firestore().collection('Coupons').where('code', '==', couponCode).get()
        .then((snapshot) => {
            if (snapshot.empty) {
                validCoupon = false;
            }
            else {
              validCoupon = true;
              coupon = snapshot.docs.map(doc => doc.data());
            }
        })
        .catch ((error) => {
            validCoupon = false;
            console.log('error validating coupon', error);
        });

        if (!validCoupon) {
            return false;
        }

        return coupon[0].percentOff;
    }

    validateCoupon("T12rO953AWNMvoaNM3JH");
});

it("should add coupon to table", async () => {
    async function addCoupon(discount) {
       let isSuccess;
       let autoID = firebase.firestore().collection('Coupons').doc().id;

       await firebase.firestore().collection('Employees').doc(autoID).set({code: autoID, percentOff: discount})
        .then(() => {
            console.log("Coupon added Successfully");
            isSuccess = true;
        })
        .catch((error) => {
            console.error("Error adding Coupon to table: ", error);
            isSuccess = false;
        });

        return isSuccess;
    }

    addCoupon("T12rO953AWNMvoaNM3JH");
});

///////////////////////////////////////////////Revenue Section

    //this function will update monthly revenue
    //if value not present, update() will create
    //this function takes a object as it's parameter
    //for example:
    //let revenue = {
        //April:658987,
        //February: 457124,
        //January: 654789,
        //March: 847512,
        //year: "2020"
    //}
    //this will update the revenue for April through March
    //the year will stay the same
    //updateMonthlyRevenue(revenue)
it("should update monthly revenue", async () => {
      async function updateMonthlyRevenue(revenue) {
        let isSuccess;

        await firebase.firestore().collection('MonthlyRevenue').doc(revenue.year).update(revenue)
        .then(() => {
            isSuccess = true;
        })
        .catch((error) => {
            console.error("Error updating Monthly Revenue in database table: ", error);
            isSuccess = false;
        });

        return isSuccess;
    }

    let revenue = {
        April:658987,
        February: 457124,
        January: 654789,
        March: 847512,
        year: "2020"
    };

    updateMonthlyRevenue(revenue);
});

//this function will update the daily revenue
//if value not present, update() will create
//this function takes a object as it's parameter
//for example:
//let revenue = {
    // January: [102020,10101,11111],
    // year: '2020'
//}
//this will update the first three days of january
//the year will stay the same
//updateDailyRevenue(revenue)
it("should update daily revenue", async () => {
    async function updateDailyRevenue(revenue) {
        let isSuccess;

        await firebase.firestore().collection('DailyRevenue').doc(revenue.year).update(revenue)
        .then(() => {
            isSuccess = true;
        })
        .catch((error) => {
            console.error("Error updating Daily Revenue in database table: ", error);
            isSuccess = false;
        });

        return isSuccess;
    }

    let revenue = {
         January: [102020,10101,11111],
         year: '2020'
    };

    updateDailyRevenue(revenue);
});

//gets the daily revenue in the database
it("should get daily revenue", async () => {
    async function getDailyRevenue() {
        let query;

        await firebase.firestore().collection('DailyRevenue').get()
        .then((snapshot) => {
            query = snapshot.docs.map(doc => doc.data());
        })
        .catch ((error) => {
            console.log('Error getting document', error);
            query = null;
        });

        return query;
    }

    getDailyRevenue();
});

//gets the monthly revenue in the database
it("should get monthly revenue", async () => {
    async function getMonthlyRevenue() {
        let query;

        await firebase.firestore().collection('MonthlyRevenue').get()
        .then((snapshot) => {
            query = snapshot.docs.map(doc => doc.data());
        })
        .catch ((error) => {
            console.log('Error getting document', error);
            query = null;
        });

        return query;
    }

    getMonthlyRevenue();
});

///////////////////////////////////////////////Transactions Section

/*  example?:
    let transaction = {
        amountDue = 15.00,
        discount = 0.0,
        orderTotal = 11.00,
        paymentMethod = "Credit Card",
        tips = 4.00,
        waitstaff = "4MfW9403U5WqT5cSIgbG"
    };
    */
it("should add transaction", async () => {
    async function addTransaction(transaction) {
        let isSuccess;
        let errorMessage;

        await firebase.firestore().collection('Transactions').add(transaction)
        .then(() => {
            console.log("Successfully added transaction.");
            isSuccess = true;
        })
        .catch((error) => {
            alert("Error adding table to table doc: ", error);
            isSuccess = false;
            errorMessage = error;
        });

        if (!isSuccess) {
          return errorMessage;
        }

         return true;
    }

    let transaction = {
            amountDue : 15.00,
            discount : 0.0,
            orderTotal : 11.00,
            paymentMethod : "Credit Card",
            tips : 4.00,
            waitstaff : "4MfW9403U5WqT5cSIgbG"
        };
    addTransaction(transaction);
});

///////////////////////////////////////////////Helpfunctions Section

// function to see help status of all Tables
it("should get help status of tables", async () => {
    async function tableHelpStatus() {
        let query;

        await firebase.firestore().collection('Help').get()
        .then(snapshot => {
            query = snapshot.docs.map(doc => doc.data());
        })
        .catch (error => {
            console.log('Error getting documents', error);
            query = null;
        });

        return items;
    }

    tableHelpStatus();
});

// function to mark a table needing help
// sets helpNeeded to 1 for table represented by table_number
it("should mark table for help", async () => {
    async function tableNeedsHelp(table_number) {
        let isSuccess;

        await firebase.firestore().collection('Help').doc(table_number)
        .update({helpNeeded: 1})
        .then(() => {
                isSuccess = true;
        })
        .catch (error => {
            console.log('Error getting documents', error);
            isSuccess = true;
        });

        return isSuccess;
    }

    let table_number = 0;
    tableNeedsHelp(table_number);
});


// function to mark a table as no longer needing help
// sets helpNeeded to 0 for table represented by table_number
it("should mark table as normal", async () => {
    async function tableHelped(table_number) {
        let isSuccess;

        await firebase.firestore().collection('Help').doc(table_number)
        .update({helpNeeded: 0})
            .then(() => {
                isSuccess = true;
            })
        .catch (error => {
            console.log('Error getting documents', error);
            isSuccess = false;
        });

        return isSuccess;
    }

    let table_number = 0;
    tableHelped(table_number);
});

///////////////////////////////////////////////Menu_operations Section

//this function is used to get the items on the menu based on their type
//the functions parameter is a string which is the menu type i.e, getMenu('entree')
it("should get menu items based on type", async () => {
    async function getMenu(type) {
        let query;

        await firebase.firestore().collection('Menu').where('type', '==', type).get()
        .then(snapshot => {
            query = snapshot.docs.map(doc => doc.data());
        })
        .catch (error => {
            console.log('Error getting documents', error);
            query = null;
        });

        let items = [];

        for (i in query) {

            let isAvailable = true;

            for (j in query[i].ingredients) {

                await getIngredientQuantity(query[i].ingredients[j])
                    .then((quantity) => {
                        if (quantity == 0) {
                            isAvailable = false;
                        }
                    })
                    .catch (error => {
                        console.log('Error getting documents', error);
                    });

                if (!isAvailable) {
                    break;
                }
            }

            if (isAvailable) {
                items.push(query[i]);
            }
        }

        return items;
    }

    getMenu('entree');
});

//this function is used to add Menu item
//the functions parameter is a item object.
//for example:
/*let item = {
 allergen: ['Egg' , 'Milk'],
 calories: 750,
 ingredients: ['cheese', 'tomato sauce', 'pepperoni'],
 name: 'Pizza',
 price: 6.99,
 type: 'entree',
 uri: 'image link'
 }*/
 //then pass item to the function i.e, addToMenu(item)
it("should add item to menu", async () => {
    async function addToMenu(item) {
        let isSuccess;
        firebase.firestore().collection('Menu').doc(item.name).set(item)
        .then(() => {
            console.log("Successfully added item to the menu.");
            isSuccess = true;
        })
        .catch((error) => {
            alert("Error adding item to menu: ", error);
            isSuccess = false;
        });
        return isSuccess;
    }

    let item = {
     allergen: ['Egg' , 'Milk'],
     calories: 750,
     ingredients: ['cheese', 'tomato sauce', 'pepperoni'],
     name: 'Pizza',
     price: 6.99,
     type: 'entree',
     uri: 'image link'
     };

     addToMenu(item);
});

//this function is used to update menu item information to the database
//the functions parameter is a item object.
//for example:
/*let item = {
 allergen: ['Egg', 'Milk'],
 calories: 850,
 ingredients: ['blue cheese', 'tomato sauce', 'pineapple'],
 name: 'Pizza',
 price: 7.99,
 type: 'entree',
 uri: 'image link'
 }*/
//then pass item to the function i.e, updateMenuItem(item)
//this will update the the Pizza menu item's calories to 850,
//the ingredients array will be changed to have the values ['blue cheese', 'tomato sauce', 'pineapple']
//the name will remain the same
//the price will be changed to be 7.99
//the type will remain entree
//the uri can be changed to whatever image link you want
//updateMenuItem(item)
it("should update menu item", async () => {
    async function updateMenuItem(item) {
        let isSuccess;

        await firebase.firestore().collection('Menu').doc(item.name).update(item)
        .then(() => {
            isSuccess = true;
        })
        .catch((error) => {
            console.error("Error updating item in menu: ", error);
            isSuccess = false;
        });

        return isSuccess;
    }
    let item = {
     allergen: ['Egg', 'Milk'],
     calories: 850,
     ingredients: ['blue cheese', 'tomato sauce', 'pineapple'],
     name: 'Pizza',
     price: 7.99,
     type: 'entree',
     uri: 'image link'
     }

     updateMenuItem(item);
});

//this function is used to get menu information from the database
//the functions parameter is a string which is the menu item name i.e., getItemDetails('Pizza') will get the menu item data for the menu item who's named is Pizza
it("should get menu item details", async () => {
    async function getItemDetails(itemName) {
        let query;

        await firebase.firestore().collection('Menu').where('name', '==', itemName).get()
        .then((snapshot) => {
            query = snapshot.docs.map(doc => doc.data());
        })
        .catch ((error) => {
            console.log('Error getting document', error);
            query = null;
        });

        return query;
    }

    getItemDetails('Pizza');
});

//this function is used to check a particular items inventory is not empty
//the parameter for this function is a string which is the name of the item i.e., checkInventory('Sugar')
it("should check ingredient count", async () => {
    async function checkInventory(name) {
        let query;
        await firebase.firestore().collection('Inventory').where('ingredientName', '==', name).get()
            .then(snapshot => {
                query = snapshot.docs.map(doc => doc.data());
            })
            .catch(error => {
                console.log('Error getting documents', error);
                query = null;
            });

        if (query == null) {
            return null;
        }

        if (query[0].ingredientQuantity == 0) {
            return 0;
        } else
            return 1;
    }

    checkInventory('Sugar');
});

//this function is used to delete a Menu item from the database
//the functions parameter is a string which is the menu item name i.e., deleteFromMenu('Pizza') will delete the menu item who's name is Pizza
it("should delete item from menu", async () => {
    async function deleteFromMenu(itemName) {
        let isSuccess;
        firebase.firestore().collection('Menu').doc(itemName).delete()
        .then(() => {
            console.log("Successfully deleted item from the menu.");
            isSuccess = true;
        })
        .catch((error) => {
            alert("Error deleting item from menu: ", error);
            isSuccess = false;
        });
        return isSuccess;
    }

    deleteFromMenu('Pizza');
});

///////////////////////////////////////////////Orders Section

//function will add a order to the database
//the function will return the orderID
//the functions parameter is a string which is the customerID
//for example createOrder("l8qDPeaGzOC4egZMW5hW", "3")
it("should create order", async () => {
    async function createOrder(custID, tableNum) {
        let autoID = firebase.firestore().collection('Orders').doc().id;

        let potentialError;

        await firebase.firestore().collection('Orders').doc(autoID).set({
            customerID: custID,
            order: null,
            waitstaff: null,
            tableNumber: tableNum,
            completionStatus: false,
            price: null,
            requests: null,
            orderId: autoID
        })
        .then(() => {
            console.log("Successfully created order.");
            isSuccess = true;
        })
        .catch((error) => {
            console.log("Error creating Order: ", error);
            potentialError = error;
            isSuccess = false;
        });

        if (!isSuccess) {
            return potentialError;
        }

        return autoID;
    }

    createOrder("l8qDPeaGzOC4egZMW5hW", "3");
});

//this function will add an item to the order
//the parameter orderID is a string, and item is  a array of items
//for example:
//let item=['Pizza', 'Cheese Cake'],
//addItemToOrder('v6J7iJmyHxW5CIdCosvK', item)
it("should add item to order", async () => {
    async function addItemToOrder(orderID, item) {
        let isSuccess;

        await firebase.firestore().collection('Orders').doc(orderID).update({ item })
        .then((success) => {
            isSuccess = true;
        })
        .catch((error) => {
            console.log('Error adding to order: ', error);
            isSuccess = false;
        });

        return isSuccess;
    }

    let item=['Pizza', 'Cheese Cake'];
    addItemToOrder('v6J7iJmyHxW5CIdCosvK', item);
});

//this function will remove an order from the data base
//orderId is a string which is the order ID
//for example: removeOrder('v6J7iJmyHxW5CIdCosvK')
it("should remove order from database", async () => {
    async function removeOrder(orderId) {
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

    removeOrder('v6J7iJmyHxW5CIdCosvK');
});

//this function gets all the orders in the database
it("should get all orders", async () => {
    async function getOrders() {
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

    getOrders();
});

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
it("should update order info", async () => {
    async function updateOrderInformation(item) {
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

    let item = {
         completionStatus: false,
         customerID: "l8qDPeaGzOC4egZMW5hW",
         orderID: "v6J7iJmyHxW5CIdCosvK",
         orderedItems: ["Pizza" ,"Apple Pie"],
         price: 8.99,
         requests: "none",
         tableNumber: "3",
         waitstaff: "4MfW9403U5WqT5cSIgbG"
     }

    updateOrderInformation(item);
});

//this function will get table orders
//the parameter is a string which is the table number
//for example getTableOrders('3')
it("should get table orders", async () => {
    async function getTableOrders(tableNumber){

        let orders = []

        await firebase.firestore().collection('Inventory').where('tableNumber', '==', tableNumber).get()
        .then((snapshot) => {
            orders = snapshot.docs.map(doc => doc.data());
            console.log('Successfully retrieved orders.')
        })
        .catch ((error) => {
            alert('Unable to retrieve order information', error);
        });

        if (orders = []) {
            return 'No orders for this table';
        }

        return orders;
    }

    getTableOrders('3');
});

it("should confirm order", async () => {
    async function confirmOrder(ordID, custID, tableNum, items){
    //     for (i in items) {
    //         if (items[i].quantity > 0) {
    //             order.push(items[i]);
    //         }
    //     }

        let newArray = [];
        let uniqueObject = {};

        for (i in items) {
            let objTitle = items[i]['name'];
            uniqueObject[objTitle] = items[i];
        }

        for (i in uniqueObject) {
            newArray.push(uniqueObject[i]);
        }

        let order = newArray;
        let inventory;

        await firebase.firestore().collection('Inventory').get()
        .then((snapshot) => {
            inventory = snapshot.docs.map(doc => doc.data());
        })
        .catch ((error) => {
            console.log('Error getting document', error);
            inventory = null;
        });

        if (inventory == null) {
            return false;
        }


        let hasEnoughInventory = true;

        for (i in order) {
            for (j in order[i].ingredients) {
                for (k in inventory) {
                    if (inventory[k].ingredientName == order[i].ingredients[j] && inventory[k].ingredientQuantity == 0) {
                        hasEnoughInventory = false;
                        break;
                    }
                }
            }
        }

        if (!hasEnoughInventory) {
            return false;
        }

        let finalizedOrder = [];
        let totalPrice = 0;

        for (i in order) {
            finalizedOrder.push(order[i].name.concat(" ", order[i].quantity.toString()));
            totalPrice += (order[i].quantity * order[i].price);
        }

        let staffID;
        let isSuccess;

        await firebase.firestore().collection('Tables').where('tableNumber', '==', tableNum).get()
        .then((snapshot) => {
            console.log('Successfully retrieved waitstaff id.');
            staffID = snapshot.docs.map(doc => doc.data());
            isSuccess = true;
        })
        .catch((error) => {
          alert("Error getting waitstaff id from table: ", error);
          isSuccess = false;

        });

        if (!isSuccess) {
            return false;
        }

        staffID = staffID[0];

        let completeOrder = {
            completionStatus: false,
            customerID: custID,
            waitstaff: staffID,
            orderID: ordID,
            orderedItems: finalizedOrder,
            price: totalPrice,
            requests: 'none',
            tableNumber: tableNum
        };

        await firebase.firestore().collection('Orders').doc(completeOrder.orderID).update(completeOrder)
        .then((success) => {
            isSuccess = true;
        })
        .catch((error) => {
            console.log('Error adding to order: ', error);
            isSuccess = false;
        });

        return isSuccess;

    }

    //confirmOrder(ordID, custID, tableNum, items)
    let items = ["Pizza" ,"Apple Pie"];
    confirmOrder("v6J7iJmyHxW5CIdCosvK", "l8qDPeaGzOC4egZMW5hW", "3", items);
});





///////////////////////////////////////////////TESTING ERROR HANDLING (edits of code above)



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
it("should add tables doc: error", async () => {
    async function addTables(item) {
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
    let item = {
      available: false,
      ordersComplete: false,
      tableNumber: 1, // Use integer instead of string
      waitstaff: 'Dak Prescott',
      };

    addTables(item);
});


//this function is used delete a table from the database
//the functions parameter is a string which is the table number i.e., deleteTables('1') will delete the table who's number is 1
it("should delete table: error", async () => {
    async function deleteTables(tableNumber) {

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
    deleteTables(1); // Use integer instead of string
});

//this function will get all of the tables in the Tables database
it("should get table: error", async () => {
    async function getTables() {
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
    getTables('1'); // pass unused parameter
});

//this function is used to update table information to the database
//the function's parameter is a item object.
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
it("should update table: error", async () => {
    async function updateTableInformation(item) {
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
    let item = {
      available: false,
      ordersComplete: false,
      tableNumber: 1, // Use integer instead of string
      waitstaff: 'Dak Prescott',
      };

    updateTableInformation(item);
});


//this function is used to mark a particular tables order status as true
//the function takes a number which is a string as it's parameter
//for example: markTableOrderStatusAsTrue('1')
//this will mark the ordersComplete status for table number as true
//markTableOrderStatusAdTrue(tableNum)
it("should mark table as true: error", async () => {
async function markTableOrderStatusAsTrue(tableNum) {
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
markTableOrderStatusAsTrue(1); // Use integer instead of string
});

it("should get staff assigned to table: error", async () => {
async function getStaffAssignedToTable(tableNum) {
    let isSuccess;
    let staff;

    await firebase.firestore().collection('Tables').where('tableNumber', '==', tableNum).get()
    .then((snapshot) => {
        console.log('Successfully retrieved waitstaff id.');
        staff = tables = snapshot.docs.map(doc => doc.data());
    })
    .catch((error) => {
      alert("Error getting waitstaff id from table: ", error);
      isSuccess = false;

    });

    if (!isSuccess) {
        return false;
    }

    return staff[0];
}
getStaffAssignedToTable(1); // Use integer instead of string
});


it("should set call server to true: error", async () => {
    async function callServer(tableNumber) {
        let isSuccess;
        let call = {
            tableNumber: tableNumber,
            callServer: true
        };

        await firebase.firestore().collection('CallServer').doc(call.tableNumber).update(call)
        .then(() => {
            isSuccess = true;
        })
        .catch((error) => {
            console.error("Error calling server.", error);
            isSuccess = false;
        });

        return isSuccess;
    }

    callServer(1); // Use integer instead of string
});


it("should set call server to false: error", async () => {
    async function setToFalse(tableNumber) {
        let isSuccess;
        let call = {
            tableNumber: tableNumber,
            callServer: false
        };

        await firebase.firestore().collection('CallServer').doc(call.tableNumber).update(call)
        .then(() => {
            isSuccess = true;
        })
        .catch((error) => {
            console.error("Error updating CallServer table", error);
            isSuccess = false;
        });

        return isSuccess;
    }

    setToFalse(1); // Use integer instead of string
});

it("should add customer to customer table: error", async () => {
    async function addCustomer(Customer) {

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
            let emailExist = 'Email already exists';
            return emailExist;
        }

        let autoID = firebase.firestore().collection('Customers').doc().id;

        Customer.id = autoID;

        await firebase.firestore().collection('Customers').doc(autoID).set(Customer)
        .then(() => {
            isSuccess = true;
            console.log("Customer added Successfully");
            isSuccess = true;
        })
        .catch((error) => {
            isSuccess = false;
            console.error("Error adding Customer to Customer table: ", error);
            isSuccess = false;
        });
        return isSuccess;
    }

    let Customer = {
            //email:"johndoe@gmail.com", // don't pass in email
            id: "l8qDPeaGzOC4egZMW5hW",
            name: "John Doe",
            orderID: ["v6J7iJmyHxW5CIdCosvK"],
            password: "password"
    };

    addCustomer(Customer);
});

it("should delete customer from customer table: error", async () => {
    async function deleteCustomer(CustomerID) {

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

    deleteCustomer('incorrect'); // don't pass in correct ID
});

it("should login the customer: error", async () => {
    async function login(email, password) {
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
            if (password != customer[0].password) {
                return 'Invalid Email or Password';
            }
        }
        else {
            return 'Invalid Email or Password';
        }

        return customer;
    }

    login('aaronsh', 'password'); // Email will not be found
});

it("should retrieve all customers: error", async () => {
    async function getCustomers() {
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

    getCustomers('1');
});

it("should update customer information: error", async () => {
    async function updateCustomerInformation(item) {
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

    let Customer = {
        email:"johndoe@gmail.com",
        id: "incorrect", // pass in incorrect id
        name: "John Doe",
        orderID: ["v6J7iJmyHxW5CIdCosvK"],
        password: "password"
    };
    updateCustomerInformation(Customer);
});

///////////////////////////////////////////////Employee Section

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
it("should add employee: error", async () => {
    async function addEmployee(employee) {

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

    let employee = {
         dob: "03/23/1989",
         hourlyRate: 15.5,
         id: "4gbG", // id won't be found
         name: "Tony Romo",
         role: "waitstaff"
        };
    addEmployee(employee);
});

//gets all the employees in the database
it("should retrieve all employees: error", async () => {
    async function getEmployees() {
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

    getEmployees('1'); // pass unused parameter
});

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
it("should update employee info: error", async () => {
    async function updateEmployeeInformation(item) {
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
        let employee = {
             dob: "03/23/1989",
             hourlyRate: 20.5,
             id: "4MfW9403U5WqT5cSIgbG",
             name: "Dak Romo",
             role: "manager"
        }

        updateEmployeeInformation('incorrect'); // id won't be found
});

//this function stores the employees email and password to the database
//the function parameter is a email and password which are both strings
//for example:
//login("abcd@gmail.com", "password1234")
it("should store employee login info: error", async () => {
        async function login(email, password) {
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
        login("abcd", "password1234"); // email won't be found
});

//this function will delete a employee from the database
//this function takes a string for the parameter which is the employeeID, for example:
//deleteEmployee("4MfW9403U5WqT5cSIgbG")
it("should delete employee: error", async () => {
    async function deleteEmployee(employeeID) {

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
    deleteEmployee('incorrect'); // ID won't be found
});

///////////////////////////////////////////////Coupon Section

it("should validate coupon: error", async () => {
    async function validateCoupon(couponCode) {
      let validCoupon;
      let coupon;

      await firebase.firestore().collection('Coupons').where('code', '==', couponCode).get()
        .then((snapshot) => {
            if (snapshot.empty) {
                validCoupon = false;
            }
            else {
              validCoupon = true;
              coupon = snapshot.docs.map(doc => doc.data());
            }
        })
        .catch ((error) => {
            validCoupon = false;
            console.log('error validating coupon', error);
        });

        if (!validCoupon) {
            return false;
        }

        return coupon[0].percentOff;
    }

    validateCoupon("incorrect"); // coupon won't be found
});

it("should add coupon to table: error", async () => {
    async function addCoupon(discount) {
       let isSuccess;
       let autoID = firebase.firestore().collection('Coupons').doc().id;

       await firebase.firestore().collection('Employees').doc(autoID).set({code: autoID, percentOff: discount})
        .then(() => {
            console.log("Coupon added Successfully");
            isSuccess = true;
        })
        .catch((error) => {
            console.error("Error adding Coupon to table: ", error);
            isSuccess = false;
        });

        return isSuccess;
    }

    addCoupon(); // no parameter
});

///////////////////////////////////////////////Revenue Section

    //this function will update monthly revenue
    //if value not present, update() will create
    //this function takes a object as it's parameter
    //for example:
    //let revenue = {
        //April:658987,
        //February: 457124,
        //January: 654789,
        //March: 847512,
        //year: "2020"
    //}
    //this will update the revenue for April through March
    //the year will stay the same
    //updateMonthlyRevenue(revenue)
it("should update monthly revenue: error", async () => {
      async function updateMonthlyRevenue(revenue) {
        let isSuccess;

        await firebase.firestore().collection('MonthlyRevenue').doc(revenue.year).update(revenue)
        .then(() => {
            isSuccess = true;
        })
        .catch((error) => {
            console.error("Error updating Monthly Revenue in database table: ", error);
            isSuccess = false;
        });

        return isSuccess;
    }

    let revenue = {
        April:658987,
        February: 457124,
        January: 654789,
        March: 847512,
        year: 2020 // pass year as integer
    };

    updateMonthlyRevenue(revenue);
});

//this function will update the daily revenue
//if value not present, update() will create
//this function takes a object as it's parameter
//for example:
//let revenue = {
    // January: [102020,10101,11111],
    // year: '2020'
//}
//this will update the first three days of january
//the year will stay the same
//updateDailyRevenue(revenue)
it("should update daily revenue: error", async () => {
    async function updateDailyRevenue(revenue) {
        let isSuccess;

        await firebase.firestore().collection('DailyRevenue').doc(revenue.year).update(revenue)
        .then(() => {
            isSuccess = true;
        })
        .catch((error) => {
            console.error("Error updating Daily Revenue in database table: ", error);
            isSuccess = false;
        });

        return isSuccess;
    }

    let revenue = {
         January: [102020,10101,11111],
         year: 2020 // pass year as integer
    };

    updateDailyRevenue(revenue);
});

//gets the daily revenue in the database
it("should get daily revenue: error", async () => {
    async function getDailyRevenue() {
        let query;

        await firebase.firestore().collection('DailyRevenue').get()
        .then((snapshot) => {
            query = snapshot.docs.map(doc => doc.data());
        })
        .catch ((error) => {
            console.log('Error getting document', error);
            query = null;
        });

        return query;
    }

    getDailyRevenue('1'); // pass unused parameter
});

//gets the monthly revenue in the database
it("should get monthly revenue: error", async () => {
    async function getMonthlyRevenue() {
        let query;

        await firebase.firestore().collection('MonthlyRevenue').get()
        .then((snapshot) => {
            query = snapshot.docs.map(doc => doc.data());
        })
        .catch ((error) => {
            console.log('Error getting document', error);
            query = null;
        });

        return query;
    }

    getMonthlyRevenue('1'); // pass unused parameter
});

///////////////////////////////////////////////Transactions Section

/*  example?:
    let transaction = {
        amountDue = 15.00,
        discount = 0.0,
        orderTotal = 11.00,
        paymentMethod = "Credit Card",
        tips = 4.00,
        waitstaff = "4MfW9403U5WqT5cSIgbG"
    };
    */
it("should add transaction: error", async () => {
    async function addTransaction(transaction) {
        let isSuccess;
        let errorMessage;

        await firebase.firestore().collection('Transactions').add(transaction)
        .then(() => {
            console.log("Successfully added transaction.");
            isSuccess = true;
        })
        .catch((error) => {
            alert("Error adding table to table doc: ", error);
            isSuccess = false;
            errorMessage = error;
        });

        if (!isSuccess) {
          return errorMessage;
        }

         return true;
    }

    let transaction = {
            amountDue : 15.00,
            discount : 0.0,
            orderTotal : 11.00,
            paymentMethod : "Credit Card",
            tips : 4.00,
            waitstaff : "4MfW9403U5WqT5cSIgbG"
        };
    addTransaction(); // empty function
});

///////////////////////////////////////////////Helpfunctions Section

// function to see help status of all Tables
it("should get help status of tables: error", async () => {
    async function tableHelpStatus() {
        let query;

        await firebase.firestore().collection('Help').get()
        .then(snapshot => {
            query = snapshot.docs.map(doc => doc.data());
        })
        .catch (error => {
            console.log('Error getting documents', error);
            query = null;
        });

        return items;
    }

    tableHelpStatus('1'); // pass unused parameter
});

// function to mark a table needing help
// sets helpNeeded to 1 for table represented by table_number
it("should mark table for help: error", async () => {
    async function tableNeedsHelp(table_number) {
        let isSuccess;

        await firebase.firestore().collection('Help').doc(table_number)
        .update({helpNeeded: 1})
        .then(() => {
                isSuccess = true;
        })
        .catch (error => {
            console.log('Error getting documents', error);
            isSuccess = true;
        });

        return isSuccess;
    }

    let table_number = '0'; // no table number 0
    tableNeedsHelp(table_number);
});


// function to mark a table as no longer needing help
// sets helpNeeded to 0 for table represented by table_number
it("should mark table as normal: error", async () => {
    async function tableHelped(table_number) {
        let isSuccess;

        await firebase.firestore().collection('Help').doc(table_number)
        .update({helpNeeded: 0})
            .then(() => {
                isSuccess = true;
            })
        .catch (error => {
            console.log('Error getting documents', error);
            isSuccess = false;
        });

        return isSuccess;
    }

    let table_number = 0; // no table number 0
    tableHelped(table_number);
});

///////////////////////////////////////////////Menu_operations Section

//this function is used to get the items on the menu based on their type
//the functions parameter is a string which is the menu type i.e, getMenu('entree')
it("should get menu items based on type: error", async () => {
    async function getMenu(type) {
        let query;

        await firebase.firestore().collection('Menu').where('type', '==', type).get()
        .then(snapshot => {
            query = snapshot.docs.map(doc => doc.data());
        })
        .catch (error => {
            console.log('Error getting documents', error);
            query = null;
        });

        let items = [];

        for (i in query) {

            let isAvailable = true;

            for (j in query[i].ingredients) {

                await getIngredientQuantity(query[i].ingredients[j])
                    .then((quantity) => {
                        if (quantity == 0) {
                            isAvailable = false;
                        }
                    })
                    .catch (error => {
                        console.log('Error getting documents', error);
                    });

                if (!isAvailable) {
                    break;
                }
            }

            if (isAvailable) {
                items.push(query[i]);
            }
        }

        return items;
    }

    getMenu('DUBS'); // no dubs menu option
});

//this function is used to add Menu item
//the functions parameter is a item object.
//for example:
/*let item = {
 allergen: ['Egg' , 'Milk'],
 calories: 750,
 ingredients: ['cheese', 'tomato sauce', 'pepperoni'],
 name: 'Pizza',
 price: 6.99,
 type: 'entree',
 uri: 'image link'
 }*/
 //then pass item to the function i.e, addToMenu(item)
it("should add item to menu: error", async () => {
    async function addToMenu(item) {
        let isSuccess;
        firebase.firestore().collection('Menu').doc(item.name).set(item)
        .then(() => {
            console.log("Successfully added item to the menu.");
            isSuccess = true;
        })
        .catch((error) => {
            alert("Error adding item to menu: ", error);
            isSuccess = false;
        });
        return isSuccess;
    }

    let item = {
     allergen: ['Egg' , 'Milk'],
     calories: 750,
     ingredients: ['cheese', 'tomato sauce', 'pepperoni'],
     name: 'Pizza',
     price: 6.99,
     type: 'entree',
     uri: 'image link'
     };

     addToMenu();
});

//this function is used to update menu item information to the database
//the functions parameter is a item object.
//for example:
/*let item = {
 allergen: ['Egg', 'Milk'],
 calories: 850,
 ingredients: ['blue cheese', 'tomato sauce', 'pineapple'],
 name: 'Pizza',
 price: 7.99,
 type: 'entree',
 uri: 'image link'
 }*/
//then pass item to the function i.e, updateMenuItem(item)
//this will update the the Pizza menu item's calories to 850,
//the ingredients array will be changed to have the values ['blue cheese', 'tomato sauce', 'pineapple']
//the name will remain the same
//the price will be changed to be 7.99
//the type will remain entree
//the uri can be changed to whatever image link you want
//updateMenuItem(item)
it("should update menu item: error", async () => {
    async function updateMenuItem(item) {
        let isSuccess;

        await firebase.firestore().collection('Menu').doc(item.name).update(item)
        .then(() => {
            isSuccess = true;
        })
        .catch((error) => {
            console.error("Error updating item in menu: ", error);
            isSuccess = false;
        });

        return isSuccess;
    }
    let item = {
     allergen: ['Egg', 'Milk'],
     calories: 850,
     ingredients: ['blue cheese', 'tomato sauce', 'pineapple'],
     name: 'Jabroni', // no item with name jabroni
     price: 7.99,
     type: 'entree',
     uri: 'image link'
     }

     updateMenuItem(item);
});

//this function is used to get menu information from the database
//the functions parameter is a string which is the menu item name i.e., getItemDetails('Pizza') will get the menu item data for the menu item who's named is Pizza
it("should get menu item details: error", async () => {
    async function getItemDetails(itemName) {
        let query;

        await firebase.firestore().collection('Menu').where('name', '==', itemName).get()
        .then((snapshot) => {
            query = snapshot.docs.map(doc => doc.data());
        })
        .catch ((error) => {
            console.log('Error getting document', error);
            query = null;
        });

        return query;
    }

    getItemDetails('Jabroni'); // no item with name jabroni
});

//this function is used to check a particular items inventory is not empty
//the parameter for this function is a string which is the name of the item i.e., checkInventory('Sugar')
it("should check ingredient count: error", async () => {
    async function checkInventory(name) {
        let query;
        await firebase.firestore().collection('Inventory').where('ingredientName', '==', name).get()
            .then(snapshot => {
                query = snapshot.docs.map(doc => doc.data());
            })
            .catch(error => {
                console.log('Error getting documents', error);
                query = null;
            });

        if (query == null) {
            return null;
        }

        if (query[0].ingredientQuantity == 0) {
            return 0;
        } else
            return 1;
    }

    checkInventory('jabroni'); // no item with name jabroni
});

//this function is used to delete a Menu item from the database
//the functions parameter is a string which is the menu item name i.e., deleteFromMenu('Pizza') will delete the menu item who's name is Pizza
it("should delete item from menu: error", async () => {
    async function deleteFromMenu(itemName) {
        let isSuccess;
        firebase.firestore().collection('Menu').doc(itemName).delete()
        .then(() => {
            console.log("Successfully deleted item from the menu.");
            isSuccess = true;
        })
        .catch((error) => {
            alert("Error deleting item from menu: ", error);
            isSuccess = false;
        });
        return isSuccess;
    }

    deleteFromMenu('jabroni'); // no item with name jabroni
});

///////////////////////////////////////////////Orders Section

//function will add a order to the database
//the function will return the orderID
//the functions parameter is a string which is the customerID
//for example createOrder("l8qDPeaGzOC4egZMW5hW", "3")
it("should create order: error", async () => {
    async function createOrder(custID, tableNum) {
        let autoID = firebase.firestore().collection('Orders').doc().id;

        let potentialError;

        await firebase.firestore().collection('Orders').doc(autoID).set({
            customerID: custID,
            order: null,
            waitstaff: null,
            tableNumber: tableNum,
            completionStatus: false,
            price: null,
            requests: null,
            orderId: autoID
        })
        .then(() => {
            console.log("Successfully created order.");
            isSuccess = true;
        })
        .catch((error) => {
            console.log("Error creating Order: ", error);
            potentialError = error;
            isSuccess = false;
        });

        if (!isSuccess) {
            return potentialError;
        }

        return autoID;
    }

    createOrder();
});

//this function will add an item to the order
//the parameter orderID is a string, and item is  a array of items
//for example:
//let item=['Pizza', 'Cheese Cake'],
//addItemToOrder('v6J7iJmyHxW5CIdCosvK', item)
it("should add item to order: error", async () => {
    async function addItemToOrder(orderID, item) {
        let isSuccess;

        await firebase.firestore().collection('Orders').doc(orderID).update({ item })
        .then((success) => {
            isSuccess = true;
        })
        .catch((error) => {
            console.log('Error adding to order: ', error);
            isSuccess = false;
        });

        return isSuccess;
    }

    let item = [];
    addItemToOrder('v6J7iJmyHxW5CIdCosvK', item);
});

//this function will remove an order from the data base
//orderId is a string which is the order ID
//for example: removeOrder('v6J7iJmyHxW5CIdCosvK')
it("should remove order from database: error", async () => {
    async function removeOrder(orderId) {
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

    removeOrder('jabroni'); // no order 'jabroni' available
});

//this function gets all the orders in the database
it("should get all orders: error", async () => {
    async function getOrders() {
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

    getOrders('1'); // unused parameter
});

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
it("should update order info: error", async () => {
    async function updateOrderInformation(item) {
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

    let item = {
         completionStatus: false,
         customerID: "l8qDPeaGzOC4egZMW5hW",
         orderID: "jabroni", // incorrect order id
         orderedItems: ["Pizza" ,"Apple Pie"],
         price: 8.99,
         requests: "none",
         tableNumber: "3",
         waitstaff: "4MfW9403U5WqT5cSIgbG"
     }

    updateOrderInformation(item);
});

//this function will get table orders
//the parameter is a string which is the table number
//for example getTableOrders('3')
it("should get table orders: error", async () => {
    async function getTableOrders(tableNumber){

        let orders = []

        await firebase.firestore().collection('Inventory').where('tableNumber', '==', tableNumber).get()
        .then((snapshot) => {
            orders = snapshot.docs.map(doc => doc.data());
            console.log('Successfully retrieved orders.')
        })
        .catch ((error) => {
            alert('Unable to retrieve order information', error);
        });

        if (orders = []) {
            return 'No orders for this table';
        }

        return orders;
    }

    getTableOrders('99'); // no table 99
});

it("should confirm order: error", async () => {
    async function confirmOrder(ordID, custID, tableNum, items){
    //     for (i in items) {
    //         if (items[i].quantity > 0) {
    //             order.push(items[i]);
    //         }
    //     }

        let newArray = [];
        let uniqueObject = {};

        for (i in items) {
            let objTitle = items[i]['name'];
            uniqueObject[objTitle] = items[i];
        }

        for (i in uniqueObject) {
            newArray.push(uniqueObject[i]);
        }

        let order = newArray;
        let inventory;

        await firebase.firestore().collection('Inventory').get()
        .then((snapshot) => {
            inventory = snapshot.docs.map(doc => doc.data());
        })
        .catch ((error) => {
            console.log('Error getting document', error);
            inventory = null;
        });

        if (inventory == null) {
            return false;
        }

        let hasEnoughInventory = true;

        for (i in order) {
            for (j in order[i].ingredients) {
                for (k in inventory) {
                    if (inventory[k].ingredientName == order[i].ingredients[j] && inventory[k].ingredientQuantity == 0) {
                        hasEnoughInventory = false;
                        break;
                    }
                }
            }
        }

        if (!hasEnoughInventory) {
            return false;
        }

        let finalizedOrder = [];
        let totalPrice = 0;

        for (i in order) {
            finalizedOrder.push(order[i].name.concat(" ", order[i].quantity.toString()));
            totalPrice += (order[i].quantity * order[i].price);
        }

        let staffID;
        let isSuccess;

        await firebase.firestore().collection('Tables').where('tableNumber', '==', tableNum).get()
        .then((snapshot) => {
            console.log('Successfully retrieved waitstaff id.');
            staffID = snapshot.docs.map(doc => doc.data());
            isSuccess = true;
        })
        .catch((error) => {
          alert("Error getting waitstaff id from table: ", error);
          isSuccess = false;

        });

        if (!isSuccess) {
            return false;
        }

        staffID = staffID[0];

        let completeOrder = {
            completionStatus: false,
            customerID: custID,
            waitstaff: staffID,
            orderID: ordID,
            orderedItems: finalizedOrder,
            price: totalPrice,
            requests: 'none',
            tableNumber: tableNum
        };

        await firebase.firestore().collection('Orders').doc(completeOrder.orderID).update(completeOrder)
        .then((success) => {
            isSuccess = true;
        })
        .catch((error) => {
            console.log('Error adding to order: ', error);
            isSuccess = false;
        });

        return isSuccess;

    }

    //confirmOrder(ordID, custID, tableNum, items)
    let items = ["Pizza" ,"Apple Pie"];
    confirmOrder("v6J7iJmyHxW5CIdCosvK", "l8qDPeaGzOC4egZMW5hW", "99", items); // no table 99
});

///////////////////////////////////////////////Question Section

//this function will add a question doc to the database
//the functions parameter is a doc object.
//for example:
/*let doc = {
    orderID: '03se9wEgk4rYmbBB9Bv4',
    questions: ['How was your experience at our restaurant', 'How was our service','How was the quality of our food'],
    review: ['Bad', 'Good','Trash']
    }*/
//then pass doc to the function i.e, addQuestionDoc(doc)
it("should add question to question collection: error", async () => {
    async function addQuestionDoc(doc) {
        let isSuccess;
        await firebase.firestore().collection('Question').add(doc)
        .then(() => {
            console.log("Successfully added question doc to the question collection.");
            isSuccess = true;
        })
        .catch((error) => {
            alert("Error adding question doc to the question collection: ", error);
            isSuccess = false;
        });
        return isSuccess;
    }

    let doc = {
        orderID: 'Incorrect',
        questions: ['How was your experience at our restaurant','How was our service','How was the quality of our food'],
        review: ['Bad','Good','Trash']
        };
    addQuestionDoc(doc); // orderID won't be found
});

it("should get all questions in collection: error", async () => {
    //this function will get all of the question docs in the Question collection
    async function getQuestionDocs() {
        let questionDoc = []

        await firebase.firestore().collection('Question').get()
        .then((snapshot) => {
            questionDoc = snapshot.docs.map(doc => doc.data());
        })
        .catch ((error) => {
            alert('Failure getting question docs.', error);
        });

        return questionDoc;
    }

    getQuestionDocs('l'); // unused parameter
});

///////////////////////////////////////////////Question Section

//this function will add a question doc to the database
//the functions parameter is a doc object.
//for example:
/*let doc = {
    orderID: '03se9wEgk4rYmbBB9Bv4',
    questions: ['How was your experience at our restaurant', 'How was our service','How was the quality of our food'],
    review: ['Bad', 'Good','Trash']
    }*/
//then pass doc to the function i.e, addQuestionDoc(doc)
it("should add question to question collection", async () => {
    async function addQuestionDoc(doc) {
        let isSuccess;
        await firebase.firestore().collection('Question').add(doc)
        .then(() => {
            console.log("Successfully added question doc to the question collection.");
            isSuccess = true;
        })
        .catch((error) => {
            alert("Error adding question doc to the question collection: ", error);
            isSuccess = false;
        });
        return isSuccess;
    }

    let doc = {
        orderID: '03se9wEgk4rYmbBB9Bv4',
        questions: ['How was your experience at our restaurant','How was our service','How was the quality of our food'],
        review: ['Bad','Good','Trash']
        };
    addQuestionDoc(doc);
});

it("should get all questions in collection", async () => {
    //this function will get all of the question docs in the Question collection
    async function getQuestionDocs() {
        let questionDoc = []

        await firebase.firestore().collection('Question').get()
        .then((snapshot) => {
            questionDoc = snapshot.docs.map(doc => doc.data());
        })
        .catch ((error) => {
            alert('Failure getting question docs.', error);
        });

        return questionDoc;
    }

    getQuestionDocs();
});

//popular items

it("should reset all popular items", async () => {
    async function resetPopularItems() {
        let query;
        let isSuccess = true;

        await firebase.firestore().collection('Menu').get()
        .then(snapshot => {
            query = snapshot.docs.map(doc => doc.data());
        })
        .catch (error => {
            console.log('Error getting documents', error);
            isSuccess = false;
        });

        if (!isSuccess) {
            return false;
        }
        
        for (i in query) {
            if (query[i].popular) {
                query[i].popular = false;
        
                await firebase.firestore().collection('Menu').doc(query[i].name).set(query[i])
                .then(snapshot => {
                    console.log('Succesfully updated document.');
                })
                .catch (error => {
                    console.log('Error getting documents', error);
                    isSuccess = false;
                });
            }
        }
        
        if (!isSuccess) {
            return false;
        }

        return true;

    }

    resetPopularItems()
});

it("should set all popular items", async () => {

    async function setPopularItems() {
        let query;
        let isSuccess = true;
        let month = new Date();
        month = month.getMonth();
        
        await firebase.firestore().collection('Menu').where('month', '==', month).get()
        .then(snapshot => {
            if (dataSnapshot.exists()) {
                query = snapshot.docs.map(doc => doc.data());
            }
            else {
                query = null;
            }
        })
        .catch (error => {
            console.log('Error getting documents', error);
            isSuccess = false;
        });
                                                            
        if (!isSucess) {
            return false;
        }
        
        if (query == null) {
            await firebase.firestore().collection('Menu').doc('CurrentMonth').set({month: month})
            .then(snapshot => {
                console.log('Success updated month', error);
            })
            .catch (error => {
                console.log('Error getting documents', error);
                isSuccess = false;
            });
            
            //need to reset orderTotal
        }
        
        
        
        
        await firebase.firestore().collection('Menu').orderBy('orderTotal', 'desc').get()
        .then(snapshot => {
            query = snapshot.docs.map(doc => doc.data());
        })
        .catch (error => {
            console.log('Error getting documents', error);
            isSuccess = false;
        });
        
        if (!isSuccess) {
            return false;
        }
        

        for (let i = 0; i < 5; i++) {
            query[i].popular = true;

            await firebase.firestore().collection('Menu').doc(query[i].name).set(query[i])
            .then(snapshot => {
                console.log('Succesfully updated document.');
            })
            .catch (error => {
                console.log('Error getting documents', error);
                isSuccess = false;
            });
        }

        if (!isSuccess) {
            return false;
        }

        return true;

    }
    setPopularItems()
});
