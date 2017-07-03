import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    AsyncStorage,
} from 'react-native';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

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

export default class Dashboard extends Component {
    constructor(props)
    {
        super(props);
        this.state = {return : false}
    }

    _return()
    {
        AsyncStorage.setItem('@SparkPlant:currentPage', 'Login');
        this.setState({return : true});
    }

    render() {
        return (
            <View style={styles.login}>
                <Header />
                <View style={styles.body}>
                    <Text>Dashboard</Text>
                    <Button title="retour" onPress={this._return.bind(this)}/>
                </View>
                <Footer/>
            </View>
        );
    }
}