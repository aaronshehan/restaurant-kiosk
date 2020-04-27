import React, {Component} from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import Background from './assets/background.jpeg';
import Loading from './components/loading/loading';
import MainContainer from './components/main_container/main_container';
import Registration from './components/register/registration';
import Login from './components/register/login/login';
import PayScreen from './components/pay_screen/pay_screen';
import Game1 from './components/games/tic-tac-toe/tic-tac-toe';
import Game2 from './components/games/snake/snake';
import firebase from '@react-native-firebase/app';
import { Provider } from 'react-redux';
import store from './store';
import '@react-native-firebase/functions';
import '@react-native-firebase/auth';

firebase.functions().useFunctionsEmulator('http://localhost:5000');

global.tableNumber = '1';

// Navigation
const RootNavigator = createStackNavigator({
  Load: Loading,
  Menu: MainContainer,
  Register: Registration,
  Login: Login,
  Pay: PayScreen,
  TicTacToe: Game1,
  Snake: Game2
},
{ 
  initialRouteName: 'Register',
  headerMode: 'none',
  defaultNavigationOptions: {
    cardStyle: {
      backgroundColor: '#f7cac9'
    },
    ...TransitionPresets.ScaleFromCenterAndroid
  }
});

const AppContainer = createAppContainer(RootNavigator);

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      currentTime: null,
      currentDay: null
    }
    
    this.startingHour = null;
    this.daysArray = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidMount() {
    this.getCurrentTime();
    
    this.timer = setInterval(() => {
      this.getCurrentTime();
    }, 1000)
  }

  getCurrentTime = () => {
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    let am_pm = 'pm';

    this.startingHour = hour;

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    if (hour > 12) {
      hour = hour - 12;
    }

    if (hour == 0) {
      hour = 12;
    }

    if (new Date().getHours() < 12) {
      am_pm = 'am';
    }

    this.setState({ currentTime: hour + ':' + minutes + ':' + seconds + ' ' + am_pm });

    this.daysArray.map((item, key) => {
      if (key == new Date().getDay()) {
        this.setState({ currentDay: item });
      }
    })
  }

  render() {
    if ( (this.startingHour < 10) || (this.startingHour == 23 && this.state.minutes > 29)) {
      return (
        <ImageBackground
          source = {Background}
          style = {{height: '100%', width: '100%'}}
        >
          <View style = {{backgroundColor: '#f7cac9'}}>
            <Text style = {{fontWeight: 'bold', alignSelf: 'center'}}>{this.state.currentDay}, {this.state.currentTime}</Text>
          </View>
          
          <Text style = {{fontSize: 45, fontWeight: 'bold', color: 'aqua'}}>Not open. Try again when we open at 10am.</Text>
        </ImageBackground>
      )
    } else {
      return (
        <Provider store = {store}>
          <View style = {{backgroundColor: '#f7cac9'}}>
            <Text style = {{fontWeight: 'bold', alignSelf: 'center'}}>{this.state.currentDay}, {this.state.currentTime}</Text>
          </View>
          <AppContainer/>
        </Provider>
      )
    }
  }
}

console.disableYellowBox = true