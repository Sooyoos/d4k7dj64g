import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
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

class RadioButton extends Component {
    constructor(props)
    {
        super(props);
    }

    render() {
        if(this.props.selected)
        {
            return (
                <View style={this.props.style}>
                    <View style={this.props.styleSelected}/>
                </View>
            );
        }
        else
        {
            return (
                <View style={this.props.style}>
                </View>
            );

        }
    }
};

function mapStateToProps(state) {
    return {
        login: state.login,
        nav : state.nav,
        tags : state.tags,
        news : state.news,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(RadioButton);