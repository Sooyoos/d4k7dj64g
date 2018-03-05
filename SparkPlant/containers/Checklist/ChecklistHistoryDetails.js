import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ElevatedView from 'react-native-elevated-view';
import { ActionCreators } from '../../actions';
import * as layout from "../../assets/layout";
import HeaderChecklist from "../../components/Header/HeaderChecklist";
import FooterButton from "../../components/Footer/FooterButton";

let styles = StyleSheet.create({
    login: {
        height:layout.height7,
    },
    body: {
        height:layout.height80,
        backgroundColor : "#efefef",
        alignItems:'center',
        justifyContent: 'center',
    },
    checklistInfos : {
        width : layout.fullWidth,
        height : layout.height15,
        backgroundColor : "#ffffff",
        alignItems : 'center',
        justifyContent: 'center',
    },
    checklistTitle : {
        fontSize : layout.fontSize1p8,
        color : "#000000",
        textAlign: 'center',
    },
    checklistPlace : {
        fontSize : layout.fontSize1p4,
        color : "#000000",
        textAlign: 'center',
        fontStyle : 'italic',
    },
    checklistDescription : {
        fontSize : layout.fontSize1p6,
        color : "#000000",
        textAlign: 'center',
    },
    list : {
        width : layout.fullWidth,
        height : layout.height65,
        backgroundColor : "#efefef",
        alignItems : 'center',
        justifyContent : 'center',
    },
    task : {
        width : layout.width90,
        height : layout.height50,
        backgroundColor : "#ffffff",
        marginVertical: layout.height1,
    },
    taskHeader : {
        flexDirection : 'row',
        backgroundColor : "#ffffff",
        width : layout.width90,
        height : layout.height15,
    },
    taskIndex : {
        height : layout.height7,
        width : layout.height7,
        borderRadius : layout.height3p5,
        backgroundColor : "#888888",
        alignItems : 'center',
        justifyContent : 'center',
    },
    taskIndexText : {
        fontSize : layout.fontSize4,
        color : "#ffffff",
        textAlign : "center",
        fontWeight: 'bold',
    },
    taskInfos : {
        height : layout.height15,
        width : layout.width90 - layout.height12,
        justifyContent : 'center',
    },
    taskTitle : {
        width : layout.width90 - layout.height12,
        fontSize : layout.fontSize2,
        color : "#000000",
        textAlign : 'center',
    },
    taskDescription : {
        width : layout.width90 - layout.height12,
        fontSize : layout.fontSize1p4,
        color : "#000000",
    },
    taskResults : {
        width : layout.width90,
        height : layout.height35,
    },
    value : {
        fontSize : layout.fontSize3,
        color : "#000000",
        marginVertical: layout.height2,
        textAlign : 'center',
    },
    taskRanges : {
        width : layout.width80,
        marginHorizontal: layout.width5,
    },
    taskRange : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
    },
    taskRangeText : {
        fontSize : layout.fontSize1p8,
        color : "#000000",
        marginHorizontal: layout.width5,
    },
    buttonOk : {
        width : layout.width25,
        height : layout.height8,
        marginHorizontal : layout.width2,
        marginVertical : layout.height2,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#388E3C',

    },
    buttonPaliatif : {
        width : layout.width25,
        height : layout.height8,
        marginHorizontal : layout.width2,
        marginVertical : layout.height2,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#FF5722',
    },
    buttonPaliatifFixed : {
        width : layout.width25,
        height : layout.height8,
        marginHorizontal : layout.width2,
        marginVertical : layout.height2,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#FFA000',
    },
    buttonNa : {
        width : layout.width25,
        height : layout.height8,
        marginHorizontal : layout.width2,
        marginVertical : layout.height2,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#607D8B',
    },
    buttonNok : {
        width : layout.width25,
        height : layout.height8,
        marginHorizontal : layout.width2,
        marginVertical : layout.height2,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#D32F2F',
    },
    buttonNeutral : {
        width : layout.width25,
        height : layout.height8,
        marginHorizontal : layout.width2,
        marginVertical : layout.height2,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#888888',
    },
    buttonValue : {
        fontSize : layout.fontSize2p5,
        fontWeight: 'bold',
        color : "#ffffff",
        textAlign: "center",
    },
    footer: {
        height:layout.height13,
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
        paddingBottom : layout.height3,
    },
});

class ChecklistHistory extends Component {

    static navigationOptions = {
        drawerLabel: 'CHECKLISTS',
        drawerIcon: ({tintColor}) => (
            <Icon name='check-square-o' style={{fontSize : 24, color : '#757575'}}/>
        ),
    };

