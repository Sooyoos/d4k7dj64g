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
import * as layout from "../../assets/layout";
import Icon from 'react-native-vector-icons/MaterialIcons';

let styles = StyleSheet.create({
    header: {
        height : layout.height8,
        width : layout.fullWidth,
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
        paddingTop : layout.height2,
    },
    title:{
        width : layout.width84,
        fontSize:layout.fontSize1p8,
        color: '#FFFFFF',
        textAlign: 'center',
        marginLeft: layout.width5 * -1,
    },
    menuButton : {
        padding : layout.width1,
        marginRight: layout.width2
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
                <TouchableWithoutFeedback onPress={() => {this.props.goToMenu(this.props.from);}}>
                    <View style={styles.menuButton}>
                        <Icon style={styles.menuIcon} name="menu"/>
                    </View>
                </TouchableWithoutFeedback>
                <Text style={styles.title}>
                    SparkPlant
                </Text>
                <TouchableWithoutFeedback onPress={() => {this.props.navigate('Info');}}>
                    <View style={styles.menuButton}>
                        <Icon style={styles.menuIcon} name="info-outline"/>
                    </View>
                </TouchableWithoutFeedback>
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