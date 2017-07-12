import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

let inactiveStyles = StyleSheet.create({
    button : {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        padding : 5,
    },
    buttonIcon : {
        flex:1,
        color:'#ffffff',
        fontSize: responsiveFontSize(2.4),
    }
});

let activeStyles = StyleSheet.create({
    button : {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor : '#303f9f',
        padding : 5,
    },
    buttonIcon : {
        flex:1,
        color:'#ffffff',
        fontSize: responsiveFontSize(2.4),
    }
});

export default class FooterButton extends Component {
    constructor(props)
    {
        super(props);
    }

    goToRoute()
    {
        if(this.props.tag)
        {
            this.props.navigation.navigate(this.props.route, {tag : this.props.tag});
        }
        else
        {
            this.props.navigation.navigate(this.props.route);
        }

    }

    render() {
        if(this.props.active)
        {
            return (
                <TouchableWithoutFeedback onPress={this.goToRoute.bind(this)}>
                    <View style={activeStyles.button}>
                        <Icon style={activeStyles.buttonIcon} name={this.props.iconName} />
                        <Text style={{color:'#ffffff', flex: 1, fontSize: responsiveFontSize(1.4)}}>
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
                        <Text style={{color:'#ffffff', flex: 1, fontSize: responsiveFontSize(1.4)}}>
                            {this.props.text}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            );
        }
    }
};