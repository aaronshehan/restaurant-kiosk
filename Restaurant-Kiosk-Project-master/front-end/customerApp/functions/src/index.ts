import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
admin.initializeApp()

export const getEntrees = functions.https.onRequest((request, response) => {
    const promise =  admin.firestore().doc('Menu/Entrees').get()
    const p2 = promise.then(snapshot => {
            const data = snapshot.data()
            response.send(data)
        })
        p2.catch(error => {
            console.log(error)
            response.status(500).send(error)
        })
    });

export const getBeverages = functions.https.onRequest((request, response) => {
    const promise =  admin.firestore().doc('Menu/Beverages').get()
    const p2 = promise.then(snapshot => {
            const data = snapshot.data()
            response.send(data)
        })
        p2.catch(error => {
            console.log(error)
            response.status(500).send(error)
        })
    });

export const getDesserts = functions.https.onRequest((request, response) => {
    const promise =  admin.firestore().doc('Menu/Desserts').get()
    const p2 = promise.then(snapshot => {
            const data = snapshot.data()
            console.log(data)
            response.send(data)
        })
        p2.catch(error => {
            console.log(error)
            response.status(500).send(error)
        })
    });

exports.addItem = functions.https.onCall((data, context) => {
    return "functions success";
});
 
 
 
 
// TODO: add item
// TODO: remove item
 // TODO: edit item
