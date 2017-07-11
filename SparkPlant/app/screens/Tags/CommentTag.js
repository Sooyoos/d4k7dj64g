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

let styles = StyleSheet.create({
    login: {
        flex:1,
    },
    list: {
        flex:8,
        backgroundColor: '#FFFFFF',
        alignItems:'center',
        justifyContent: 'center',
    },
    comment : {
        width: 300,
        height: 150,
    },
    button : {
        marginTop : 30,
        width : 90,
        height: 90,
        borderRadius: 45,
        alignItems: 'center',
        backgroundColor: '#00bcd4',
        padding: 20,
    },
    icon : {
        color: '#ffffff',
        textAlign: 'center',
        fontSize : 45,
    },
    footer: {
        flex:1,
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
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
                    <Text style={{fontSize: 16, color : '#212121'}}>
                        Votre commentaire :
                    </Text>
                    <TextInput multiline={true} style={styles.comment} placeholder="Entrez votre commentaire..." maxLength={140}/>
                    <TouchableWithoutFeedback onPress={(value) => this.sendComment(value)}>
                        <View>
                            <ElevatedView style={styles.button} elevation={9}>
                                <Icon name="commenting-o" style={styles.icon} />
                            </ElevatedView>
                            <Text style={{fontSize: 16, color : '#212121', textAlign:'center',}}>
                                Ajouter
                            </Text>
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