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

export default class LoginUsernameInput extends Component {

    constructor(props)
    {
        super(props);
        this.state = {username: null};
    }

    componentDidMount() {
        AsyncStorage.getItem("@SparkPlant:LoginUsername").then((value) => {
            this.setState({username: value});
        }).done();
    };

    componentDidUpdate(prevProps, prevState)
    {
        /*try{
            AsyncStorage.setItem('@SparkPlant:LoginUsername', this.state.username);
        }
        catch(error)
        {
            console.log('Could not save username data : ' + error);
        }

        try {
            const value = AsyncStorage.getItem('@SparkPlant:LoginUsername');
            if (value !== null){
                return value;
            }
        } catch (error) {
            console.log('Could not retrieve username data : ' + error);
        }*/

    }

    render() {
        return (
            <TextInput style={styles.input} placeholder="Username" value={this.state.username} onChangeText={(username) => this.setState({username : username})}/>
        );
    }
};