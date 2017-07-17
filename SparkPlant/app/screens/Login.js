import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    Alert,
    Image,
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import ElevatedView from 'react-native-elevated-view';
import LoginUsernameInput from '../components/LoginUsernameInput/LoginUserNameInput';
import LoginPasswordInput from '../components/LoginPasswordInput/LoginPasswordInput';
import LoginFactoryList from '../components/LoginFactoryList/LoginFactoryList';

let styles = StyleSheet.create({
    login: {
        flex:1,
        backgroundColor: '#efefef',
        alignItems : 'center',
        justifyContent: 'center',
    },
    body: {
        width : responsiveWidth(80),
        height : responsiveHeight(80),
        backgroundColor: '#FFFFFF',
        alignItems:'center',
        justifyContent: 'center',
    },
    logo : {
        width : responsiveWidth(75),
        height : responsiveHeight(20),
    },
    button: {
        width:responsiveWidth(40),
        height:responsiveHeight(5),
        backgroundColor: '#00bcd4',
        marginTop:responsiveHeight(5),
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText : {
        flex:9,
        color:'#ffffff',
        textAlign: 'center',
        fontSize: responsiveFontSize(1.8),
    }
});

export default class Login extends Component {

    constructor(props)
    {
        super(props);
    }

    login()
    {
        let factory = "1";
        let password = "test";
        let username = "user1";
        let baseUrl = "http://sparkplant-api-testing.sooyoos.com";
        let body = new FormData();

        body.append("factory", factory);
        body.append("password", password);
        body.append("idNumber", username);

        fetch(baseUrl + "/token", {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            },
            body: body,
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.token)
                {
                    this.props.navigation.navigate('Dashboard', {token : responseJson.token});
                }
            })
            .catch((error) => { Alert.alert("Login Incorrect"); });
    }

    render() {
            return (
                <View style={styles.login}>
                    <ElevatedView elevation={5} style={styles.body}>
                        <Image source={require('../assets/img/logo.png')} style={styles.logo} />
                        <LoginFactoryList/>
                        <LoginUsernameInput/>
                        <LoginPasswordInput />
                        <ElevatedView elevation={4} style={styles.button}>
                            <TouchableWithoutFeedback onPress={this.login.bind(this)}>
                                <View style={{width:responsiveWidth(40), height:responsiveHeight(5), justifyContent:'center', padding : 5}}>
                                    <Text style={styles.buttonText}>SE CONNECTER</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </ElevatedView>
                    </ElevatedView>
                </View>
            );
    }
}
