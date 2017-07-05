import React, { Component } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import HeaderTags from "../../components/Header/HeaderTags";
import FooterButton from "../../components/FooterButton/FooterButton";

let styles = StyleSheet.create({
    login: {
        flex:1,
    },
    body: {
        flex:8,
        backgroundColor: '#FFFFFF',
        alignItems:'center',
        justifyContent: 'center',
    },
    footer: {
        flex:1,
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
    },
});

export default class TagsFull extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.login}>
                <HeaderTags {...this.props} headerTitle="Tous les tags"/>
                <View style={styles.body}>

                </View>
                <View style={styles.footer}>
                    <FooterButton {...this.props} active={false} iconName="eye" text="Suivis" route="Tags"/>
                    <FooterButton {...this.props} active={true} iconName="tags" text="Tous" route="AllTags"/>
                </View>
            </View>
        );
    }
};