import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import * as layout from "../../assets/layout";
import ElevatedView from 'react-native-elevated-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';

let styles = StyleSheet.create({
    item : {
        height : layout.height12,
        width : layout.width90,
        backgroundColor : "#ffffff",
        paddingVertical: layout.height1,
        paddingHorizontal: layout.width2,
        marginVertical : layout.height1,
    },
    itemActive : {
        height : layout.height12,
        width : layout.width90,
        backgroundColor : "#ffffff",
        marginVertical : layout.height1,
    },
    buttonsOverlay : {
        height : layout.height12,
        width : layout.width90,
        backgroundColor : "rgba(0,0,0,0.8)",
        paddingVertical: layout.height1,
        paddingHorizontal: layout.width2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    executeButton : {
        height : layout.height8,
        width : layout.height8,
        borderRadius : layout.height4,
        backgroundColor : "#388E3C",
        marginHorizontal: layout.width5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    historyButton : {
        height : layout.height8,
        width : layout.height8,
        borderRadius : layout.height4,
        backgroundColor : "#0288D1",
        marginHorizontal: layout.width5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteButton : {
        height : layout.height8,
        width : layout.height8,
        borderRadius : layout.height4,
        backgroundColor : "#D32F2F",
        marginHorizontal: layout.width5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonIcon : {
        fontSize : layout.fontSize5,
        color : "#ffffff",
    },
    checklistName : {
        fontSize : layout.fontSize1p8,
        color : "#000000",
    },
    checklistPlace : {
        fontSize: layout.fontSize1p6,
        color : "#000000",
    },
    checklistFrequency : {
        fontSize : layout.fontSize1p6,
        fontStyle : 'italic',
        color : "#000000",
    },
    checklistNameBold : {
        fontSize : layout.fontSize1p8,
        color : "#000000",
        fontWeight: 'bold',
    },
    checklistPlaceBold : {
        fontSize: layout.fontSize1p6,
        color : "#000000",
        fontWeight: 'bold',
    },
    checklistFrequencyBold : {
        fontSize : layout.fontSize1p6,
        fontStyle : 'italic',
        color : "#000000",
        fontWeight: 'bold',
    }
});

class UserChecklistListItem extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            checklist : this.props.item.checklist,
        };
    }

    componentWillMount()
    {
        if(this.props.checklists.loading === false && this.props.checklists.currentInstance !== null)
        {
            this.props.goToChecklistExecute(this.props.nav);
        }
    }

    execute()
    {
        if(this.props.checklists.loading === false && this.props.checklists.currentInstance !== null)
        {
            this.props.goToChecklistExecute(this.props.nav);
        }
        else if(this.props.checklists.loading === false && this.props.checklists.currentInstance === null)
        {
            this.props.tryCreateChecklistInstance(this.props.login, this.state.checklist, this.props.login.userToken, this.props.nav);
        }
    }

    render() {
        if(this.props.active)
        {
            return(
                <ElevatedView style={styles.itemActive} elevation={4}>
                    <TouchableWithoutFeedback onPress={() => { this.props.deactivateItem()}}>
                        <View style={styles.buttonsOverlay}>
                            <TouchableOpacity onPress={() => { this.execute() }}>
                                <View style={styles.executeButton}>
                                    <Icon style={styles.buttonIcon} name="play-circle-o"/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.props.setCurrentChecklist(this.state.checklist); this.props.navigateChecklistHistory() }}>
                                <View style={styles.historyButton}>
                                    <Icon style={styles.buttonIcon} name="history"/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.props.tryDeleteUserChecklist(this.props.login, this.props.item); }}>
                                <View style={styles.deleteButton}>
                                    <Icon style={styles.buttonIcon} name="trash-o"/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </ElevatedView>
            );
        }
        else
        {
            if(this.props.toDo === true)
            {
                return(
                    <ElevatedView style={styles.item} elevation={4}>
                        <TouchableWithoutFeedback onPress={() => { this.props.activateItem(this.props.index)}}>
                            <View>
                                <Text style={styles.checklistNameBold}>
                                    { this.state.checklist.name }
                                </Text>
                                <Text style={styles.checklistPlaceBold}>
                                    { this.state.checklist.place.name }
                                </Text>
                                <Text style={styles.checklistFrequencyBold}>
                                    { this.state.checklist.frequency.charAt(0).toUpperCase() +  this.state.checklist.frequency.substring(1)}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </ElevatedView>
                );
            }
            else
            {
                return(
                    <ElevatedView style={styles.item} elevation={4}>
                        <TouchableWithoutFeedback onPress={() => { this.props.activateItem(this.props.index)}}>
                            <View>
                                <Text style={styles.checklistName}>
                                    { this.state.checklist.name }
                                </Text>
                                <Text style={styles.checklistPlace}>
                                    { this.state.checklist.place.name }
                                </Text>
                                <Text style={styles.checklistFrequency}>
                                    { this.state.checklist.frequency.charAt(0).toUpperCase() +  this.state.checklist.frequency.substring(1)}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </ElevatedView>
                );
            }

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


export default connect(mapStateToProps, mapDispatchToProps)(UserChecklistListItem);