import React, { Component } from 'react'
import firebase from '@react-native-firebase/app'
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  ScrollView
} from 'react-native'
import styles from '../Styles/Stylesheet.js'
import OrderContainer from './OrderContainer.js'

export default class TableScreen extends React.Component {
  constructor (props) {
    super(props)
  }

  // Header style of the app.
  static navigationOptions = {
    title: 'Orders',
    headerStyle: {
      backgroundColor: 'navy'
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 30
    }
  }
  // Displaying all of the components.
  render () {
    return (
      <ImageBackground
        source={require('../Images/app.jpg')}
        style={styles.background}
      >
        <ScrollView>
          <View>
            <OrderContainer></OrderContainer>
          </View>
        </ScrollView>
      </ImageBackground>
    )
  }
}
