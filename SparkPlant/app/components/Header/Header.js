import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

let styles = StyleSheet.create({
    header: {
        flex: 0.8,
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
    },
    title:{
        flex : 9.2,
        margin:5,
        fontSize:20,
        color: '#FFFFFF',
    },
    logout:{
        flex:0.8,
    },
    logoutIcon:{
        color:'#ffffff',
        fontSize: 20,
    }
});

export default class Header extends Component {

    constructor(props)
    {
        super(props);
        this.state = {currentPage : 'Login'};
    }

    logout()
    {
        AsyncStorage.setItem('@SparkPlant:currentPage', 'Login');
    }

    componentDidMount()
    {
        AsyncStorage.getItem("@SparkPlant:currentPage").then(currentPage => {
                this.setState({
                    currentPage:currentPage
                });
            }
        );
    }

    render() {
        let currentPage = this.state.currentPage;
        if(currentPage == 'Login')
        {
            return (
                <View style={styles.header}>
                    <Text style={styles.title}>
                        SparkPlant
                    </Text>
                </View>
            );
        }
        else
        {
            return (
                <View style={styles.header}>
                    <Text style={styles.title}>
                        SparkPlant
                    </Text>
                    <TouchableWithoutFeedback onPress={() => this.logout()}>
                        <View style={styles.logout}>
                            <Icon style={styles.logoutIcon} name="power-off" />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            );
        }
    }
};