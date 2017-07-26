import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import Moment from 'moment';
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

class TagListItem extends Component {

    constructor(props) {
        super(props);
    }

    getFirstLine()
    {
        if(this.props.item.typeAction === "tag_by_responsable")
        {
            return this.props.item.user.firstName + " " + this.props.item.user.lastName + " adresse le tag à " + this.props.item.assignedTo.firstName + " " + this.props.item.assignedTo.lastName;
        }

        if(this.props.item.type === "add_tag_comment")
        {
            return "Commentaire de " + this.props.item.user.firstName + " " + this.props.item.user.lastName;
        }
        /*switch(this.props.item.typeAction)
        {
            case "tag_by_responsable" :
                return this.props.item.user.firstName + " " + this.props.item.user.lastName + " adresse le tag à " + this.props.item.assignedTo.firstName + " " + this.props.item.assignedTo.lastName;
                break;
            case "add_tag_comment" :
                return "Commentaire de " + this.props.item.user.firstName + " " + this.props.item.user.lastName;
                break;
            case "transfer" :
                return this.props.item.user.firstName + " " + this.props.item.user.lastName + " a transféré le tag à " + this.props.item.assignedTo.firstName + " " + this.props.item.assignedTo.lastName;
                break;
            case "resolve" :
                return this.props.item.user.firstName + " " + this.props.item.user.lastName + " a clos le tag Résolu";
                break;
            case "closed" :
                return this.props.item.user.firstName + " " + this.props.item.user.lastName + " a clos le tag Non Résolu";
                break;
        }*/
    }

    getSecondLine()
    {
        Moment.locale('fr');
        if(this.props.item.type === "add_tag_comment")
        {
            return this.props.item.content;
        }
        else
        {
            return Moment(this.props.item.createdAt).format('DD/MM/YYYY');
        }
    }

    render() {
        return (
            <View style={styles.item}>
                <View style={styles.imageSection}>
                    <Image style={styles.image} source={{uri : "https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg"}} />
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

function mapStateToProps(state) {
    return {
        login: state.login,
        nav : state.nav,
        tags : state.tags,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(TagListItem);