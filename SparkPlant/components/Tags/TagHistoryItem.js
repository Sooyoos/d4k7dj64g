import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    ToastAndroid,
    Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import Moment from 'moment';
import * as layout from "../../assets/layout";

let styles = StyleSheet.create({
    item: {
        width: layout.fullWidth,
        flexDirection : 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#bdbdbd',
        padding : 10,
    },
    imageSection : {
        width: layout.width12,
    },
    image : {
        width: Math.round(layout.width8),
        height: Math.round(layout.width8),
        borderRadius: Math.round(layout.width4),
    },
    contentSection : {
        width: layout.width88,
        flexDirection: 'column',
    },
    contentFirst : {
        color : '#212121',
        fontSize : layout.fontSize1p6,
    },
    contentSecond : {
        color : '#212121',
        fontSize : layout.fontSize1p4,
    }
});

class TagHistoryItem extends Component {

    constructor(props) {
        super(props);
    }

    getFirstLine()
    {
        if(this.props.item.type === "change_tag_supervisor")
        {
            return this.props.item.user.firstName + " " + this.props.item.user.lastName + " adresse le tag à " + this.props.item.assignedTo.firstName + " " + this.props.item.assignedTo.lastName;
        }

        if(this.props.item.type === "add_tag_comment")
        {
            return "Commentaire de " + this.props.item.user.firstName + " " + this.props.item.user.lastName;
        }

        if(this.props.item.type === "add_tag")
        {
            return this.props.item.user.firstName + " " + this.props.item.user.lastName + " adresse le tag à " + this.props.item.assignedTo.firstName + " " + this.props.item.assignedTo.lastName;
        }

        if(this.props.item.type === "close_tag")
        {
            let status = "";

            if(this.props.tags.currentTag.status === "closed_resolved")
                status = "résolu";
            else
                status = "non résolu";

            return this.props.item.user.firstName + " " + this.props.item.user.lastName + " a marqué le tag comme étant " + status;
        }

        return "";
    }

    getSecondLine()
    {
        if(this.props.item.type === "add_tag_comment")
        {
            return this.props.item.tagComment.content;
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
                    <Image style={styles.image} source={{uri : this.props.item.user.avatar ? this.props.item.user.avatar.path : "http://via.placeholder.com/50x50" }} resizeMethod="resize" onProgress={(e) => { console.warn(e.nativeEvent.loaded); if(e.nativeEvent.loaded === e.nativeEvent.total){ this.setState({loadingImage : false}) } }} />
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


export default connect(mapStateToProps, mapDispatchToProps)(TagHistoryItem);