import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import * as layout from "../../assets/layout";
import Icon from 'react-native-vector-icons/MaterialIcons';

let styles = StyleSheet.create({
    header: {
        height : layout.height8,
        width : layout.fullWidth,
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
    },
    title:{
        flex : 8.4,
        margin:5,
        fontSize:layout.fontSize1p8,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    menuButton : {
        padding : layout.width1,
    },
    menuButtonLayout : {
        height : layout.height5,
        width : layout.height5,
        borderRadius : layout.height2p5,
        marginHorizontal : layout.width2,
        alignItems: "center",
        justifyContent: "center",
    },
    menuIcon : {
        fontSize: layout.fontSize2p4,
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
                <TouchableHighlight style={styles.menuButtonLayout} underlayColor="#C5CAE9" onPress={() => {this.props.props.navigation.navigate('DrawerOpen');}}>
                    <View style={styles.menuButton}>
                        <Icon style={styles.menuIcon} name="menu"/>
                    </View>
                </TouchableHighlight>
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