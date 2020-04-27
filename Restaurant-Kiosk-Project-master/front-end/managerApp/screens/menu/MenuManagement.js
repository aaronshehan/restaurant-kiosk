import React, {Component, useState} from 'react';
import { StyleSheet, ImageBackground, Text, View, Button, TouchableHighlight,} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function MenuManagement ({ navigation }) {
    return (
    <View style= {{flex: 1}}>
        <View style ={styles.background}>

            <View style={styles.mainMenu}>
                    <TouchableHighlight style={styles.menuButton}
                     onPress={() => navigation.navigate('Appetizers')}>
                         <Text style = {styles.menuText}>
                             Appetizers
                         </Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.menuButton}
                     onPress={() => navigation.navigate('Beverages')}>
                         <Text style = {styles.menuText}>
                             Beverages
                         </Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.menuButton}
                     onPress={() => navigation.navigate('Entrees')}>
                         <Text style = {styles.menuText}>
                             Entrees
                         </Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.menuButton}
                     onPress={() => navigation.navigate('Desserts')}>
                         <Text style = {styles.menuText}>
                             Desserts
                         </Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.menuButton}
                     onPress={() => navigation.navigate('FiveDollar')}>
                         <Text style = {styles.menuText}>
                             Five Dollar Menu
                         </Text>
                    </TouchableHighlight>
            </View>
       </View>
    </View>
    )
}


const styles = StyleSheet.create({

    background: {
        flex: 1,
        backgroundColor: '#3498db'
    },

    logoutButton: {
        justifyContent: 'flex-start',
        height: 100,
        width: 160,
        margin: 20,
        backgroundColor: '#990000',
        alignItems: 'center',
        justifyContent: 'center',
    },

    mainMenu: {
        margin: 200,
        paddingTop: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexShrink: 2.0,
    },

    menuButton: {
        width: 220,
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        padding: 5,
        backgroundColor: '#3333ff'
    },

    menuText: {
        fontSize: 21,
        color: '#ffffff',
    },

    logoutText: {
            color: '#ffffff',
            fontSize: 20,
        },
})

export default MenuManagement;