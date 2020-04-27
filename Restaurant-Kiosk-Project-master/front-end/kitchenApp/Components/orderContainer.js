import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native'
import firebase from '@react-native-firebase/app'
// Functions and components that I have imported.
import { Table, Row, Rows } from 'react-native-table-component'
import { markTableOrderStatusAsTrue, getTables } from './tables.js'
import styles from '../Styles/Stylesheet.js'
import TableView from './TableView.js'

export default class OrderContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tableNumbers: [],
      open: false,
      tableId: '',
      ready: ''
    }
  }

  componentDidMount () {
    this.setState()
    this.getData()
  }

  // Function grabs talbe numbers and sets it equal to data1.
  getData = async () => {
    let newTablenumber = await getTables()
      .then(data1 => {
        this.setState({ tableNumbers: data1 })
      })
      .catch(error => {
        console.error(error)
      })
  }

  handlePress = table => {
    const { tableNumber, waitstaff } = table
    this.setState({
      /* Setting the states for toggle
      and setting tableNumber and waitstaff objects from back end 
      to my own variables to use later on.  */
      open: !this.state.open,
      tableId: tableNumber,
      waitstaff: waitstaff
    })
  }

  /* This funciton will set all the 
  orders complete for a table to true and remove
  the table form the screen.  */
  changeStatus = async tableNumber => {
    let newStatus = await markTableOrderStatusAsTrue(tableNumber)
    let newTables = await getTables().then(data1 => {
      this.setState({ tableNumbers: data1 })
    })
  }

  render () {
    const emptyString = <Text> </Text>
    const map = this.state.tableNumbers.map(element => {
      return (
        <View key={element.tableNumber}>
          <Text> TABLE {element.tableNumber} </Text>
          <Button
            title='View table'
            onPress={() => this.handlePress(element)}
          ></Button>
          <Button
            title='Table Done'
            onPress={() => this.changeStatus(element.tableNumber)}
          ></Button>
        </View>
      )
    })

    return (
      <View style={styles.container}>
        {map}
        <Text>{this.state.ready}</Text>
        <Table borderStyle={{ borderWidth: 2 }}></Table>
        <Table borderStyle={{ borderWidth: 2 }}></Table>
        {this.state.open ? (
          <TableView
            handlePress={this.handlePress}
            tableId={this.state.tableId}
            waitstaff={this.state.waitstaff}
          >
            {' '}
          </TableView>
        ) : (
          emptyString
        )}
      </View>
    )
  }
}
