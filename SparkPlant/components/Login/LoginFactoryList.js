import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
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