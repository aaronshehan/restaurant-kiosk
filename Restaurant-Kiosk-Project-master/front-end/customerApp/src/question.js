import firebase from '@react-native-firebase/app';
import '@react-native-firebase/functions';
import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'


//this function will add a question doc to the database
//the functions parameter is a doc object.
//for example:
/*let doc = {
    orderID: '03se9wEgk4rYmbBB9Bv4',
    questions: ['How was your experience at our restaurant', 'How was our service','How was the quality of our food'],
    review: ['Bad', 'Good','Trash']
    }*/
//then pass doc to the function i.e, addQuestionDoc(doc)

export async function addQuestionDoc(doc) {
    let isSuccess;
    await firebase.firestore().collection('Question').add(doc)
    .then(() => {
        console.log("Successfully added question doc to the question collection.");
        isSuccess = true;
    })
    .catch((error) => {
        console.log("Error adding question doc to the question collection: ", error);
        isSuccess = false;
    });
    return isSuccess;
}

//this function will get all of the question docs in the Question collection
export async function getQuestionDocs() {
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