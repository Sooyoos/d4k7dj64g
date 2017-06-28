/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Button,
    View,
    AsyncStorage,
    Alert,
} from 'react-native';

export default class protoStorage extends Component {

    constructor(props) {
        super(props);
        this.counter = 0;
    }

    async _saveData(key, data){
        try {
            await AsyncStorage.setItem('@protoStorage:key', JSON.stringify(data));
        } catch (error) {
            console.log('Error while saving data : ' + error);
        }
    }

    async _retrieveData(key) {
        try {
            const value = await AsyncStorage.getItem('@protoStorage:key');
            if (value !== null){
                console.log(JSON.parse(value));
                this.counter = JSON.parse(value);
            }
        } catch (error) {
            console.log('Error while retrieving data : ' + error);
        }
    }

    async _clear()
    {
        try {
            await AsyncStorage.removeItem('@protoStorage:counter');
        }
        catch(error) {
            console.log('Error while clearing data : ' + error);
        }
    }

  render() {
    return (
      <View style={styles.container}>
          <Button onPress={() => this._retrieveData('counter')} title="Get the count"/>
          <Button onPress={() => this._saveData('counter', parseInt(this.counter) + 1)} title="Increase the count"/>
          <Button onPress={() => this._clear()} title="Clear"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('protoStorage', () => protoStorage);
