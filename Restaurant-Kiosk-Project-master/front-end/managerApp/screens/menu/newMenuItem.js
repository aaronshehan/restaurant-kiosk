import React, { Component, useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/functions';
import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {addToMenu} from './menu_operations';

const newMenuItem = ({navigation}) => {

    const [name, setName] = useState('');
    const [allergens, setAllergens] = useState('');
    const [calories, setCalories] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [type, setType] = useState('');

    const _onNewMenuItemPressed = () => {

//            if (name === '') return alert('Enter Name');
//            if (email === '') return alert('Enter Email');
//            if (password === '') return alert('Enter Password');
//            if (role === '') return alert('Enter Role');
//            if (DOB === '') return alert('Enter DOB');

            const newItem = {
                name: name,
                allergens: allergens,
                ingredients: allergens,
                calories: calories,
                price: price,
                quantity: quantity,
                requests: 'none',
                type: type,
                uri: '',
            }

            addToMenu(newItem);
    }


        return (
            <View style={styles.container}>

                <TextInput
                placeholder="Name"
                placeholderTextColor='rgba(255,255,255,0.7)'
                style={styles.input}
                onChangeText={(val) => setName(val)}
                value={name}
                />

                <TextInput
                placeholder="Allergens"
                placeholderTextColor='rgba(255,255,255,0.7)'
                style={styles.input}
                onChangeText={(val) => setAllergens(val)}
                value={allergens}
                />

                <TextInput
                placeholder="Ingredients"
                placeholderTextColor='rgba(255,255,255,0.7)'
                style={styles.input}
                onChangeText={(val) => setIngredients(val)}
                value={ingredients}
                />

                <TextInput
                placeholder="Calories"
                placeholderTextColor='rgba(255,255,255,0.7)'
                style={styles.input}
                onChangeText={(val) => setCalories(val)}
                value={calories}
                />

                <TextInput
                placeholder="Price"
                placeholderTextColor='rgba(255,255,255,0.7)'
                style={styles.input}
                onChangeText={(val) => setPrice(val)}
                value={price}
                />

                 <TextInput
                 placeholder="Quantity"
                 placeholderTextColor='rgba(255,255,255,0.7)'
                 style={styles.input}
                onChangeText={(val) => setQuantity(val)}
                value={quantity}
                 />

                <TextInput
                 placeholder="Type (entree, dessert, five dollar, beverage, or appetizer)"
                 placeholderTextColor='rgba(255,255,255,0.7)'
                 style={styles.input}
                 onChangeText={(val) => setType(val)}
                 value={type}
                 />


                <Button
                style={styles.addPosition}
                title="Add to Menu" onPress = {_onNewMenuItemPressed}>
                </Button>
            </View>
        );
    }

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

    export default newMenuItem;