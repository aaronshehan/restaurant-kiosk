import React, { Component, useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/functions';
import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

const newInventoryItem = ({navigation}) => {

    const [ingredientName, setName] = useState('');
    const [ingredientQuantity, setQuantity] = useState('');

    const _onNewInventoryPressed = () => {

            if (ingredientName === '') return alert('Enter Name');
            if (ingredientQuantity === '') return alert('Enter Quantity');

            const inventoryItem = {
                ingredientName: ingredientName,
                ingredientQuantity: ingredientQuantity,
            }

            addToInventory(inventoryItem);
    }

    async function addToInventory(inventoryItem) {
        await firebase.firestore().collection('Inventory').doc(inventoryItem.ingredientName).set(inventoryItem)
        .then(() => {
            console.log("Successfully added Ingredient to the ingredient doc.");
            alert('New Item Added');
        })
        .catch((error) => {
            alert("Error adding ingredient to doc: ", error);
        });
    }



        return (
            <View style={styles.container}>

                <TextInput
                placeholder="Ingredient Name"
                placeholderTextColor='rgba(255,255,255,0.7)'
                style={styles.input}
                onChangeText={(val) => setName(val)}
                value={ingredientName}
                />

                <TextInput
                placeholder="Ingredient Quantity"
                placeholderTextColor='rgba(255,255,255,0.7)'
                style={styles.input}
                onChangeText={(val) => setQuantity(val)}
                value={ingredientQuantity}
                />

                <Button
                style={styles.addPosition}
                title="Add Item" onPress = {_onNewInventoryPressed}>

                </Button>
            </View>
        );
    }


export default newInventoryItem;

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        height: 60,
        backgroundColor: 'gray',
        marginBottom: 10,
        color: 'white',
        paddingHorizontal: 10
    },

})