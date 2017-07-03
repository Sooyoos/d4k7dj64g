import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import App from './app/index';

export default class SparkPlant extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('SparkPlant', () => SparkPlant);
