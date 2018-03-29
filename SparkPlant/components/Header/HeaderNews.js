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
import * as layout from "../../assets/layout";

let styles = StyleSheet.create({
    header: {
        height : layout.height8,
        width : layout.fullWidth,
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
        paddingTop : layout.height2,
    },
    title : {
        color:'#ffffff',
        width: layout.width60,
        fontSize : layout.fontSize1p8,
        textAlign : 'center',
    },
    menuButton : {
        padding : layout.width1,
        width : layout.width8,
    },
    menuIcon : {
        fontSize: layout.fontSize2p4,
        color : "#ffffff",
    }
});

class HeaderNews extends Component {

    constructor(props) {
        super(props);
    }

    back()
    {
        this.props.navigateBack();
    }

    render() {

        if(this.props.waiting)
        {
            return (
                <View style={styles.header}>
                    <TouchableWithoutFeedback onPress={() => {this.props.goToMenu('News');}}>
                        <View style={styles.menuButton}>
                            <Icon style={styles.menuIcon} name="menu"/>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {this.back()}}>
                        <View style={styles.menuButton}>
                            <Icon style={styles.menuIcon} name="arrow-back"/>
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.title}> {this.props.headerTitle} </Text>
                    <HeaderButton {... this.props} iconName="plus" route="CreateNewsStep1" />
                    <HeaderButton {... this.props} iconName="search" route="SearchWaitingNews" />
                </View>
            );
        }
        else
        {
            return (
                <View style={styles.header}>
                    <TouchableWithoutFeedback onPress={() => {this.props.goToMenu('News');}}>
                        <View style={styles.menuButton}>
                            <Icon style={styles.menuIcon} name="menu"/>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {this.back()}}>
                        <View style={styles.menuButton}>
                            <Icon style={styles.menuIcon} name="arrow-back"/>
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.title}> {this.props.headerTitle} </Text>
                    <HeaderButton {... this.props} iconName="plus" route="CreateNewsStep1" />
                    <HeaderButton {... this.props} iconName="search" route="SearchNews" />
                </View>
            );
        }
    }
};

function mapStateToProps(state) {
    return {
        login: state.login,
        nav : state.nav,
        tags : state.tags,
        users : state.users,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(HeaderNews);