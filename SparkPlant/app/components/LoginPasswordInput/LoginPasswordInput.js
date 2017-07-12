// TODO encrypt password so that we do not store them raw
import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    AsyncStorage,
    Dimensions,
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

let styles = StyleSheet.create({
    input: {
        width:responsiveWidth(50),
        height:responsiveHeight(8),
        fontSize : responsiveFontSize(1.6),
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