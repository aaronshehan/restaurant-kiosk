import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text, TouchableHighlight, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

/* This function needs to pull from the database and display the data using the
   Container/formatting below
*/

export default function ViewInventory ({ navigation }) {

        return (
        <View style = {{flex: 1}}>
            <View style={styles.background}>
                <ScrollView style= {styles.scrollView}>
                        <View style={styles.inventoryContainer}>
                            <Text style={styles.inventoryContainerText}>
                                Ingredient: Test
                            </Text>
                            <Text style={styles.inventoryContainerText}>
                                Quantity: 999
                            </Text>
                        </View>
                        <View style={styles.inventoryContainer}>
                            <Text style={styles.inventoryContainerText}>
                                Ingredient: Test 2
                            </Text>
                            <Text style={styles.inventoryContainerText}>
                                Quantity: 25
                            </Text>
                        </View>
                        <View style={styles.inventoryContainer}>
                            <Text style={styles.inventoryContainerText}>
                                Ingredient: Test 3
                            </Text>
                            <Text style={styles.inventoryContainerText}>
                                Quantity: 600
                            </Text>
                        </View>
                        <View style={styles.inventoryContainer}>
                            <Text style={styles.inventoryContainerText}>
                                Ingredient: Test 4
                            </Text>
                            <Text style={styles.inventoryContainerText}>
                                Quantity: 60
                            </Text>
                        </View>
                        <View style={styles.inventoryContainer}>
                            <Text style={styles.inventoryContainerText}>
                                Ingredient: Test 5
                            </Text>
                            <Text style={styles.inventoryContainerText}>
                                Quantity: 1
                            </Text>
                        </View>
               </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    inventoryContainer:
    {
        backgroundColor: '#3333ff',
        height: 100,
        width: 800,
        alignItems: 'flex-start',
        margin: 30,
        padding: 10
    },

    inventoryContainerText:
    {
        fontSize: 24,
        color: '#ffffff',
    },

    scrollView:
    {
        paddingLeft: 140,
        backgroundColor: '#3498db',
    },

    background: {
        marginLeft: 80,
        marginRight: 80,
        flex: 1,
    },
})