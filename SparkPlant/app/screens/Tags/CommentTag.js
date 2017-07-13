import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    Text,
} from 'react-native';
import FooterButton from "../../components/FooterButton/FooterButton";
import HeaderTagDetails from "../../components/Header/HeaderTagDetails";
import Icon from 'react-native-vector-icons/FontAwesome';
import ElevatedView from "react-native-elevated-view";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

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
    comment : {
        width: responsiveWidth(75),
        height: responsiveHeight(15),
        fontSize : responsiveFontSize(1.6)
    },
    button : {
        marginTop : 30,
        marginBottom: 30,
        width : responsiveWidth(25),
        height: responsiveWidth(25),
        borderRadius: responsiveWidth(12.5),
        alignItems: 'center',
        backgroundColor: '#9c27b0',
        padding: 30,
    },
    icon : {
        color: '#ffffff',
        textAlign: 'center',
        fontSize : responsiveFontSize(9),
    },
    footer: {
        height : responsiveHeight(10),
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
        paddingBottom : responsiveHeight(3),
    },
});

export default class CommentTag extends Component {

    constructor(props) {
        super(props);
    }

    sendComment(comment)
    {
        /*this.props.navigation.state.params.tag.history.push(
            {
                type : 'comment',
                date : '24/11/2016 à 08h54',
                content: comment,
                author : {
                    fullname : 'Mari Doucet',
                    avatar : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg'
                },
            }
        );*/
        Keyboard.dismiss();
        this.props.navigation.navigate('TagDetails', {tag : this.props.navigation.state.params.tag});
    }

    render() {
        let tag = this.props.navigation.state.params.tag;
        return (
            <View style={styles.login}>
                <HeaderTagDetails {...this.props} headerTitle={tag.id + ' : ajouter un commentaire'} />
                <View style={styles.list}>
                    <Text style={{fontSize: responsiveFontSize(1.8), color : '#212121'}}>
                        Votre commentaire :
                    </Text>
                    <TextInput multiline={true} style={styles.comment} placeholder="Entrez votre commentaire..." maxLength={140}/>
                    <TouchableWithoutFeedback onPress={(value) => this.sendComment(value)}>
                        <View>
                            <ElevatedView style={styles.button} elevation={9}>
                                <Icon name="commenting-o" style={styles.icon} />
                            </ElevatedView>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.footer}>
                    <FooterButton {...this.props} active={false} tag={tag} iconName="sticky-note-o" text="Contenu" route="TagDetails"/>
                    <FooterButton {...this.props} active={false} tag={tag} iconName="info" text="Historique" route="TagHistory"/>
                    <FooterButton {...this.props} active={true} tag={tag} iconName="exchange" text="Actions" route="TagActions"/>
                </View>
            </View>
        );
    }
};