import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    Image,
    ToastAndroid,
    Alert,
    Picker,
    ActivityIndicator,
    BackHandler,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import ElevatedView from 'react-native-elevated-view';
import KeyboardSpacer from 'react-native-keyboard-spacer';
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
        margin: responsiveWidth(5),
        width : responsiveWidth(70),
        resizeMode : 'contain',
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
    },
    loginCard : {
        width: responsiveWidth(75),
        height : responsiveHeight(15),
        backgroundColor : "#ffffff",
    },
    userSelect : {
        width: responsiveWidth(50),
        height : responsiveHeight(5),
    }
});

class LoginScreen extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            new : false,
        };
        this.login = this.login.bind(this);
        this.props.tryPreviousLogin();
    }

    componentWillMount()
    {
        let props = this.props;
        BackHandler.addEventListener('hardwareBackPress', function(){
            props.navigateBack();
            return true;
        });
    }

    login(factory = this.props.login.factory, username = this.props.login.username, password = this.props.login.password)
    {
        this.props.tryLogin(factory, username, password);
    }

    autoLogin(index, value)
    {
        console.log(value);

        if(value.responsable)
        {
            this.props.setLoginFactory(value.factory);
            this.props.setLoginUsername(value.username);
            this.setState({new : true});
        }
        else
        {
            if(value !== "new" && index >= 0)
            {
                let users = this.props.login.previousUsers;
                this.props.tryLogin(users[index - 2].factory, users[index - 2].username, users[index - 2].password);
            }
            else
            {
                this.setState({new : true});
            }
        }
    }

    buildUsersList() {
        let users = this.props.login.previousUsers;
        let list = [];

        list.push(
            <Picker.Item key={-2} label={"Utilisateur"} value={null} />
        );

        list.push(
            <Picker.Item key={-1} label={"Nouvel utilisateur"} value={"new"} />
        );

        for(var i = 0; i < users.length; i++)
        {
            list.push(
                <Picker.Item key={i} label={"Usine : " + users[i].factory + " - " + users[i].username} value={users[i]} />
            );
        }

        return list;
    }


    render() {
        if(this.props.login.loading === false)
        {
            if(this.props.login.previousUsers && this.props.login.previousUsers.length > 0 && this.state.new !== true)
            {
                return (
                    <View style={styles.login}>
                        <ElevatedView elevation={2} style={styles.body}>
                            <Image source={require('../assets/img/Logo-sparkplant.png')} style={styles.logo} />
                            <Picker style={styles.userSelect} onValueChange={(value, index) => {this.autoLogin(index, value);}} >
                                {this.buildUsersList()}
                            </Picker>
                        </ElevatedView>
                    </View>
                );
            }
            else
            {
                return (
                    <View style={styles.login}>
                        <ElevatedView elevation={2} style={styles.body}>
                            <Image source={require('../assets/img/Logo-sparkplant.png')} style={styles.logo} />
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
                            <KeyboardSpacer/>
                        </ElevatedView>
                    </View>
                );
            }
        }
        else
        {
            return(
                <View style={styles.login}>
                    <ActivityIndicator color="#3f51b5" size="large"/>
                </View>
            );
        }

    }
}

function mapStateToProps(state) {
    return {
        login: state.login,
        nav : state.nav,
        users : state.users,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);