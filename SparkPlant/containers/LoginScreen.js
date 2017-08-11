import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    Image,
    ToastAndroid,
    Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import ElevatedView from 'react-native-elevated-view';
import { ActionCreators } from '../actions';
import LoginUsernameInput from '../components/Login/LoginUserNameInput';
import LoginPasswordInput from '../components/Login/LoginPasswordInput';
import LoginFactoryList from '../components/Login/LoginFactoryList';

let styles = StyleSheet.create({
    login: {
        width : responsiveWidth(100),
        height : responsiveHeight(100),
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

class LoginScreen extends Component {

    constructor(props)
    {
        super(props);
        this.login = this.login.bind(this);
    }

    login()
    {
        ToastAndroid.show("Login tried", ToastAndroid.LONG);
        this.props.tryLogin(this.props.login.factory, this.props.login.username, this.props.login.password);
    }

    render() {
        ToastAndroid.show(this.props.login.userToken, ToastAndroid.LONG);
        return (
            <View style={styles.login}>
                <ElevatedView elevation={5} style={styles.body}>
                    <Image source={require('../assets/img/logo.png')} style={styles.logo} />
                    <LoginFactoryList/>
                    <LoginUsernameInput/>
                    <LoginPasswordInput />
                    <ElevatedView elevation={4} style={styles.button}>
                        <TouchableWithoutFeedback onPress={this.login}>
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

function mapStateToProps(state) {
    return {
        login: state.login,
        nav : state.nav,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);