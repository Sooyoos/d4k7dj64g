import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
} from 'react-native';

let styles = StyleSheet.create({
    item: {
        width:414 ,
        flexDirection : 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#bdbdbd',
        padding : 10,
    },
    imageSection : {
        flex: 1,
    },
    image : {
        width:40,
        height: 40,
        borderRadius: 20,
    },
    contentSection : {
        flex : 4,
        flexDirection: 'column',
    },
    contentFirst : {
        color : '#212121',
        fontSize : 16,
    },
    contentSecond : {
        color : '#212121',
        fontSize : 14,
    }
});

export default class TagListItem extends Component {

    constructor(props) {
        super(props);
    }

    getFirstLine()
    {
        switch(this.props.item.type)
        {
            case "creation" :
                return this.props.item.author.fullname + " adresse le tag à " + this.props.item.recipient;
                break;
            case "comment" :
                return "Commentaire de " + this.props.item.author.fullname;
                break;
            case "transfer" :
                return this.props.item.author.fullname + " a transféré le tag à " + this.props.item.recipient;
                break;
            case "resolve" :
                return this.props.item.author.fullname + " a clos le tag Résolu";
                break;
            case "closed" :
                return this.props.item.author.fullname + " a clos le tag Non Résolu";
                break;
        }
    }

    getSecondLine()
    {
        switch(this.props.item.type)
        {
            case "comment" :
                return this.props.item.content;
                break;
            default :
                return this.props.item.date;
                break;
        }
    }

    render() {
        return (
            <View style={styles.item}>
                <View style={styles.imageSection}>
                    <Image style={styles.image} source={{uri : this.props.item.author.avatar}} />
                </View>
                <View style={styles.contentSection}>
                    <Text style={styles.contentFirst}>
                        {this.getFirstLine()}
                    </Text>
                    <Text style={styles.contentSecond}>
                        {this.getSecondLine()}
                    </Text>
                </View>
            </View>
        );
    }
};