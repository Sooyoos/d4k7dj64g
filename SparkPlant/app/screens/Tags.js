import React, { Component } from 'react';
import {
    View,
    StyleSheet,

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderTags from "../components/Header/HeaderTags";
import FooterButton from "../components/FooterButton/FooterButton";
import TagList from "../components/Tags/TagList";

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

let tags = [
    {
        title : "Flexible pneumatique fissuré",
        location : "Sableuse - îlot 4 - Atelier A",
        type : "S",
        id : "#00685",
        description : 'Run a manual sweep of anomalous airborne or electromagnetic readings. Radiation levels in our atmosphere have increased by 3,000 percent.',
        author : {
            avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg',
            fullname : 'Mari Doucet',
        },
        status : 'OK',
    },
    {
        title : "Pièces mélangées dans le bac",
        location : "Press 8 - îlot 5 - Atelier C",
        type : "E",
        id : "#00526",
        description : 'Run a manual sweep of anomalous airborne or electromagnetic readings. Radiation levels in our atmosphere have increased by 3,000 percent.',
        author : {
            avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAOvAAAAJDQ4N2RlMzQ2LWNkMTItNDQ4Yy1hOGFmLWEzYzIwZTJlM2Q5NA.jpg',
            fullname : 'Guillaume Sondag',
        },
        status : 'NOK',
    },
    {
        title : "Trou dans la clôture",
        location : "Exterieurs",
        type : "S",
        id : "#00542",
        description : 'Run a manual sweep of anomalous airborne or electromagnetic readings. Radiation levels in our atmosphere have increased by 3,000 percent.',
        author : {
            avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg',
            fullname : 'Mari Doucet',
        },
        status : 'Abandoned',
    },
    {
        title : "Flexible pneumatique fissuré",
        location : "Sableuse - îlot 4 - Atelier A",
        type : "S",
        id : "#00685",
        description : 'Run a manual sweep of anomalous airborne or electromagnetic readings. Radiation levels in our atmosphere have increased by 3,000 percent.',
        author : {
            avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg',
            fullname : 'Mari Doucet',
        },
        status : 'OK',
    },
    {
        title : "Pièces mélangées dans le bac",
        location : "Press 8 - îlot 5 - Atelier C",
        type : "E",
        id : "#00526",
        description : 'Run a manual sweep of anomalous airborne or electromagnetic readings. Radiation levels in our atmosphere have increased by 3,000 percent.',
        author : {
            avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAOvAAAAJDQ4N2RlMzQ2LWNkMTItNDQ4Yy1hOGFmLWEzYzIwZTJlM2Q5NA.jpg',
            fullname : 'Guillaume Sondag',
        },
        status : 'NOK',
    },
    {
        title : "Trou dans la clôture",
        location : "Exterieurs",
        type : "S",
        id : "#00542",
        description : 'Run a manual sweep of anomalous airborne or electromagnetic readings. Radiation levels in our atmosphere have increased by 3,000 percent.',
        author : {
            avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg',
            fullname : 'Mari Doucet',
        },
        status : 'New',
    },
];

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
                    <TagList {...this.props} items={tags} />
                </View>
                <View style={styles.footer}>
                    <FooterButton {...this.props} active={true} iconName="eye" text="Suivis" route="Tags"/>
                    <FooterButton {...this.props} active={false} iconName="tags" text="Tous" route="AllTags"/>
                </View>
            </View>
        );
    }
}
