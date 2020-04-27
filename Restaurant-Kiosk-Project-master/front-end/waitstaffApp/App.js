import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import {theme} from './constants/theme';
import OrdersScreen from './screens/OrdersScreen';

const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {headerShown: false},
  },
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
    },
  },
  Orders: {
    screen: OrdersScreen,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
    },
  }  
},{initialRouteName: 'Login'});

export default createAppContainer(AppNavigator);
