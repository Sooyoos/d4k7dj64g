// TODO encrypt password so that we do not store them raw
import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import {fontSize2p4, height8, width75} from "../../assets/layout";

let styles = StyleSheet.create({
    input: {
        width:width75,
        height:height8,
        fontSize : fontSize2p4,
    }
});

class LoginPasswordInput extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            <TextInput  style={styles.input} placeholder="Mot de passe" secureTextEntry={true} value={this.props.login.password} onChangeText={(value) => this.props.setLoginPassword(value)}/>
        );
    }
};

function mapStateToProps(state) {
    return {
        login: state.login,
        nav : state.nav,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPasswordInput);