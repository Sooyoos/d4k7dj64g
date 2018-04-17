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
import {fontSize2p4} from "../../assets/layout";

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
        fontSize: fontSize2p4,
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
        fontSize: fontSize2p4,
    }
});

class RadioButton extends Component {
    constructor(props)
    {
        super(props);
        this.state = {selected : false};
    }

    select()
    {
        this.props.setCreationVisibility(this.props.value);
    }

    render() {
        if(this.props.news.creation_current.visibility)
        {
            if(this.props.value === this.props.news.creation_current.visibility)
            {
                return (
                    <TouchableWithoutFeedback onPress={this.select.bind(this)}>
                        <View style={this.props.style}>
                            <View style={this.props.styleSelected}/>
                        </View>
                    </TouchableWithoutFeedback>
                );
            }
            else
            {
                return (
                    <TouchableWithoutFeedback onPress={this.select.bind(this)}>
                        <View style={this.props.style}>
                        </View>
                    </TouchableWithoutFeedback>
                );

            }
        }
        else
        {
            if(this.props.value === "public")
            {
                return (
                    <TouchableWithoutFeedback onPress={this.select.bind(this)}>
                        <View style={this.props.style}>
                            <View style={this.props.styleSelected}/>
                        </View>
                    </TouchableWithoutFeedback>
                );
            }
            else
            {
                return (
                    <TouchableWithoutFeedback onPress={this.select.bind(this)}>
                        <View style={this.props.style}>
                        </View>
                    </TouchableWithoutFeedback>
                );

            }
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