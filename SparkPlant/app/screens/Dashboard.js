import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    AsyncStorage,
    TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header/Header';
import DashboardNavigation from '../components/Dashboard/DashboardNavigation';
import DashboardNews from '../components/Dashboard/DashboardNews';

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

    static navigationOptions = {
        drawerLabel: 'HOME',
        drawerIcon: ({tintColor}) => (
            <Icon name='home' style={{fontSize : 24, color : '#757575'}}/>
        ),
    };

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
                <Header props={this.props}/>
                <View style={styles.body}>
                    <DashboardNavigation/>
                    <DashboardNews/>
                </View>
            </View>
        );
    }
}