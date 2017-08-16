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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

let styles = StyleSheet.create({
    item: {
        flex: 1,
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
        width: responsiveWidth(10),
        alignItems: 'center',
    },
    itemTitle : {
        flex : 1,
        color : '#212121',
        fontSize:responsiveFontSize(1.8),
    },
    itemLocation : {
        flex : 1,
        color : '#757575',
        fontSize:responsiveFontSize(1.6),
    },
    itemInfos : {
        flex : 1,
        flexDirection: 'row',
    },
    itemId : {
        color : '#757575',
        fontSize:responsiveFontSize(1.4),
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
        fontSize:responsiveFontSize(1.4),
    },
    itemType : {
        backgroundColor:'#00bcd4',
        width:responsiveWidth(5),
        height:responsiveWidth(5),
        borderRadius : responsiveWidth(2.5),
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
            return 'comment-check-outline';
        }
        else if (this.props.tag.status === "ongoing") {
            return 'comment-alert-outline';
        }
        else if (this.props.tag.status === "closed_unresolved") {
            return 'comment-remove-outline';
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
                            <Image style={styles.itemImage} source={ { uri : "https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg"}} />
                            <Text style={styles.itemFullname}>
                                {this.props.tag.supervisor.firstName} {this.props.tag.supervisor.lastName}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.aside}>
                        <View style={styles.itemType}>
                            <Text style={{color: '#ffffff', fontSize : responsiveFontSize(1.8), textAlign: 'center'}}>
                                {this.props.tag.primaryAxis.code}
                            </Text>
                        </View>
                        <View style={styles.itemStatus}>
                            <Icon name={this.getStatusIcon()} style={{fontSize: responsiveFontSize(2.6)}} />
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
