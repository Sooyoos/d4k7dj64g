import React, { Component } from 'react';
import {
    View,
    StyleSheet,

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderTags from "../components/Header/HeaderTags";
import FooterButton from "../components/FooterButton/FooterButton";

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

export default class Tags extends Component {

    static navigationOptions = {
        drawerLabel: 'TAGS',
        drawerIcon: ({tintColor}) => (
            <Icon name='tag' style={{fontSize : 24, color : '#757575'}}/>
        ),
    };

    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            <View style={styles.login}>
                <HeaderTags {...this.props} headerTitle="Mes tags"/>
                <View style={styles.body}>

                </View>
                <View style={styles.footer}>
                    <FooterButton {...this.props} active={true} iconName="eye" text="Suivis" route="Tags"/>
                    <FooterButton {...this.props} active={false} iconName="tags" text="Tous" route="AllTags"/>
                </View>
            </View>
        );
    }
}