    constructor(props)
    {
        super(props);
        this.state = {
            history : this.props.checklists.currentHistory,
        };
    }

    buildRangesList(ranges)
    {
        let list = [];
        for(var i = 0; i < ranges.length; i++)
        {
            list.push(
                <View key={i} style={styles.taskRange}>
                    <Text style={styles.taskRangeText}>
                        Min : { ranges[i].minValue}
                    </Text>
                    <Text style={styles.taskRangeText}>
                        Max : { ranges[i].maxValue }
                    </Text>
                </View>
            );
        }

        return list;
    }

    displayTaskValue(task)
    {
        if(task.task.type === "mesure")
        {
            return(
                <View>
                    <Text style={styles.value}>
                        { task.value }
                    </Text>
                    <View style={styles.taskRanges}>
                        { this.buildRangesList(task.task.ranges) }
                    </View>
                </View>
            )
        }
        else
        {
            if(task.status === "ok")
            {
                return(
                    <View style={{width : layout.width90, alignItems : 'center', justifyContent : 'center'}}>
                        <View style={{flexDirection : 'row', width : layout.width90, alignItems : 'center', justifyContent : 'center'}}>
                            <View style={styles.buttonOk}>
                                <Text style={styles.buttonValue}>
                                    OK
                                </Text>
                            </View>
                            <View style={styles.buttonNeutral}>
                                <Text style={styles.buttonValue}>
                                    NA
                                </Text>
                            </View>
                        </View>
                        <View style={{flexDirection : 'row', width : layout.width90, alignItems : 'center', justifyContent : 'center'}}>
                            <View style={styles.buttonNeutral}>
                                <Text style={styles.buttonValue}>
                                    NOK Réparé
                                </Text>
                            </View>
                            <View style={styles.buttonNeutral}>
                                <Text style={styles.buttonValue}>
                                    NOK Palliatif
                                </Text>
                            </View>
                            <View style={styles.buttonNeutral}>
                                <Text style={styles.buttonValue}>
                                    NOK
                                </Text>
                            </View>
                        </View>
                    </View>
                );
            }
            else if(task.status === "na")
            {
                return(
                    <View style={{ width : layout.width90, alignItems : 'center', justifyContent : 'center'}}>
                        <View style={{flexDirection : 'row', width : layout.width90, alignItems : 'center', justifyContent : 'center'}}>
                            <View style={styles.buttonNeutral}>
                                <Text style={styles.buttonValue}>
                                    OK
                                </Text>
                            </View>
                            <View style={styles.buttonNa}>
                                <Text style={styles.buttonValue}>
                                    NA
                                </Text>
                            </View>
                        </View>
                        <View style={{flexDirection : 'row', width : layout.width90, alignItems : 'center', justifyContent : 'center'}}>
                            <View style={styles.buttonNeutral}>
                                <Text style={styles.buttonValue}>
                                    NOK Réparé
                                </Text>
                            </View>
                            <View style={styles.buttonNeutral}>
                                <Text style={styles.buttonValue}>
                                    NOK Palliatif
                                </Text>
                            </View>
                            <View style={styles.buttonNeutral}>
                                <Text style={styles.buttonValue}>
                                    NOK
                                </Text>
                            </View>
                        </View>
                    </View>
                );
            }
            else if(task.status === "nok réparé")
            {
                return(
                    <View style={{width : layout.width90, alignItems : 'center', justifyContent : 'center'}}>
                        <View style={{flexDirection : 'row', width : layout.width90, alignItems : 'center', justifyContent : 'center'}}>
                            <View style={styles.buttonNeutral}>
                                <Text style={styles.buttonValue}>
                                    OK
                                </Text>
                            </View>
                            <View style={styles.buttonNeutral}>
                                <Text style={styles.buttonValue}>
                                    NA
                                </Text>
                            </View>
                        </View>
                        <View style={{flexDirection : 'row', width : layout.width90, alignItems : 'center', justifyContent : 'center'}}>
                            <View style={styles.buttonPaliatifFixed}>
                                <Text style={styles.buttonValue}>
                                    NOK Réparé
                                </Text>
                            </View>
                            <View style={styles.buttonNeutral}>
                                <Text style={styles.buttonValue}>
                                    NOK Palliatif
                                </Text>
                            </View>
                            <View style={styles.buttonNeutral}>
                                <Text style={styles.buttonValue}>
                                    NOK
                                </Text>
                            </View>
                        </View>
                    </View>
                );
            }
            else if(task.status === "nok palliatif")
            {
                return(
                    <View style={{width : layout.width90, alignItems : 'center', justifyContent : 'center'}}>
                        <View style={{flexDirection : 'row', width : layout.width90, alignItems : 'center', justifyContent : 'center'}}>
                            <View style={styles.buttonNeutral}>
                                <Text style={styles.buttonValue}>
                                    OK
                                </Text>
                            </View>
                            <View style={styles.buttonNeutral}>
                                <Text style={styles.buttonValue}>
                                    NA
                                </Text>
                            </View>
                        </View>
                        <View style={{flexDirection : 'row', width : layout.width90, alignItems : 'center', justifyContent : 'center'}}>
                            <View style={styles.buttonNeutral}>
                                <Text style={styles.buttonValue}>
                                    NOK Réparé
                                </Text>
                            </View>
                            <View style={styles.buttonPaliatif}>
                                <Text style={styles.buttonValue}>
                                    NOK Palliatif
                                </Text>
                            </View>
                            <View style={styles.buttonNeutral}>
                                <Text style={styles.buttonValue}>
                                    NOK
                                </Text>
                            </View>
                        </View>
                    </View>
                );
            }
            else if(task.status === "nok palliatif")
            {
                return(
                    <View style={{width : layout.width90, alignItems : 'center', justifyContent : 'center'}}>
                        <View style={{flexDirection : 'row', width : layout.width90, alignItems : 'center', justifyContent : 'center'}}>
                            <View style={styles.buttonNeutral}>
                                <Text style={styles.buttonValue}>
                                    OK
                                </Text>
                            </View>
                            <View style={styles.buttonNeutral}>
                                <Text style={styles.buttonValue}>
                                    NA
                                </Text>
                            </View>
                        </View>
                        <View style={{flexDirection : 'row', width : layout.width90, alignItems : 'center', justifyContent : 'center'}}>
                            <View style={styles.buttonNeutral}>
                                <Text style={styles.buttonValue}>
                                    NOK Réparé
                                </Text>
                            </View>
                            <View style={styles.buttonNeutral}>
                                <Text style={styles.buttonValue}>
                                    NOK Palliatif
                                </Text>
                            </View>
                            <View style={styles.buttonNok}>
                                <Text style={styles.buttonValue}>
                                    NOK
                                </Text>
                            </View>
                        </View>
                    </View>
                );
            }
        }
    }

