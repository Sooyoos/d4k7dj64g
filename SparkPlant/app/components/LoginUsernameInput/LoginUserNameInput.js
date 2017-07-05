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