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

 export default class Entrees extends React.Component {
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

    OnUpdate = async (empID, newData) => {
        const updateEmp = { empID, newData }
        // Backend function call.
        let completion = await updateEmployeeInformation(updateEmp)
        /* This is in function so that when the user clicks 'Ready'
         the order will disappear from the screen.*/
        let newEmpDetails = await getEmployees(this.props.id).then(
          emp1 => {
            this.setState({ orderDetails: emp1 }, function () {
              console.log(this.state.orderDetails);
            })
          }
        )
      }

  getData = async () => {
     let tempData = await getMenu('entree')
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
          <Text style={styles.employeeContainerText}>
              Name: {index.name}
          </Text>
          <Text style={styles.employeeContainerText}>
              Type: {index.type}
          </Text>
          <Text style={styles.employeeContainerText}>
              Allergens: {index.allergens}
          </Text>
          <Text style={styles.employeeContainerText}>
              Calories: {index.calories}
          </Text>
          <Text style={styles.employeeContainerText}>
              Ingredients: {index.ingredients}
          </Text>
          <Text style={styles.employeeContainerText}>
              Price: {index.price}
          </Text>
          <Text style={styles.employeeContainerText}>
              Quantity: {index.quantity}
          </Text>

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