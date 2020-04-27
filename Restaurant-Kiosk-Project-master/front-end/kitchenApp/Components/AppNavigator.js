import { createStackNavigator } from 'react-navigation-stack'
import { React, Component } from 'react'
import { AppRegistry } from 'react-native'
import { createAppContainer } from 'react-navigation'
import styles from '../Styles/Stylesheet.js'
import TableScreen from './TableScreen.js'

/* Currently not much navigation 
needed in the app however, I kept this in place
because it will be easy to add navigation with this setup in place
if future adjustments are needed within the app. */
const AppNavigator = createStackNavigator(
  {
    // TableScreen is where all the components will be displayed.
    Orders: TableScreen
  },

  {
    initialRouteName: 'Orders'
  }
)
/* Going to be exporting a container comoponent and 
calling it in App.js to display the app. */
const AppContainer = createAppContainer(AppNavigator)
export default AppContainer
