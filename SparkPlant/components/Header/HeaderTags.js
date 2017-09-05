import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeaderButton from './HeaderButton';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

let styles = StyleSheet.create({
    header: {
        height : responsiveHeight(7),
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
        padding : 10,
    },
    title : {
        color:'#ffffff',
        width: 200,
        fontSize : responsiveFontSize(1.8),
    },
    menuButton : {
        padding : responsiveWidth(1),
    },
    menuIcon : {
        fontSize: responsiveFontSize(2.4),
        color : "#ffffff",
    }
});

class HeaderTags extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.header}>
                <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('DrawerOpen');}}>
                    <View style={styles.menuButton}>
                        <Icon style={styles.menuIcon} name="menu"/>
                    </View>
                </TouchableWithoutFeedback>
                <Text style={styles.title}>
                    {this.props.headerTitle}
                </Text>
                <HeaderButton {... this.props} iconName="plus" route="CreateTagStep1" />
                <HeaderButton {... this.props} iconName="sort-amount-desc" route="FilterTag" />
                <HeaderButton {... this.props} iconName="search" route="SearchTag" />
            </View>
        );
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


export default connect(mapStateToProps, mapDispatchToProps)(HeaderTags);