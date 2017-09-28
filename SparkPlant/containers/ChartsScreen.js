import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActionCreators } from '../actions';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import HeaderTags from "../components/Header/HeaderTags";
import FooterButton from "../components/Footer/FooterButton";
import TagList from "../components/Tags/TagList";

let styles = StyleSheet.create({

});

class ChartsScreen extends Component {

    static navigationOptions = {
        title : 'ANALYTICS',
        drawerLabel: "ANALYTICS",
        drawerIcon: ({tintColor}) => (
            <Icon name='bar-chart' style={{fontSize : responsiveFontSize(1.8), color : '#757575'}}/>
        ),
    };

    constructor(props)
    {
        super(props);
    }

    componentWillMount()
    {

    }

    render() {
        return (
            <View>

            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        login: state.login,
        nav : state.nav,
        charts : state.charts,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ChartsScreen);