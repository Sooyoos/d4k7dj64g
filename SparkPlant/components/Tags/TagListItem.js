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
import Moment from "moment";
import * as layout from "../../assets/layout";

let styles = StyleSheet.create({
    item: {
        width : layout.width83,
        height : layout.height18,
        paddingLeft: layout.width3,
        paddingRight: layout.width3,
        paddingTop: layout.height1,
        paddingBottom: layout.height1,
        marginTop: layout.height1,
        marginBottom: layout.height1p8,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
    },
    main : {
        width:layout.width65,
        flexDirection: 'column',
        marginRight: layout.width1,
    },
    aside : {
        width: layout.width15,
        height : layout.height12,
        alignItems: 'center',
        justifyContent : "center",
    },
    itemTitle : {
        width:layout.width65,
        height : layout.height4,
        color : '#212121',
        fontSize:layout.fontSize2,
    },
    itemLocation : {
        width:layout.width65,
        height : layout.height4,
        color : '#757575',
        fontSize:layout.fontSize2,
    },
    itemInfos : {
        width:layout.width65,
        height : layout.height4,
        flexDirection: 'row',
    },
    itemId : {
        color : '#757575',
        fontSize:layout.fontSize1p6,
    },
    itemImage : {
        width:layout.width3p8,
        height:layout.width3p8,
        borderRadius : layout.width1p9,
        marginLeft:layout.width0p5,
        marginRight:layout.width0p5,
    },
    itemFullname : {
        flex : 1,
        color : '#212121',
        fontSize:layout.fontSize1p6,
    },
    itemType : {
        backgroundColor:'#00bcd4',
        width:layout.width10,
        height:layout.width10,
        borderRadius : layout.width5,
        alignItems: "center",
        justifyContent: "center",
    },
    itemStatus : {
        marginTop : layout.height1,
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
            return <Icon name="star" style={{fontSize: layout.fontSize2p6, color : "#4caf50"}} />;
        }
        else if(this.props.tag.status === "new")
        {
            return <Icon name="star-o" style={{fontSize: layout.fontSize2p6}} />;
        }
        else if (this.props.tag.status === "ongoing") {
            return <Icon name="star-half-o" style={{fontSize: layout.fontSize2p6}} />;
        }
        else if (this.props.tag.status === "closed_unresolved") {
            return <Icon name="star" style={{fontSize: layout.fontSize2p6}} />;
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
                        <Text style={styles.itemFullname}>
                            { this.props.tag.updatedAt !== null ? Moment(this.props.tag.updatedAt).format("DD/MM/YYYY") : Moment(this.props.tag.createdAt).format("DD/MM/YYYY") }
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
                            <Text style={{color: '#ffffff', fontSize : layout.fontSize2p4, textAlign: 'center'}}>
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
