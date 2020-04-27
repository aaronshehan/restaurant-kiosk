import firebase from '@react-native-firebase/app';
import '@react-native-firebase/functions';
import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

export async function callServer(tableNumber) {
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

export async function setToFalse(tableNumber) {
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
        console.error("Error updating callServer table", error);
        isSuccess = false;
    });

    return isSuccess;
}
