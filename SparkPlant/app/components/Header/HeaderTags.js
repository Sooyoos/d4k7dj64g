import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import HeaderButton from '../HeaderButton/HeaderButton';

let styles = StyleSheet.create({
    header: {
        flex:0.5,
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
        padding : 10,
    },
    title : {
        color:'#ffffff',
        width: 200,
        fontSize : 20,
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