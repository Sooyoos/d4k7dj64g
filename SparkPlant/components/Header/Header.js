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
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';

let styles = StyleSheet.create({
    header: {
        height : responsiveHeight(8),
        width : responsiveWidth(100),
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
    },
    title:{
        flex : 8.4,
        margin:5,
        fontSize:responsiveFontSize(1.8),
        color: '#FFFFFF',
        textAlign: 'center',
    },
    menuButton : {
        padding : responsiveWidth(1),
    },
    menuIcon : {
        fontSize: responsiveFontSize(2.4),
        color : "#ffffff",
    }
});

class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.header}>
                <TouchableWithoutFeedback onPress={() => {this.props.props.navigation.navigate('DrawerOpen');}}>
                    <View style={styles.menuButton}>
                        <Icon style={styles.menuIcon} name="menu"/>
                    </View>
                </TouchableWithoutFeedback>
                <Text style={styles.title}>
                    SparkPlant
                </Text>
            </View>
        );
    }
};

function mapStateToProps(state) {
    return {
        login: state.login,
        nav : state.nav,
        users : state.users,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);