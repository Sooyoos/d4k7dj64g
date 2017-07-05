// TODO encrypt password so that we do not store them raw
import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    AsyncStorage,
} from 'react-native';

let styles = StyleSheet.create({
    input: {
        width:280,
        height:50,
    }
});

export default class LoginPasswordInput extends Component {

    constructor(props)
    {
        super(props);
        this.state = {password : null};
    }

    componentDidMount() {
        AsyncStorage.getItem("@SparkPlant:LoginPassword").then((value) => {
            this.setState({password: value});
        }).done();
    };

    render() {
        return (
            <TextInput  style={styles.input} placeholder="Password" secureTextEntry={true} value={this.state.password} onChangeText={(value) => this.setState({password:value})}/>
        );
    }
};