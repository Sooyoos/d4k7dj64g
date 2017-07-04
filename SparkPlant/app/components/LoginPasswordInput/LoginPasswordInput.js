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
        this.state = {password : AsyncStorage.getItem('@SparkPlant:LoginPassword')};
    }

    componentDidMount() {
        AsyncStorage.getItem("@SparkPlant:LoginPassword").then((value) => {
            this.setState({password: value});
        }).done();
    };

    componentDidUpdate(prevProps, prevState)
    {
        /*try{
            AsyncStorage.setItem('@SparkPlant:LoginPassword', this.state.password);
        }
        catch(error)
        {
            console.log('Could not save password data : ' + error);
        }

        try {
            const value = AsyncStorage.getItem('@SparkPlant:LoginPassword');
            if (value !== null){
                return value;
            }
        } catch (error) {
            console.log('Could not retrieve password data : ' + error);
        }*/

    }

    render() {
        return (
            <TextInput  style={styles.input} placeholder="Password" secureTextEntry={true} value={this.state.password} onChangeText={(value) => this.setState({password:value})}/>
        );
    }
};