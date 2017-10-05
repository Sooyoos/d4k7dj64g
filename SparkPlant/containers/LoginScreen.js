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
        paddingTop : responsiveHeight(4),
        paddingBottom: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(1),
    },
    body: {
        width : responsiveWidth(98),
        height : responsiveHeight(93),
        backgroundColor: '#FFFFFF',
        alignItems:'center',
        justifyContent: 'center',
    },
    logo : {
        margin: responsiveWidth(8),
        width : responsiveWidth(80),
        resizeMode : 'contain',
    },
    button: {
        width:responsiveWidth(60),
        height : responsiveHeight(10),
        backgroundColor: '#00bcd4',
        marginTop:responsiveHeight(5),
        alignItems : 'center',
        justifyContent : 'center',
    },
    buttonText : {
        color:'#ffffff',
        textAlign: 'center',
        fontSize: responsiveFontSize(2.5),
    },
    loginCard : {
        width: responsiveWidth(75),
        height : responsiveHeight(15),
        backgroundColor : "#ffffff",
    },
    userSelect : {
        width: responsiveWidth(50),
        height : responsiveHeight(5),
        marginBottom: responsiveHeight(5),
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
    }

    componentWillMount()
    {
        let props = this.props;
        this.props.tryPreviousLogin();
        BackHandler.addEventListener('hardwareBackPress', function(){
            props.navigateBack();
            return true;
        });
    }

    login(factory = this.props.login.factory, username = this.props.login.username, password = this.props.login.password)
    {
        this.props.tryLogin(this.props.login.factory, this.props.login.username, this.props.login.password);
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
                this.props.tryLogin(users[index - 1].factory, users[index - 1].username, users[index - 1].password);
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
            <Picker.Item key={-1} label={"Utilisateur"} value={null} />
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
                            <Text style={{fontSize: responsiveFontSize(1.5)}}>
                                Connectez vous avec l'un des utilisateurs suivants :
                            </Text>
                            <Picker style={styles.userSelect} onValueChange={(value, index) => {this.autoLogin(index, value);}} >
                                {this.buildUsersList()}
                            </Picker>
                            <Text style={{fontSize: responsiveFontSize(1.5)}}>
                                Ou :
                            </Text>
                            <TouchableWithoutFeedback onPress={() => {this.setState({new : true})}}>
                                <ElevatedView elevation={4} style={styles.button}>
                                    <Text style={styles.buttonText}>ENTREZ VOS INFORMATIONS</Text>
                                </ElevatedView>
                            </TouchableWithoutFeedback>
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
                            <TouchableWithoutFeedback onPress={this.login}>
                                <ElevatedView elevation={4} style={styles.button}>
                                    <Text style={styles.buttonText}>SE CONNECTER</Text>
                                </ElevatedView>
                            </TouchableWithoutFeedback>
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