import firebase from '@react-native-firebase/app';
import '@react-native-firebase/functions';
import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

// function to see help status of all Tables
export async function tableHelpStatus() {
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

// function to mark a table needing help
// sets helpNeeded to 1 for table represented by table_number
export async function tableNeedsHelp(table_number) {
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

// function to mark a table as no longer needing help
// sets helpNeeded to 0 for table represented by table_number
export async function tableHelped(table_number) {
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