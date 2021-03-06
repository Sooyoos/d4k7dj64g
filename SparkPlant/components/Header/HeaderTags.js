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
import IconA from 'react-native-vector-icons/FontAwesome';
import HeaderButton from './HeaderButton';
import * as layout from "../../assets/layout";

let styles = StyleSheet.create({
    header: {
        width : layout.fullWidth,
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
        textAlign : 'center',
    },
    menuButton : {
        padding : layout.width1,
        marginRight: layout.width2,
    },
    menuIcon : {
        fontSize: layout.fontSize2p4,
        color : "#ffffff",
    }
});

class HeaderTags extends Component {

    constructor(props) {
        super(props);
    }

    back()
    {
        this.props.navigateBack();
    }

    render() {
        return (
            <View style={styles.header}>
                <TouchableWithoutFeedback onPress={() => {this.props.goToMenu('Tags');}}>
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