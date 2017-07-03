import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

let styles = StyleSheet.create({
    button : {
        flex:2.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonIcon : {
        color:'#ffffff',
        fontSize: 24,
    }
});

export default class FooterButton extends Component {
    constructor(props)
    {
        super(props);
    }

    _navigate()
    {
        AsyncStorage.setItem('@SparkPlant:currentPage', 'Dashboard');
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => this._navigate(this.props.route)}>
                <View style={styles.button}>
                    <Icon style={styles.buttonIcon} name={this.props.iconName} />
                </View>
            </TouchableWithoutFeedback>
        );
    }
};