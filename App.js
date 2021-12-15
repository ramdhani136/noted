import React, {Component} from 'react';
import Router from './src/config/Router';
import 'react-native-gesture-handler';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export class App extends Component {
  render() {
    return (
      <>
        <Router />
      </>
    );
  }
}

export default App;
