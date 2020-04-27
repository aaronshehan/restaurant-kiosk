import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text, Button, Alert, TouchableHighlight, ScrollScreen } from 'react-native';

/*This function needs to use the 'addToInventory' function to add items to the
  inventory database
*/

export default function EditInventory (){
        return (
            <View style={styles.background}>
                <View style={styles.addItemContainer}>
                    <TextInput
                    placeholder="Item Name"
                    placeholderTextColor='rgba(255,255,255,0.7)'
                    style={styles.input}
                    onChangeText={(val) => serName(val)} />

                    <TextInput
                    keyboardType = 'numeric'
                    placeholderStyle={{fontSize: 30}}
                    placeholder="Item Quantity"
                    placeholderTextColor='rgba(255,255,255,0.7)'
                    style={styles.input}
                    onChangeText={(val) => setQuantity(val)} />

                    <TouchableHighlight
                    style={styles.button}
                    onPress = {() => Alert.alert("Item has been added.")}>
                        <Text style={styles.buttonText}>
                            ADD ITEM
                        </Text>

                    </TouchableHighlight>
                </View>

                <View style={styles.removeItemContainer}>
                    <TextInput
                    placeholder="Name of item to remove"
                    placeholderTextColor='rgba(255,255,255,0.7)'
                    style={styles.input}
                    onChangeText={(val) => serName(val)} />

                    <TouchableHighlight
                    style={styles.button}
                    onPress = {() => Alert.alert("Item has been removed.")}>
                        <Text style={styles.buttonText}>
                            REMOVE ITEM
                        </Text>

                    </TouchableHighlight>
                </View>

            </View>
        );
}

const styles = StyleSheet.create({
    addItemContainer:{
        justifyContent: 'center',
        backgroundColor: '#3498db',
        margin: 50,
        padding: 20,
        height: 300,
    },

    background: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#3498db',
    },

    buttonText: {
        fontSize: 20,
    },

    removeItemContainer:{
        backgroundColor: '#3498db',
         flex:1,
         margin: 50,
         padding: 20,
         height: 150,
    },

    input: {
        height: 70,
        backgroundColor: 'gray',
        marginBottom: 10,
        color: 'black',
        paddingHorizontal: 10
    },

    button: {
        backgroundColor: 'white',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }

})