    buildTaskList()
    {
        let tasks = this.state.history.checklistInstanceTasks;
        let list = [];

        if(tasks)
        {
            for(var i = 0; i < tasks.length; i++)
            {
                list.push(
                    <ElevatedView style={styles.task} elevation={4} key={i}>
                        <ElevatedView style={styles.taskHeader} elevation={4}>
                            <View style={{alignItems : 'center', justifyContent : 'center', height : layout.height15, width : layout.height12,}}>
                                <View style={styles.taskIndex}>
                                    <Text style={styles.taskIndexText}>
                                        { i + 1 }
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.taskInfos}>
                                <Text style={styles.taskTitle} numberOfLines={2}>
                                    { tasks[i].task.title }
                                </Text>
                                <Text style={styles.taskDescription} numberOfLines={2}>
                                    { tasks[i].task.description }
                                </Text>
                            </View>
                        </ElevatedView>
                        <View style={styles.taskResults}>
                            { this.displayTaskValue(tasks[i]) }
                        </View>
                    </ElevatedView>
                )
            }
        }

        return list;
    }

    render() {
        console.log(this.state.history);
        return (
            <View style={styles.login}>
                <HeaderChecklist {...this.props} headerTitle="Checklists"/>
                <View style={styles.body}>
                    <ElevatedView style={styles.checklistInfos} elevation={4}>
                        <Text style={styles.checklistTitle}>
                            { this.state.history.checklist.name }
                        </Text>
                        <Text style={styles.checklistPlace}>
                            { this.state.history.checklist.place.name }
                        </Text>
                        <Text style={styles.checklistDescription}>
                            { this.state.history.checklist.description }
                        </Text>
                    </ElevatedView>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View  style={styles.list}>
                            {this.buildTaskList()}
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.footer}>
                    <FooterButton {...this.props} active={true} iconName="check-square-o" text="Mes listes" route={() => { this.props.goToChecklistPage(this.props.nav) }}/>
                    <FooterButton {...this.props} active={false} iconName="folder-o" text="Modèles" route={() => { this.props.goToChecklistLibrary(this.props.nav) }}/>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        login: state.login,
        nav : state.nav,
        checklists : state.checklists,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ChecklistHistory);