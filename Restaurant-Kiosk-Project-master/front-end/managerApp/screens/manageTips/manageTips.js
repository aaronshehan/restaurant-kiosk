import React, { Component, useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text, TouchableHighlight, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {getTransactions} from '../metrics/orders';


export default class manageTips extends React.Component {
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
        let completion = await updateEmployeeInformation(updateEmp)
        /* This is in function so that when the user clicks 'Ready'
         the order will disappear from the screen.*/
        let newEmpDetails = await getEmployees(this.props.id).then(
          emp1 => {
            this.setState({ updateEmployeeInformation: emp1 }, function () {
              console.log(this.state.updateEmployeeInformation);
            })
          }
        )
      }

  getData = async () => {
     let tempData = await getTransactions()
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

   const mapTransactions = this.state.query.map(index => {
      return (
      <View style={styles.employeeContainer}>
          <Text style={styles.employeeContainerText}>
              Amount Due: {index.amountDue}
          </Text>
          <Text style={styles.employeeContainerText}>
              discount: {index.discount}
          </Text>
          <Text style={styles.employeeContainerText}>
              order Total: {index.orderTotal}
          </Text>
          <Text style={styles.employeeContainerText}>
              Payment Method: {index.paymentMethod}
          </Text>
          <Text style={styles.employeeContainerText}>
              Tax: {index.tax}
          </Text>
          <Text style={styles.employeeContainerText}>
              Tips: {index.tips}
          </Text>
          <Text style={styles.employeeContainerText}>
              Waitstaff ID: {index.waitstaff}
          </Text>

          <TouchableHighlight style={styles.removeEmployeeButton}
           onPress={() => alert('Tip approved for this transaction!')}>
              <Text style={styles.menuText}>
                  Approve Tips
              </Text>
          </TouchableHighlight>
      </View>
       )
   })

  return (

  <View style={styles.background}>
        <ScrollView>

        {mapTransactions}
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