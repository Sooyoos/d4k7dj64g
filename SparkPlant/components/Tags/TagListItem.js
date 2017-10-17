import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import ElevatedView from 'react-native-elevated-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

let styles = StyleSheet.create({
    item: {
        width : responsiveWidth(83),
        height : responsiveHeight(15),
        paddingLeft: responsiveWidth(3),
        paddingRight: responsiveWidth(3),
        paddingTop: responsiveHeight(1),
        paddingBottom: responsiveHeight(1),
        marginTop: responsiveHeight(1),
        marginBottom: responsiveHeight(1.8),
        backgroundColor: '#ffffff',
        flexDirection: 'row',
    },
    main : {
        width:responsiveWidth(65),
        flexDirection: 'column',
        marginRight: responsiveWidth(1),
    },
    aside : {
        width: responsiveWidth(15),
        height : responsiveHeight(12),
        alignItems: 'center',
        justifyContent : "center",
    },
    itemTitle : {
        width:responsiveWidth(65),
        height : responsiveHeight(4),
        color : '#212121',
        fontSize:responsiveFontSize(2.4),
    },
    itemLocation : {
        width:responsiveWidth(65),
        height : responsiveHeight(4),
        color : '#757575',
        fontSize:responsiveFontSize(2.2),
    },
    itemInfos : {
        width:responsiveWidth(65),
        height : responsiveHeight(4),
        flexDirection: 'row',
    },
    itemId : {
        color : '#757575',
        fontSize:responsiveFontSize(2),
    },
    itemImage : {
        width:responsiveWidth(3.8),
        height:responsiveWidth(3.8),
        borderRadius : responsiveWidth(1.9),
        marginLeft:responsiveWidth(0.5),
        marginRight:responsiveWidth(0.5),
    },
    itemFullname : {
        flex : 1,
        color : '#212121',
        fontSize:responsiveFontSize(2),
    },
    itemType : {
        backgroundColor:'#00bcd4',
        width:responsiveWidth(10),
        height:responsiveWidth(10),
        borderRadius : responsiveWidth(5),
        alignItems: "center",
        justifyContent: "center",
    },
    itemStatus : {
        marginTop : responsiveHeight(1),
    },
});

function lpad(value, padding) {
    var zeroes = new Array(padding+1).join("0");
    return (zeroes + value).slice(-padding);
}

class TagListItem extends Component {

    constructor(props) {
        super(props);
    }

    getStatusIcon() {
        if (this.props.tag.status === "closed_resolved") {
            return <Icon name="star" style={{fontSize: responsiveFontSize(2.6), color : "#4caf50"}} />;
        }
        else if(this.props.tag.status === "new")
        {
            return <Icon name="star-o" style={{fontSize: responsiveFontSize(2.6)}} />;
        }
        else if (this.props.tag.status === "ongoing") {
            return <Icon name="star-half-o" style={{fontSize: responsiveFontSize(2.6)}} />;
        }
        else if (this.props.tag.status === "closed_unresolved") {
            return <Icon name="star" style={{fontSize: responsiveFontSize(2.6)}} />;
        }
    }

    goToDetails()
    {
        this.props.trySetCurrentTag(this.props.tag);
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.goToDetails.bind(this)}>
                <ElevatedView style={styles.item} elevation={2}>
                    <View style={styles.main}>
                        <Text style={styles.itemTitle}>
                            {this.props.tag.title}
                        </Text>
                        <Text style={styles.itemLocation}>
                            {this.props.tag.place.name}
                        </Text>
                        <View style={styles.itemInfos}>
                            <Text style={styles.itemId}>
                                #{lpad(this.props.tag["@id"].substr(this.props.tag["@id"].lastIndexOf("/") +1), 6)}
                            </Text>
                            <Image style={styles.itemImage} source={{uri : this.props.tag.supervisor.avatar ? this.props.tag.supervisor.avatar.path : "http://via.placeholder.com/50x50" }} />
                            <Text style={styles.itemFullname}>
                                {this.props.tag.supervisor.firstName} {this.props.tag.supervisor.lastName}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.aside}>
                        <View style={styles.itemType}>
                            <Text style={{color: '#ffffff', fontSize : responsiveFontSize(2.4), textAlign: 'center'}}>
                                {this.props.tag.primaryAxis.code}
                            </Text>
                        </View>
                        <View style={styles.itemStatus}>
                            { this.getStatusIcon() }
                        </View>
                    </View>
                </ElevatedView>
            </TouchableWithoutFeedback>
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
