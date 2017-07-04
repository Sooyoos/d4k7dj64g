import React, { Component } from 'react';
import {
    View,
    StyleSheet,

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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

export default class Analytics extends Component {

    static navigationOptions = {
        drawerLabel: 'ANALYTICS',
        drawerIcon: ({tintColor}) => (
            <Icon name='bar-chart' style={{fontSize : 24, color : '#757575'}}/>
        ),
    };

    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            <View style={styles.login}>
                <View style={styles.body}>

                </View>
            </View>
        );
    }
}
