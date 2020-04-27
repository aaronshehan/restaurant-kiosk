import firebase from '@react-native-firebase/app';
import '@react-native-firebase/functions';
import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import { getIngredientQuantity } from '../inventory/inventory';


//this function is used to get the items on the menu based on their type
//the functions parameter is a string which is the menu type i.e, getMenu('entree')
export async function getMenu(type) {
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
export function addToMenu(item) {
    firebase.firestore().collection('Menu').doc(item.name).set(item)
    .then(() => {
        console.log("Successfully added item to the menu.");
    })
    .catch((error) => {
        alert("Error adding item to menu: ", error);
    });
}


//this function is used to delete a Menu item from the database
//the functions parameter is a string which is the menu item name i.e., deleteFromMenu('Pizza') will delete the menu item who's name is Pizza
export function deleteFromMenu(itemName) {
    firebase.firestore().collection('Menu').doc(itemName).delete()
    .then(() => {
        console.log("Successfully deleted item from the menu.");
    })
    .catch((error) => {
        alert("Error deleting item from menu: ", error);
    });
}


//this function is used to update menu item infromation to the database
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
export async function updateMenuItem(item) {
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


//this function is used to get menu information from the database
//the functions parameter is a string which is the menu item name i.e., getItemDetails('Pizza') will get the menu item data for the menu item who's named is Pizza
export async function getItemDetails(itemName) {
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


//this function is used to check a particular items inventory is not empty
//the parameter for this function is a string which is the name of the item i.e., checkInventory('Sugar')
export async function checkInventory(name) {
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
