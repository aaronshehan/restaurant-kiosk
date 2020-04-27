import firebase from '@react-native-firebase/app';
import '@react-native-firebase/functions';
import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

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
      export async function updateMonthlyRevenue(revenue) {
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
export async function updateDailyRevenue(revenue) {
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

//gets the daily revenue in the database
export async function getDailyRevenue() {
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

//gets the monthly revenue in the database
export async function getMonthlyRevenue() {
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
