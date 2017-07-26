import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    AsyncStorage,
    Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

let styles = StyleSheet.create({
    input: {
        width:responsiveWidth(50),
        height:responsiveHeight(8),
        fontSize : responsiveFontSize(1.6),
    }
});

class LoginUsernameInput extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            <TextInput style={styles.input} placeholder="Username" value={this.props.login.username} onChangeText={(username) => this.props.setLoginUsername(username)}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginUsernameInput);