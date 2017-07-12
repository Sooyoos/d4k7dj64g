import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import FooterButton from "../../components/FooterButton/FooterButton";
import HeaderTagDetails from "../../components/Header/HeaderTagDetails";
import TagHistoryList from "../../components/Tags/TagHistoryList";

let styles = StyleSheet.create({
    login: {
        flex:1,
    },
    header : {
        height : responsiveHeight(7),
    },
    list: {
        height : responsiveHeight(83),
        backgroundColor: '#FFFFFF',
        alignItems:'center',
        justifyContent: 'center',
    },
    footer: {
        height : responsiveHeight(10),
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
    },
});

export default class TagHistory extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let tag = this.props.navigation.state.params.tag;
        return (
            <View style={styles.login}>
                <HeaderTagDetails {...this.props} headerTitle={tag.title} />
                <View style={styles.list}>
                    <TagHistoryList {...this.props} items={tag.history} />
                </View>
                <View style={styles.footer}>
                    <FooterButton {...this.props} active={false} tag={tag} iconName="sticky-note-o" text="Contenu" route="TagDetails"/>
                    <FooterButton {...this.props} active={true} tag={tag} iconName="info" text="Historique" route="TagHistory"/>
                    <FooterButton {...this.props} active={false} tag={tag} iconName="exchange" text="Actions" route="TagActions"/>
                </View>
            </View>
        );
    }
};