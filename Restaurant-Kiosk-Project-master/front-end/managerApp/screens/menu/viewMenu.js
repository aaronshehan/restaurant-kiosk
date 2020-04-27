import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text, TouchableHighlight, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function ViewMenu ({ navigation }) {

        return (
        <View style = {{flex: 1}}>
            <View style={styles.background}>
                <ScrollView style= {styles.scrollView}>
                   <View style={styles.menuContainer}>
                       <Text style={styles.menuContainerText}>
                           Test Item 1
                       </Text>
                   </View>
                   <View style={styles.menuContainer}>
                       <Text style={styles.menuContainerText}>
                           Test Item 2
                       </Text>
                   </View>
                   <View style={styles.menuContainer}>
                       <Text style={styles.menuContainerText}>
                           Test Item 3
                       </Text>
                   </View>
               </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    menuButton: {
        width: 220,
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: 5,
        backgroundColor: '#3333ff'
    },

    menuText: {
        fontSize: 24,
        color: '#ffffff',
        textAlign: 'center'
    },

    menuContainer:
    {
        backgroundColor: '#3333ff',
        height: 200,
        alignItems: 'center',
        margin: 30,
        padding: 10
    },

    menuContainerText:
    {
        fontSize: 24,
        color: '#ffffff',
    },

    scrollView:
    {
        backgroundColor: '#ffffff',

    },

    menu: {
        margin: 100,
        paddingTop: 100,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        flexShrink: 2.0,
    },

    background: {
        flex: 1,
        backgroundColor: '#3498db'
    },
})