import React, { Component } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import LoginUsernameInput from '../components/LoginUsernameInput/LoginUserNameInput';
import LoginPasswordInput from '../components/LoginPasswordInput/LoginPasswordInput';
import LoginFactoryList from '../components/LoginFactoryList/LoginFactoryList';
import LoginButton from '../components/LoginButton/LoginButton';

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
});

export default class Login extends Component {
    static navigationOptions = {
        title: 'SparkPlant',
    };

    render() {
        return (
            <View style={styles.login}>
                <Header />
                <View style={styles.body}>
                    <LoginFactoryList/>
                    <LoginUsernameInput/>
                    <LoginPasswordInput/>
                    <LoginButton/>
                </View>
                <Footer/>
            </View>
        );
    }
}