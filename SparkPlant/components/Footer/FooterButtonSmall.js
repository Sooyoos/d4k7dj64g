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
import {fontSize1p4, fontSize2p4, height10, width33p3} from "../../assets/layout";


let inactiveStyles = StyleSheet.create({
    button : {
        height:height10,
        width:width33p3,
        alignItems: 'center',
        justifyContent: 'center',
        padding : 5,
    },
    buttonIcon : {
        color:'#ffffff',
        fontSize: fontSize2p4,
    }
});

let activeStyles = StyleSheet.create({
    button : {
        height:height10,
        width:width33p3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor : '#303f9f',
        padding : 5,
    },
    buttonIcon : {
        color:'#ffffff',
        fontSize: fontSize2p4,
    }
});

class FooterButtonSmall extends Component {
    constructor(props)
    {
        super(props);
    }

    goToRoute()
    {
        this.props.route(this.props.tags.currentTag);
    }

    render() {
        if(this.props.active)
        {
            return (
                <TouchableWithoutFeedback onPress={this.goToRoute.bind(this)}>
                    <View style={activeStyles.button}>
                        <Icon style={activeStyles.buttonIcon} name={this.props.iconName} />
                        <Text style={{color:'#ffffff', fontSize: fontSize1p4}}>
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
                        <Text style={{color:'#ffffff', fontSize: fontSize1p4}}>
                            {this.props.text}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            );
        }
    }
};

function mapStateToProps(state) {
    return {
        login: state.login,
        nav : state.nav,
        tags : state.tags,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(FooterButtonSmall);