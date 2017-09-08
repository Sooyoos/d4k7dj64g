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
        if(this.props.item["@type"] === "ChecklistInstance")
        {
            this.props.setCurrentChecklist(this.props.item);
        }
        else
        {
            this.props.setCurrentTemplate(this.props.item);
        }

        this.props.route();
    }

    getCategory(item)
    {
        if(item["@type"] === "ChecklistInstance")
        {
            return item.checklist.category.name;
        }
        else
        {
            return item.category.name;
        }
    }

    getTitle(item)
    {
        if(item["@type"] === "ChecklistInstance")
        {
            return item.checklist.name;
        }
        else
        {
            return item.name;
        }
    }

    getDescription(item)
    {
        if(item["@type"] === "ChecklistInstance")
        {
            return item.checklist.description;
        }
        else
        {
            return item.description;
        }
    }

    getFrequency(item)
    {
        if(item["@type"] === "ChecklistInstance")
        {
            return item.checklist.frequency;
        }
        else
        {
            return item.frequency;
        }
    }

    hasToBeDone(item)
    {
        let lastUpdate = Moment(item.updatedAt, Moment.ISO_8601);
        let now = Moment(Date.now());
        let timePassed = Moment.duration(now.diff(lastUpdate));
        let hoursPassed = Math.round(timePassed.asHours());
        let daysPassed = Math.round(timePassed.asDays());

        console.log(hoursPassed);

        if(item.checklist.frequency === "quotidien")
        {
            if(hoursPassed >= 24)
            {
                item.status = "todo";
            }
        }
        else if(item.checklist.frequency === "hebdomadaire")
        {
            if(daysPassed >= 7)
            {
                item.status = "todo";
            }
        }
        else if(item.checklist.frequency === "mensuel")
        {
            if(daysPassed >= 30)
            {
                item.status = "todo";
            }
        }

        return item;
    }

    render() {
        let item = null;

        if(this.props.item.status)
        {
            item = this.hasToBeDone(this.props.item);
        }
        else
        {
            item = this.props.item;
        }

        if(item.status && item.status === "done")
        {
            return (
                <TouchableWithoutFeedback onPress={this.goToDetails.bind(this)}>
                    <ElevatedView style={styles.item} elevation={2}>
                        <View style={styles.listTypeView}>
                            <View style={styles.listTypeButton}>
                                <Text style={styles.listType}>
                                    {this.getCategory(item)}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.listContentView}>
                            <Text style={styles.listName}>
                                {this.getTitle(item)}
                            </Text>
                            <Text style={styles.listDescription} numberOfLine={2}>
                                {this.getDescription(item)}
                            </Text>
                            <Text style={styles.listRecurrence}>
                                ({this.getFrequency(item)})
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
                                    {this.getCategory(item)}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.listContentView}>
                            <Text style={styles.listName}>
                                {this.getTitle(item)}
                            </Text>
                            <Text style={styles.listDescription} numberOfLine={2}>
                                {this.getDescription(item)}
                            </Text>
                            <Text style={styles.listRecurrence}>
                                ({this.getFrequency(item)})
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
                                    {this.getCategory(item)}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.listContentView}>
                            <Text style={styles.listNameKO}>
                                {this.getTitle(item)}
                            </Text>
                            <Text style={styles.listDescriptionKO} numberOfLine={2}>
                                {this.getDescription(item)}
                            </Text>
                            <Text style={styles.listRecurrenceKO}>
                                ({this.getFrequency(item)})
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
        checklists : state.checklists,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ChecklistListItem);