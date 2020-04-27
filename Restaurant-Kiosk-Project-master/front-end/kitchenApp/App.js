import React, { Component } from 'react'
import {Text, View,} from 'react-native'
import styles from './Styles/Stylesheet.js'
import OrderContainer from './Components/OrderContainer.js'
import AppContainer from './Components/AppNavigator.js'
import TableScreen from './Components/TableScreen.js'

// Need to install '@react-native-firebase/app' with npm install.
import firebase from '@react-native-firebase/app'

export default class App extends Component {
  render () {
    return <AppContainer />
  }
}






