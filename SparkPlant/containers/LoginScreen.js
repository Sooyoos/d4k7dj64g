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
    Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as layout from '../assets/layout';
import ElevatedView from 'react-native-elevated-view';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import ModalPicker from 'react-native-modal-picker';
import { ActionCreators } from '../actions';
import LoginUsernameInput from '../components/Login/LoginUserNameInput';
import LoginPasswordInput from '../components/Login/LoginPasswordInput';
import LoginFactoryList from '../components/Login/LoginFactoryList';
import firebase from "react-native-firebase";

let styles = StyleSheet.create({
    login: {
        width : layout.fullWidth,
        height : layout.fullHeight,
        backgroundColor: '#3f51b5',
        paddingTop : layout.height4,
        paddingBottom: layout.height1,
        paddingHorizontal: layout.width1,
    },
    body: {
        width : layout.width98,
        height : layout.height93,
        paddingTop : layout.height5,
        backgroundColor: '#FFFFFF',
        alignItems:'center',
    },
    logo : {
        margin: layout.width8,
        width : layout.width80,
        resizeMode : 'contain',
    },
    button: {
        width:layout.width60,
        height : layout.height10,
        backgroundColor: '#00bcd4',
        marginTop:layout.height1,
        alignItems : 'center',
        justifyContent : 'center',
    },
    buttonText : {
        color:'#ffffff',
        textAlign: 'center',
        fontSize: layout.fontSize2p5,
    },
    loginCard : {
        width: layout.width75,
        height : layout.height15,
        backgroundColor : "#ffffff",
    },
    userSelect : {
        width: layout.width50,
        height : layout.height8,
        alignItems : 'center',
        justifyContent : 'center',
    },
});

const configurationOptions = {
    debug: true
};

const Firebase = firebase.initializeApp(configurationOptions);


class LoginScreen extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            new : false,
        };
        this.error = false;
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

    componentDidUpdate()
    {
        if(!this.error)
        {
            this.error = true;
            if(this.props.login.error !== null)
            {
                Alert.alert(
                    'Erreur',
                    this.props.login.error,
                    [
                        {text: 'OK', onPress: () => {this.error = false; this.props.resetLoginError();}},
                    ],
                    { cancelable: false }
                );
                this.props.resetLoginError();
            }
            else
            {
                this.error = false;
            }
        }
    }

    login(factory = this.props.login.factory, username = this.props.login.username, password = this.props.login.password)
    {
        this.props.tryLogin(this.props.login.factory, this.props.login.username, this.props.login.password);
    }

    autoLogin(index, value)
    {
        console.log(value);
        console.log(index);
        console.log(this.props.login.previousUsers);

        if(value.responsable)
        {
            this.props.setLoginFactory(value.factory);
            this.props.setLoginUsername(value.username);
            this.setState({new : true});
        }
        else
        {
            if(Platform.OS === 'android')
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
            else
            {
                if(value !== "new" && index >= 0)
                {
                    let users = this.props.login.previousUsers;
                    this.props.tryLogin(users[index].factory, users[index].username, users[index].password);
                }
                else
                {
                    this.setState({new : true});
                }
            }

        }
    }

    buildUsersListIos() {
        let users = this.props.login.previousUsers;
        let list = [];

        for(var i = 0; i < users.length; i++)
        {
            list.push(
                {
                    key : i,
                    label : users[i].factory + ' - ' + users[i].username,
                    value : users[i],
                }
            );
        }

        return <ModalPicker
            data={list}
            initValue="Utilisateur"
            style={styles.userSelect}
            selectStyle={{ height : layout.height5, width : layout.width50, alignItems : 'center', justifyContent : 'center'}}
            onChange={(option) => { this.autoLogin(option.key, option.value);}} />;
    }

    buildUsersListAndroid() {
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

        return <Picker style={styles.userSelect} onValueChange={(value, index) => {this.autoLogin(index, value);}} >
            {list}
                </Picker>
            ;
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
                            <Text style={{fontSize: layout.fontSize1p5, marginVertical : layout.height1}}>
                                Connectez vous avec l'un des utilisateurs suivants :
                            </Text>
                            <View>
                                { Platform.OS === 'ios' ? this.buildUsersListIos() : this.buildUsersListAndroid()  }
                            </View>
                            <Text style={{fontSize: layout.fontSize1p5}}>
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
                    <ActivityIndicator color="#ffffff" size="large"/>
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