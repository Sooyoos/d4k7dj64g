import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    Alert,
    Dimensions,
} from 'react-native';
import LoginUsernameInput from '../components/LoginUsernameInput/LoginUserNameInput';
import LoginPasswordInput from '../components/LoginPasswordInput/LoginPasswordInput';
import LoginFactoryList from '../components/LoginFactoryList/LoginFactoryList';

let styles = StyleSheet.create({
    login: {
        flex:1,
    },
    body: {
        flex:8.4,
        backgroundColor: '#FFFFFF',
        alignItems:'center',
        justifyContent: 'center',
    },
    button: {
        width:Dimensions.get('window').width / 2,
        height:50,
        backgroundColor: '#009688',
        marginTop:20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText : {
        flex:9,
        color:'#ffffff',
        textAlign: 'center',
        fontSize: 20,
    }
});

export default class Login extends Component {

    constructor(props)
    {
        super(props);
    }

    login()
    {
        // TODO something to check is we can authenticate
        let login = true;
        if(login)
        {
            this.props.navigation.navigate('Dashboard');
        }
        else
        {
            Alert.alert('Login incorrect');
        }
    }

    render() {
            return (
                <View style={styles.login}>
                    <View style={styles.body}>
                        <LoginFactoryList/>
                        <LoginUsernameInput/>
                        <LoginPasswordInput />
                        <TouchableWithoutFeedback onPress={this.login.bind(this)}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>SE CONNECTER</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            );
    }
}
