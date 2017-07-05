import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

let styles = StyleSheet.create({
    button : {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.8,
    },
    buttonIcon : {
        color:'#ffffff',
        fontSize: 24,
    }
});

export default class HeaderButton extends Component {
    constructor(props)
    {
        super(props);
    }

    goToRoute(){
        this.props.navigation.navigate(this.props.route);
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.goToRoute.bind(this)}>
                <View style={styles.button}>
                    <Icon style={styles.buttonIcon} name={this.props.iconName} />
                </View>
            </TouchableWithoutFeedback>
        );
    }
};