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
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
        padding : 10,
    },
    title : {
        color:'#ffffff',
        width: layout.width50,
        fontSize : layout.fontSize1p8,
    },
    menuButton : {
        padding : layout.width1,
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

    isResponsable()
    {
        let roles = this.props.users.loggedUser.rolesByUnit;

        for(var i = 0; i < roles.length; i++)
        {
            if(roles[i].role.title === "Responsable")
            {
                return true;
            }
        }

        return false;
    }

    back()
    {
        this.props.navigateBack();
    }

    render() {
        let responsable = this.isResponsable();

        if(this.props.waiting)
        {
            if(responsable)
            {
                return (
                    <View style={styles.header}>
                        <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('DrawerOpen');}}>
                            <View style={styles.menuButton}>
                                <Icon style={styles.menuIcon} name="menu"/>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => {this.back()}}>
                            <View style={styles.menuButton}>
                                <Icon style={styles.menuIcon} name="arrow-back"/>
                            </View>
                        </TouchableWithoutFeedback>
                        <Text style={styles.title}>
                            {this.props.headerTitle}
                        </Text>
                        <HeaderButton {... this.props} iconName="plus" route="CreateNewsStep1" />
                        <HeaderButton {... this.props} iconName="search" route="SearchWaitingNews" />
                    </View>
                );
            }
            else
            {
                return (
                    <View style={styles.header}>
                        <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('DrawerOpen');}}>
                            <View style={styles.menuButton}>
                                <Icon style={styles.menuIcon} name="menu"/>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => {this.back()}}>
                            <View style={styles.menuButton}>
                                <Icon style={styles.menuIcon} name="arrow-back"/>
                            </View>
                        </TouchableWithoutFeedback>
                        <Text style={styles.title}>
                            {this.props.headerTitle}
                        </Text>
                        <HeaderButton {... this.props} iconName="search" route="SearchWaitingNews" />
                    </View>
                );
            }
        }
        else
        {
            if(responsable)
            {
                return (
                    <View style={styles.header}>
                        <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('DrawerOpen');}}>
                            <View style={styles.menuButton}>
                                <Icon style={styles.menuIcon} name="menu"/>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => {this.back()}}>
                            <View style={styles.menuButton}>
                                <Icon style={styles.menuIcon} name="arrow-back"/>
                            </View>
                        </TouchableWithoutFeedback>
                        <Text style={styles.title}>
                            {this.props.headerTitle}
                        </Text>
                        <HeaderButton {... this.props} iconName="plus" route="CreateNewsStep1" />
                        <HeaderButton {... this.props} iconName="search" route="SearchNews" />
                    </View>
                );
            }
            else
            {
                return (
                    <View style={styles.header}>
                        <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('DrawerOpen');}}>
                            <View style={styles.menuButton}>
                                <Icon style={styles.menuIcon} name="menu"/>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => {this.back()}}>
                            <View style={styles.menuButton}>
                                <Icon style={styles.menuIcon} name="arrow-back"/>
                            </View>
                        </TouchableWithoutFeedback>
                        <Text style={styles.title}>
                            {this.props.headerTitle}
                        </Text>
                        <HeaderButton {... this.props} iconName="search" route="SearchNews" />
                    </View>
                );
            }
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