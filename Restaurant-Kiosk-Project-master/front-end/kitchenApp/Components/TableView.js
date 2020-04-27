import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  Modal,
  ScrollView
} from 'react-native'
import firebase from '@react-native-firebase/app'
/* Importing functions and components
to use on this component.*/
import { getTables } from './tables.js'
import OrderContainer from './OrderContainer.js'
import styles from '../Styles/Stylesheet.js'
import { getTableOrders, updateOrderInformation } from './orders.js'
import { callServer } from './callServer.js'
import { getInventory, updateInventory } from './inventory.js'
export default class TableView extends Component {
  constructor (props) {
    super(props)
    // Setting all the states for toggle and other variables.
    this.state = {
      toggle: false,
      toggle2: false,
      orderView: false,
      inventoryView: false,
      inventoryView2: false,
      open: false,
      orderDetails: [],
      inventoryItems: [],
      orderSuc: false,
      ingredient: '',
      quantity: 0
    }
  }

  // Funciton to get the inventory
  getInven = async () => {
    let newInventoryItems = await getInventory().then(data => {
      this.setState({ inventoryItems: data })
      console.log(data)
    })
  }
  /* Creatig a function that calls the backend function which grabs
 all table orders  and setting it equal to a variable.*/
  getOrder = async () => {
    let neworderDetails = await getTableOrders(this.props.tableId).then(
      order1 => {
        this.setState({ orderDetails: order1 })
      }
    )
  }

  /* Creating a function that calls the backend function which grabs
  the server call status using the table number as a parameter.*/
  serverCall = async () => {
    let newStatus = await callServer(this.props.tableId) // Table number of which server to call.
    const newState = !this.state.toggle // Setting my toggle state to a new state when this function is called.
    this.setState({ toggle: newState })
  }
  /* This function will change the order completion status of each order
  to a specific table from false to true. */
  OnButtonPress = async (orderID, completionStatus) => {
    const orderStatus = { orderID, completionStatus }
    // Backend function call.
    let completion = await updateOrderInformation(orderStatus)

    /* This is in function so that when the user clicks 'Ready'
     the order will disaper from the screen.*/
    let neworderDetails = await getTableOrders(this.props.tableId).then(
      order1 => {
        this.setState({ orderDetails: order1 }, function () {
          //console.log(this.state.orderDetails);
        })
      }
    )
  }
  // Handle the toggle states for inventory
  handleInventoryView = () => {
    this.setState({
      inventoryView: !this.state.inventoryView
    })
    this.getInven()
  }
  handleInventoryView2 = () => {
    this.setState({
      inventoryView2: !this.state.inventoryView2
    })
  }
  // Setting the toggle view when the user clicks ' View Table'
  handleOrderView = () => {
    this.setState({
      orderView: !this.state.orderView
    })
    // This funciton is called to display all the tables.
    this.getOrder()
    this.setState({ orderSuc: true })
  }

  render () {
    const { toggle } = this.state
    const { toggle2 } = this.state
    // Setting variables equal to what we want the toggle state to display.
    const newText2 = toggle2 ? 'Order is marked as ready' : 'READY'
    const newText = toggle ? 'Server is called' : 'Call server'
    const emptyString = <Text></Text>

    /* The 'map' funciton will map the array of objects returned 
from the back end and display them on the front end. */
    const map = this.state.orderDetails.map(element => {
      //console.log(typeof element.orderedItems[0].name)

      return (
        <View style={styles.container} key={element.orderID}>
          <Text style={styles.textOrders}> TABLE: {element.tableNumber} </Text>
          <View style={styles.containter}>
            <Text style={styles.textOrders}>
              {element.orderedItems.join(' \n')}
            </Text>
          </View>
          <Text style={styles.textOrders}>REQUESTS: {element.requests}</Text>
          <Text> {element.completionStatus} </Text>
          <Button
            title={newText2}
            color={'black'}
            onPress={() =>
              this.OnButtonPress(element.orderID, !element.completionStatus)
            }
          ></Button>
        </View>
      )
    })

    // Mapping and displaying the inventory
    const mapInventory = this.state.inventoryItems.map(index => {
      return (
        <View key={index.ingredientName}>
          <Text style={styles.textOrders}>
            {index.ingredientName} {index.ingredientQuantity}
          </Text>
        </View>
      )
    })

    // This is what the user will se after they click 'View table.
    return (
      <View>
        <Text>TABLE {this.props.tableId}</Text>
        <Button
          title={newText}
          color={'black'}
          onPress={this.serverCall}
        ></Button>
        <Button
          title={'Order details'}
          color={'black'}
          onPress={this.handleOrderView}
        ></Button>

        <Button
          title='Cancel'
          color='black'
          onPress={this.props.handlePress}
        ></Button>
        <Modal visible={this.state.orderView}>
          <View style={styles.modalBackground}>
            <Text style={styles.textOrders}> Order details </Text>
            <ScrollView>{map}</ScrollView>
            <Button
              title='Go Back'
              color='black'
              onPress={this.handleOrderView}
            ></Button>
            <Button
              title={'Inventory'}
              color={'black'}
              onPress={this.handleInventoryView}
            ></Button>
            <Modal visible={this.state.inventoryView}>
              <View style={styles.modalBackground}>
                <Button
                  title='Update the inventory'
                  color='black'
                  onPress={this.handleInventoryView2}
                ></Button>
                <Modal visible={this.state.inventoryView2}>
                  <View style={styles.modalBackground}>
                    <Button
                      title='Go Back'
                      color='black'
                      onPress={this.handleInventoryView2}
                    ></Button>
                  </View>
                </Modal>

                {mapInventory}

                <Button
                  title='Go Back'
                  color='black'
                  onPress={this.handleInventoryView}
                ></Button>
              </View>
            </Modal>
          </View>
        </Modal>
      </View>
    )
  }
}
