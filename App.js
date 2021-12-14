import React, {Component} from 'react';
import Router from './src/config/Router';
import 'react-native-gesture-handler';

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
