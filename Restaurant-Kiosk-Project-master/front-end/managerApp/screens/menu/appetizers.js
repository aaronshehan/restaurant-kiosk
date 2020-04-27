import React, { Component, useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text, TouchableHighlight, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import menu_operations from './menu_operations';
import {getMenu} from './menu_operations';
import {addToMenu} from './menu_operations';
import {deleteFromMenu} from './menu_operations';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/functions';
import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

 export default class Appetizers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            query: [],
        }
    }
//               OnButtonPress = async (orderID, completionStatus) => {
//                   const orderStatus = { orderID, completionStatus }
//                   // Backend function call.
//                   let completion = await updateOrderInformation(orderStatus)
//
//                   /* This is in function so that when the user clicks 'Ready'
//                    the order will disaper from the screen.*/
//                   let neworderDetails = await getTableOrders(this.props.tableId).then(
//                     order1 => {
//                       this.setState({ orderDetails: order1 }, function () {
//                         //console.log(this.state.orderDetails);
//                       })
//                     }
//                   )
//                 }

    OnUpdate = async (name,
                      calories,
                      price,
                      quantity,
                      type,
                      ingredients,
                      allergens
                      ) => {
        const updateMenu = {
                            name: name,
                            calories: calories,
                            price: price,
                            type: type,
                            ingredients: ingredients,
                            allergens: allergens
                            }
        let completion = await updateMenuItem(updateMenu)
                        .then(data => {
                              console.log(data);
                         })
                    }

  getData = async () => {
     let tempData = await getMenu('appetizer')
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

      return (
      <View style={styles.employeeContainer}>
          <TextInput
           placeholder=  {index.name}
           placeholderTextColor='rgba(255,255,255,1.0)'
           style={styles.input}
           />
          <TextInput
           placeholder=  {index.type}
           placeholderTextColor='rgba(255,255,255,1.0)'
           style={styles.input}
           />
          <Text style={styles.input}>
              {index.allergens}
          </Text>
          <TextInput
           placeholder=  {String(index.calories)}
           placeholderTextColor='rgba(255,255,255,1.0)'
           style={styles.input}
           />
           <Text style={styles.input}>
               {index.ingredients}
           </Text>

          <TextInput
           placeholder=  {String(index.price)}
           placeholderTextColor='rgba(255,255,255,1.0)'
           style={styles.input}
           />
          <TextInput
           placeholder=  {String(index.quantity)}
           placeholderTextColor='rgba(255,255,255,1.0)'
           style={styles.input}
           />
          <TouchableHighlight style={styles.removeEmployeeButton}
           onPress={() => deleteFromMenu(index.name)}>
              <Text style={styles.menuText}>
                  Remove Item From Menu
              </Text>
          </TouchableHighlight>
           <TouchableHighlight style={styles.removeEmployeeButton}
            onPress={() => alert('Menu Updated')}>
               <Text style={styles.menuText}>
                   Edit Item
               </Text>
           </TouchableHighlight>
      </View>
       )
   })

  return (

  <View style={styles.background}>
        <ScrollView>
            <TouchableHighlight style = {styles.buttons}
             onPress={() => this.props.navigation.navigate('NewMenuItem')}>
                <Text style={styles.menuText}>
                    Add New Menu Item
                </Text>
             </TouchableHighlight>
             <TouchableHighlight style = {styles.buttons}
              onPress={() => this.getData()}>
                 <Text style={styles.menuText}>
                     Update Menu
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
        height: 450,
        width: 800,
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        margin: 40,
        padding: 10
    },

    employeeContainerText:
    {
        fontSize: 21,
        color: '#ffffff',

    },

    scrollView:
    {
        backgroundColor: '#ffffff',
        paddingLeft: 400,
        alignItems: 'center'
    },
})