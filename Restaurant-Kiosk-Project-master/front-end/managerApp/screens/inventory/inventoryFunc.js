
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/functions';
import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'


//this function is used to add inventory item
//the function takes a object as it's parameter
//for example:
//let item = {
    //ingredientName : 'Pizza Sauce',
    //ingredientQuantity : 1000
//}
//addToInventory(item)
export async function addToInventory(item) {
    await firebase.firestore().collection('Inventory').doc(item.ingredientName).set(item)
    .then(() => {
        console.log("Successfully added Ingredient to the ingredient doc.");
    })
    .catch((error) => {
        alert("Error adding ingredient to doc: ", error);
    });
}


//this function is used to delete inventory item
//the function takes a string as it's parameter which is the name of the ingredient
//for example: deleteFromInventory('Pizza Sauce')
export async function deleteFromInventory(itemName) {
    let isSuccess;

    await firebase.firestore().collection('Inventory').doc(ingredientName).delete()
    .then(() => {
        isSuccess = true;
    })
    .catch((error) => {
        console.error("Error deleting item from inventory: ", error);
        isSuccess = false;
    });

    return isSuccess;
}


//this function is used to update a particualr ingredient
//the function takes in a object as it's parameter
//for example:
//let ingredient = {
    //ingredientName : 'Pizza Sauce',
    //IngredientQuantity : 60
//}
//the ingredientName will remain the same
//this will update the ingredeint quanitity to be 60
export async function updateInventory(ingredient) {
    let isSuccess;

    await firebase.firestore().collection('Inventory').doc(ingredient.ingredientName).update(ingredient)
    .then(() => {
        isSuccess = true;
    })
    .catch((error) => {
        console.error("Error updating item in menu: ", error);
        isSuccess = false;
    });

    return isSuccess;
}


//this function is used to get the quantity of a particualr ingredient
//the functions parameter is a string which is the name of the ingredient
//i.e, getIngredientQuantity('Pizza Sauce')
export async function getIngredientQuantity(name) {
    let ingredient;

    await firebase.firestore().collection('Inventory').where('ingredientName', '==', name).get()
    .then((snapshot) => {
        ingredient = snapshot.docs.map(doc => doc.data());
    })
    .catch (error => {
        console.log('Error getting documents', error);
        ingredient = null;
    });

    if (ingredient != null) {
        return ingredient[0].ingredientQuantity;
    }

    return null;
}


//this function is used to get all the inventory in the database
export async function getInventory() {
    let query;

    await firebase.firestore().collection('Inventory').get()
    .then((snapshot) => {
        query = snapshot.docs.map(doc => doc.data());
    })
    .catch ((error) => {
        console.log('Error getting document', error);
        query = null;
    });
    
    return query;
}
