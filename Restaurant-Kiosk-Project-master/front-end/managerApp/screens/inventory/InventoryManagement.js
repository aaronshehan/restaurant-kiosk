import React, { Component, useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text, TouchableHighlight, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/functions';
import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import inventory from './inventory'
import {getInventory} from './inventory';
import {deleteFromInventory} from './inventory';
import {updateInventory} from './inventory';

 export default class InventoryManagement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            query: [],
        }
    }

  getData = async () => {
     let tempData = await getInventory()
       .then(data => {
         this.setState({ query : data })
         console.log(data);
       })
       .catch(error => {
         console.error(error)
       })
   }

   render () {
   {this.getData()}

   const mapInventory = this.state.query.map(index => {

   const newInventory = {
         ingredientName: "Apple",
         ingredientQuantity: 450,
   }

      return (
      <View style={styles.employeeContainer}>

          <TextInput
           placeholder=  {index.name}
           placeholderTextColor='rgba(255,255,255,1.0)'
           style={styles.input}
           />

          <TextInput
           placeholder=  {String(index.ingredientQuantity)}
           placeholderTextColor='rgba(255,255,255,1.0)'
           style={styles.input}
           />

          <TouchableHighlight style={styles.removeEmployeeButton}
           onPress={() => deleteFromInventory(index.ingredientName)}>
              <Text style={styles.menuText}>
                  Remove Inventory Item
              </Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.removeEmployeeButton}
           onPress={() => alert('Inventory Updated')}>
              <Text style={styles.menuText}>
                  Commit Edits
              </Text>
          </TouchableHighlight>

      </View>
       )
   })

  return (

  <View style={styles.background}>
        <ScrollView>
            <TouchableHighlight style = {styles.buttons}
             onPress={() => this.props.navigation.navigate('NewInventoryItem')}>
                <Text style={styles.menuText}>
                    Add New Inventory Item
                </Text>
             </TouchableHighlight>

             <TouchableHighlight style = {styles.buttons}
              onPress={() => this.getData()}>
                 <Text style={styles.menuText}>
                     Update Inventory
                 </Text>
             </TouchableHighlight>

        {mapInventory}
        </ScrollView>
  </View>
  );
 }
}

const styles = StyleSheet.create({

    input: {
                height: 60,
                marginBottom: 10,
                color: 'white',
                fontSize: 21,
                paddingHorizontal: 10
    },

    background: {
            flex: 1,
            backgroundColor: '#3498db',
            alignItems: 'center'
        },

        buttons: {
            alignItems: 'center',
            justifyContent: 'center',
            height: 60,
            backgroundColor: '#595959',
            margin: 20
        },

        removeEmployeeButton: {
            alignSelf: 'stretch',
            height: 40,
            alignItems: 'center',
            backgroundColor: '#ff6600',
            margin: 10
        },

    menuText: {
        fontSize: 21,
        color: '#ffffff',
    },

    employeeContainer:
    {
        backgroundColor: '#3333ff',
        height: 220,
        width: 800,
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        margin: 20,
        padding: 18
    },

    employeeContainerText:
    {
        fontSize: 24,
        color: '#ffffff',

    },

    scrollView:
    {
        backgroundColor: '#ffffff',
        paddingLeft: 400,
        alignItems: 'center'
    },
})