import React, { Component, useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text, TouchableHighlight, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {getEmployees} from './employees';
import {deleteEmployee} from './employees';
import {updateEmployeeInformation} from './employees';

 export default class EmployeeManangement extends React.Component {
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

    OnUpdate = async (newData) => {
        const updateEmp = { newData }
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
     let tempData = await getEmployees()
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
            placeholder= {index.name}
            placeholderTextColor='rgba(255,255,255,1.0)'
            style={styles.employeeContainerText}
         />
         <TextInput
            placeholder= {index.email}
            placeholderTextColor='rgba(255,255,255,1.0)'
            style={styles.employeeContainerText}
         />
         <TextInput
            placeholder= {index.role}
            placeholderTextColor='rgba(255,255,255,1.0)'
            style={styles.employeeContainerText}
         />
         <TextInput
            placeholder= {index.password}
            placeholderTextColor='rgba(255,255,255,1.0)'
            style={styles.employeeContainerText}
         />
         <TextInput
            placeholder= {index.dob}
            placeholderTextColor='rgba(255,255,255,1.0)'
            style={styles.employeeContainerText}
         />
         <TextInput
            placeholder= {index.id}
            placeholderTextColor='rgba(255,255,255,1.0)'
            style={styles.employeeContainerText}
         />
         <TextInput
            placeholder= {String(index.hourlyRate)}
            placeholderTextColor='rgba(255,255,255,1.0)'
            style={styles.employeeContainerText}
         />

          <TouchableHighlight style={styles.removeEmployeeButton}
           onPress={() => deleteEmployee(index.id)}>
              <Text style={styles.menuText}>
                  Remove Employee
              </Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.removeEmployeeButton}
           onPress={() => alert('Employee Updated')}>
              <Text style={styles.menuText}>
                  Edit Employee
              </Text>
          </TouchableHighlight>
      </View>
       )
   })

  return (

  <View style={styles.background}>
        <ScrollView>
            <TouchableHighlight style = {styles.buttons}
             onPress={() => this.props.navigation.navigate('SignUp')}>
                <Text style={styles.menuText}>
                    Add New Employee
                </Text>
             </TouchableHighlight>
             <TouchableHighlight style = {styles.buttons}
              onPress={() => this.getData()}>
                 <Text style={styles.menuText}>
                     Update Employees
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
        height: 500,
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



