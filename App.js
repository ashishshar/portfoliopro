import React from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import { createStackNavigator } from 'react-navigation'; 
import Loader from './src/components/Loader';
import InitalSc from './src/components/InitialScreen';
import HomeScreen from './src/components/HomeScreen';
import ProfileScreen from './src/components/ProfileScreen';
import LoginScreen from './src/components/LoginScreen';
import FirstScreen from './src/components/FirstScreen';
import SecondScreen from './src/components/SecondScreen';
import ThirdScreen from './src/components/ThirdScreen';
import FinalScreen from './src/components/FinalScreen';
import SettingScreen from './src/components/SettingScreen';
const firebase = require("firebase");
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDx28-OWpArp_y8llth8Go5-E3lDLXe-js",
  authDomain: "portfoliopro-68771.firebaseapp.com",
  databaseURL: "https://portfoliopro-68771.firebaseio.com",
  projectId: "portfoliopro-68771",
  storageBucket: "portfoliopro-68771.appspot.com",
  messagingSenderId: "209957949377"
};

const RootStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Profile: { screen: ProfileScreen },
    Login: { screen: LoginScreen },
    First: { screen: FirstScreen },
    Second: { screen: SecondScreen },
    Third: { screen: ThirdScreen },
    Final: { screen: FinalScreen },
    Setting: { screen: SettingScreen }
  },
  {
    initialRouteName: 'Login',
    //headerMode: 'none',
  }
);

const LoggedIn = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Profile: { screen: ProfileScreen },
    Login: { screen: LoginScreen },
    First: { screen: FirstScreen },
    Second: { screen: SecondScreen },
    Third: { screen: ThirdScreen },
    Final: { screen: FinalScreen },
    Setting: { screen: SettingScreen }
  },
  {
    initialRouteName: 'Home',
    //headerMode: 'none',
  }
);

export default class App extends React.Component {
  state = {
    loggedIn: ''
  };
  componentWillMount() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedIn: true
        });
      } else {
        this.setState({
          loggedIn: false
        });
      }
    });
  };
  renderInitial() {
    switch (this.state.loggedIn) {
      case true:
        return <LoggedIn />;
      case false:
        return <RootStack />;
      default:
        return <InitalSc/>
    }
  };
  render() {
    return this.renderInitial();
  }
}