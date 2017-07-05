import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

let styles = StyleSheet.create({
    header: {
        flex:0.5,
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
    },
    title:{
        flex : 8.4,
        margin:5,
        fontSize:20,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    logout:{
        flex:0.8,
    },
    logoutIcon:{
        color:'#ffffff',
        fontSize: 20,
    },
    menu:{
        flex:0.8,
        alignItems: 'center',
    },
    menuIcon:{
        color:'#ffffff',
        fontSize: 20,
    }
});

export default class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
                <View style={styles.header}>
                    <Text style={styles.title}>
                        SparkPlant
                    </Text>
                </View>
            );
        }
};