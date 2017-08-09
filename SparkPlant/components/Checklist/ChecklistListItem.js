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
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import ElevatedView from 'react-native-elevated-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';

let styles = StyleSheet.create({
    item : {
        width : responsiveWidth(90),
        height : responsiveHeight(15),
        marginVertical : responsiveHeight(1.8),
        backgroundColor: "#ffffff",
        flexDirection: 'row',
    },
    listTypeView : {
        width : responsiveHeight(15),
        height : responsiveHeight(15),
        padding : responsiveHeight(2.5),
    },
    listTypeButton : {
        width : responsiveHeight(10),
        height : responsiveHeight(10),
        borderRadius : responsiveHeight(5),
        backgroundColor: "#00bcd4",
        justifyContent:'center',
    },
    listType : {
        fontSize : responsiveFontSize(4),
        color: "#ffffff",
        textAlign : 'center',
    },
    listContentView : {
        width : responsiveWidth(90) - responsiveHeight(15),
        height : responsiveHeight(15),
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(5),
    },
    listName : {
        color : "#212121",
        fontSize : responsiveFontSize(1.8),
    },
    listDescription : {
        color : "#757575",
        fontSize : responsiveFontSize(1.8),
    },
    listRecurrence : {
        color : "#212121",
        fontSize : responsiveFontSize(1.5),
    },
    listNameKO : {
        color : "#212121",
        fontSize : responsiveFontSize(1.8),
        fontWeight: "bold",
    },
    listDescriptionKO : {
        color : "#757575",
        fontSize : responsiveFontSize(1.8),
        fontWeight: "bold",
    },
    listRecurrenceKO : {
        color : "#212121",
        fontSize : responsiveFontSize(1.5),
        fontWeight: "bold",
    }
});

class ChecklistListItem extends Component {

    constructor(props)
    {
        super(props);
    }

    goToDetails()
    {
        this.props.setCurrentNews(this.props.item);
        this.props.route();
    }

    render() {
        let item = this.props.item;

        if(item.status && item.status === "OK")
        {
            return (
                <TouchableWithoutFeedback onPress={this.goToDetails.bind(this)}>
                    <ElevatedView style={styles.item} elevation={2}>
                        <View style={styles.listTypeView}>
                            <View style={styles.listTypeButton}>
                                <Text style={styles.listType}>
                                    {item.type}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.listContentView}>
                            <Text style={styles.listName}>
                                {item.checklist.name}
                            </Text>
                            <Text style={styles.listDescription} numberOfLine={2}>
                                {item.checklist.description}
                            </Text>
                            <Text style={styles.listRecurrence}>
                                ({item.checklist.recurrence})
                            </Text>
                        </View>
                    </ElevatedView>
                </TouchableWithoutFeedback>
            );
        }
        else if(!item.status)
        {
            return (
                <TouchableWithoutFeedback onPress={this.goToDetails.bind(this)}>
                    <ElevatedView style={styles.item} elevation={2}>
                        <View style={styles.listTypeView}>
                            <View style={styles.listTypeButton}>
                                <Text style={styles.listType}>
                                    {item.type}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.listContentView}>
                            <Text style={styles.listName}>
                                {item.checklist.name}
                            </Text>
                            <Text style={styles.listDescription} numberOfLine={2}>
                                {item.checklist.description}
                            </Text>
                            <Text style={styles.listRecurrence}>
                                ({item.checklist.recurrence})
                            </Text>
                        </View>
                    </ElevatedView>
                </TouchableWithoutFeedback>
            );
        }
        else
        {
            return (
                <TouchableWithoutFeedback onPress={this.goToDetails.bind(this)}>
                    <ElevatedView style={styles.item} elevation={2}>
                        <View style={styles.listTypeView}>
                            <View style={styles.listTypeButton}>
                                <Text style={styles.listType}>
                                    {item.type}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.listContentView}>
                            <Text style={styles.listNameKO}>
                                {item.checklist.name}
                            </Text>
                            <Text style={styles.listDescriptionKO} numberOfLine={2}>
                                {item.checklist.description}
                            </Text>
                            <Text style={styles.listRecurrenceKO}>
                                ({item.checklist.recurrence})
                            </Text>
                        </View>
                    </ElevatedView>
                </TouchableWithoutFeedback>
            );
        }

    }
}

function mapStateToProps(state) {
    return {
        login: state.login,
        nav : state.nav,
        tags : state.tags,
        news : state.news,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ChecklistListItem);