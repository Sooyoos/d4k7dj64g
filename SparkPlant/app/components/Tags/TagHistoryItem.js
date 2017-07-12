import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

let styles = StyleSheet.create({
    item: {
        width:responsiveWidth(100) ,
        flexDirection : 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#bdbdbd',
        padding : 10,
    },
    imageSection : {
        width: responsiveWidth(12),
    },
    image : {
        width: responsiveWidth(8),
        height: responsiveWidth(8),
        borderRadius: responsiveWidth(4),
    },
    contentSection : {
        width: responsiveWidth(88),
        flexDirection: 'column',
    },
    contentFirst : {
        color : '#212121',
        fontSize : responsiveFontSize(1.6),
    },
    contentSecond : {
        color : '#212121',
        fontSize : responsiveFontSize(1.4),
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