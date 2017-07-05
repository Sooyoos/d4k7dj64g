import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

let inactiveStyles = StyleSheet.create({
    button : {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonIcon : {
        flex:1,
        color:'#ffffff',
        fontSize: 24,
        marginTop:6,
    }
});

let activeStyles = StyleSheet.create({
    button : {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor : '#303f9f'
    },
    buttonIcon : {
        flex:1,
        color:'#ffffff',
        fontSize: 24,
        marginTop:6,
    }
});

export default class FooterButton extends Component {
    constructor(props)
    {
        super(props);
    }

    goToRoute()
    {
        this.props.navigation.navigate(this.props.route);
    }

    render() {
        if(this.props.active)
        {
            return (
                <TouchableWithoutFeedback onPress={this.goToRoute.bind(this)}>
                    <View style={activeStyles.button}>
                        <Icon style={activeStyles.buttonIcon} name={this.props.iconName} />
                        <Text style={{color:'#ffffff', flex: 1}}>
                            {this.props.text}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            );
        }
        else
        {
            return (
                <TouchableWithoutFeedback onPress={this.goToRoute.bind(this)}>
                    <View style={inactiveStyles.button}>
                        <Icon style={inactiveStyles.buttonIcon} name={this.props.iconName} />
                        <Text style={{color:'#ffffff', flex: 1}}>
                            {this.props.text}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            );
        }
    }
};