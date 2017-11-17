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

class LoginFactoryList extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return(
            <TextInput style={styles.input} placeholder="Code usine" value={this.props.login.factory} onChangeText={(factory) => this.props.setLoginFactory(factory)}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginFactoryList);