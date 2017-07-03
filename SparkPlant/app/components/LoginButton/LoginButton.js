import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    Text,
    AsyncStorage,
} from 'react-native';

let styles = StyleSheet.create({
    button: {
        width:280,
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

export default class LoginButton extends Component {

    constructor(props) {
        super(props);
        AsyncStorage.getItem("@SparkPlant:loginFactory").then(factory => {
                this.setState({
                    factory: factory
                });
            }
        );
        AsyncStorage.getItem("@SparkPlant:LoginUsername").then(username => {
            this.setState({
                username: username
            });
        });
        AsyncStorage.getItem("@SparkPlant:LoginPassword").then(password => {
            this.setState({
                password: password
            });
        });
    }

    componentDidMount() {
        AsyncStorage.getItem("@SparkPlant:loginFactory").then(factory => {
                this.setState({
                    factory:factory
                });
            }
        );
        AsyncStorage.getItem("@SparkPlant:LoginUsername").then(username => {
            this.setState({
                username:username
            });
        });
        AsyncStorage.getItem("@SparkPlant:LoginPassword").then(password => {
            this.setState({
                password:password
            });
        });
    };

    _tryLogin()
    {
        AsyncStorage.getItem("@SparkPlant:loginFactory").then(factory => {
                this.setState({
                    factory:factory
                });
            }
        );
        AsyncStorage.getItem("@SparkPlant:LoginUsername").then(username => {
            this.setState({
                username:username
            });
        });
        AsyncStorage.getItem("@SparkPlant:LoginPassword").then(password => {
            this.setState({
                password:password
            });
        });

        console.log(JSON.stringify(
            {
                username : this.state.username,
                password : this.state.password,
                factory : this.state.factory,
            }
        ));

        AsyncStorage.setItem('@SparkPlant:currentPage', 'Dashboard');
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this._tryLogin.bind(this)}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>SE CONNECTER</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
};