import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    Alert,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import ElevatedView from 'react-native-elevated-view';
import LoginUsernameInput from '../components/LoginUsernameInput/LoginUserNameInput';
import LoginPasswordInput from '../components/LoginPasswordInput/LoginPasswordInput';
import LoginFactoryList from '../components/LoginFactoryList/LoginFactoryList';

let styles = StyleSheet.create({
    login: {
        flex:1,
        backgroundColor: '#FFFFFF',
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
                    <ElevatedView elevation={5} style={styles.body}>
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
