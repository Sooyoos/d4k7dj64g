import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Linking,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ElevatedView from 'react-native-elevated-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Moment from "moment";
import { ActionCreators } from '../../actions';
import * as layout from "../../assets/layout";
import HeaderChecklist from "../../components/Header/HeaderChecklist";
import Task from "../../components/Checklist/Task";

let styles = StyleSheet.create({
    login: {
        height:layout.height7,
    },
    body: {
        height:layout.height93,
        backgroundColor : "#efefef",
        alignItems:'center',
    },
    checklistHeader : {
        width : layout.fullWidth,
        height : layout.height15,
        backgroundColor: "#ffffff",
        flexDirection: 'row',
    },
    checklistInfos : {
        width : layout.width80,
        height : layout.height15,
        alignItems : 'center',
        justifyContent : 'center',
    },
    checklistTitle : {
        fontSize: layout.fontSize2,
        color : "#000000",
        textAlign: 'center',
    },
    actions : {
        width : layout.width20,
        height : layout.height15,
        alignItems : 'center',
        justifyContent : 'center',
    },
    action : {
        height : layout.width10,
        width : layout.width10,
        alignItems : 'center',
        justifyContent : 'center',
        marginVertical: layout.height1,
    },
    actionIcon : {
        color : '#3f51b5',
        fontSize : layout.fontSize4,
        textAlign: 'center',
    },
    list : {
        backgroundColor : "#efefef",
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: layout.height5,
    },
    task : {
        width : layout.width90,
        height : layout.height55,
        backgroundColor : "#ffffff",
        marginVertical: layout.height2,
    },
    taskHeader : {
        width : layout.width90,
        height : layout.height10,
        backgroundColor : "#ffffff",
        flexDirection: 'row',
    },
    taskIndex : {
        height : layout.height8,
        width : layout.height8,
        borderRadius : layout.height4,
        backgroundColor : "#888888",
    },
    taskIndexText : {
        color : "#ffffff",
        textAlign : 'center',
        fontSize : layout.fontSize4p75,
        fontWeight: 'bold',
    },
    taskInfos : {
        alignItems : 'center',
        justifyContent: 'center',
        height : layout.height10,
        width : layout.width90 - layout.height10,
        flexDirection : 'row',
    },
    taskTitle : {
        height : layout.height10,
        width : layout.width90 - layout.height20,
        alignItems : 'center',
        justifyContent : 'center',
    },
    taskTitleText : {
        fontSize : layout.fontSize1p8,
        color : "#000000",
        textAlign : 'center',
    },
    taskStatus : {
        height : layout.height10,
        width : layout.height10,
        alignItems : 'center',
        justifyContent : 'center',
    },
    taskStatusIconSuccess : {
        height : layout.height8,
        width : layout.height8,
        borderRadius : layout.height4,
        backgroundColor : '#388E3C',
    },
    taskStatusIconFailure : {
        height : layout.height8,
        width : layout.height8,
        borderRadius : layout.height4,
        backgroundColor : '#D32F2F',
    },
    taskStatusIconNeutral : {
        height : layout.height8,
        width : layout.height8,
        borderRadius : layout.height4,
        backgroundColor : '#ababab',
    },
    taskBody : {
        height : layout.height10,
        width : layout.width90,
    },
    taskDescription : {
        height : layout.height10,
        width : layout.width90 - layout.height10,
        paddingVertical: layout.height1,
        paddingHorizontal: layout.width2,
        alignItems : 'center',
        justifyContent : 'center',
    },
    taskDescriptionText : {
        fontSize : layout.fontSize1p6,
        color : "#000000",
        textAlign : 'center',
    },
    taskFile : {
        height : layout.height10,
        width : layout.height10,
        alignItems : 'center',
        justifyContent : 'center',
    },
    taskFileIcon : {
        fontSize : layout.fontSize3,
        color : "#000000",
        textAlign : 'center',
    },
    buttonOk : {
        width : layout.width20,
        height : layout.height6,
        marginHorizontal : layout.width2,
        marginVertical : layout.height2,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#388E3C',

    },
    buttonPaliatif : {
        width : layout.width20,
        height : layout.height6,
        marginHorizontal : layout.width2,
        marginVertical : layout.height2,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#E64A19',
    },
    buttonNok : {
        width : layout.width20,
        height : layout.height6,
        marginHorizontal : layout.width2,
        marginVertical : layout.height2,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#D32F2F',
    },
    buttonText : {
        fontSize : layout.fontSize2p5,
        color : '#ffffff',
        textAlign : 'center',
    },
    mesureInput : {
        width : layout.width40,
        height : layout.height5,
        marginHorizontal : layout.width2,
        marginVertical : layout.height2,
        alignItems : 'center',
        justifyContent : 'center',
        fontSize : layout.fontSize1p8,
    },
    buttonMesure : {
        width : layout.width20,
        height : layout.height5,
        marginHorizontal : layout.width2,
        marginVertical : layout.height2,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#3f51b5',
    },
    mesureTable : {
        width : layout.width70,
        height : layout.height20,
        marginTop : layout.height5,
        backgroundColor : "#ffffff",
    },
    tableHeaderText : {
        fontSize : layout.fontSize1p4,
        color : "#000000",
        textAlign : 'center',
        fontWeight: 'bold',
        width : layout.width35,
    },
    tableText : {
        fontSize : layout.fontSize1p6,
        color : "#000000",
        textAlign : 'center',
        width : layout.width35,
    },
    submit : {
        width : layout.fullWidth,
        height:layout.height10,
        backgroundColor : '#3f51b5',
        alignItems:'center',
        paddingTop: layout.height1,
    },
    submitButton : {
        height : layout.height5,
        width : layout.width70,
        backgroundColor : '#ffffff',
        alignItems : 'center',
        justifyContent : 'center',
    },
    submitButtonText : {
        color : "#3f51b5",
        textAlign : 'center',
        fontSize : layout.fontSize2p4,
    }
});

