import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import HeaderButton from '../HeaderButton/HeaderButton';
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
    }
});

export default class HeaderTags extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.header}>
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