class ChecklistExecute extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            checklist : this.props.checklists.currentInstance,
        };
    }

    checkCompletedTasks(tasks)
    {
        let flag = true;

        for(var i =0; i < tasks.length; i++)
        {
            if(tasks[i].status === 'todo')
            {
                flag = false;
            }
        }

        return flag;
    }

    displayTasks()
    {
        let tasks = this.state.checklist.checklistInstanceTasks;
        let list = [];

        for(var i = 0; i < tasks.length; i++)
        {
            list.push(
                <Task key={i} index={i + 1} task={tasks[i]} />
            );
        }

        return list;
    }

    save()
    {
        this.props.tryUpdateChecklistInstance(this.props.login, this.props.nav,
            {
                "@id" : this.props.checklists.currentInstance["@id"],
                saved : "true",
            }
        );
    }

    render() {
        return(
            <View style={styles.login}>
                <HeaderChecklist {...this.props} headerTitle="Checklists" />
                <View style={styles.body}>
                    <ElevatedView style={styles.checklistHeader} elevation={4}>
                        <View style={styles.checklistInfos}>
                            <Text style={styles.checklistTitle}>
                                { this.state.checklist.checklist.name }
                            </Text>
                        </View>
                        <View style={styles.actions}>
                            <TouchableOpacity onPress={() => { this.props.tryDeleteChecklistInstance(this.props.login, this.props.nav, this.state.checklist); }}>
                                <View style={styles.action}>
                                    <Icon name="ban" style={styles.actionIcon}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ElevatedView>
                    <ScrollView showsVerticalScrollIndicator={false} style={{width : layout.width90, height : layout.height93 - layout.height15}}>
                        <View style={styles.list}>
                            { this.displayTasks() }
                        </View>
                    </ScrollView>
                    <ElevatedView style={styles.submit} elevation={2}>
                        { this.checkCompletedTasks(this.state.checklist.checklistInstanceTasks) ?
                            <TouchableOpacity onPress={ () => { this.save(); }}>
                                <ElevatedView style={styles.submitButton} elevation={2}>
                                    <Text style={styles.submitButtonText}>
                                        ENREGISTRER
                                    </Text>
                                </ElevatedView>
                            </TouchableOpacity> : null
                        }

                    </ElevatedView>
                </View>
            </View>
        );
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


export default connect(mapStateToProps, mapDispatchToProps)(ChecklistExecute);