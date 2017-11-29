import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
    TextInput,
    Linking,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ElevatedView from 'react-native-elevated-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { ActionCreators } from '../../actions';
import * as layout from "../../assets/layout";
import HeaderChecklist from "../../components/Header/HeaderChecklist";

let styles = StyleSheet.create({
    login: {
        height:layout.height7,
    },
    body: {
        height:layout.height93,
        backgroundColor : "#efefef",
        alignItems:'center',
    },
    listInfos : {
        width : layout.fullWidth,
        height : layout.height10,
        backgroundColor: "#ffffff",
        justifyContent: 'center',
    },
    listTasks : {
        width : layout.width90,
        height : layout.height75,
        backgroundColor : "#ffffff",
        marginVertical: layout.height2,
        paddingBottom: layout.height5,
    },
    listInfosText : {
        fontSize : layout.fontSize1p8,
        color : "#212121",
        textAlign: 'center',
    },
    task : {
        width : layout.width84,
        height : layout.height35,
        marginHorizontal: layout.width3,
        marginVertical: layout.height2,
        backgroundColor : "#ffffff",
    },
    taskSmall : {
        width : layout.width84,
        height : layout.height15,
        marginHorizontal: layout.width3,
        marginVertical: layout.height2,
        backgroundColor : "#ffffff",
    },
    taskIndex : {
        height : layout.height12,
        width : layout.height12,
        padding : layout.height2,
    },
    taskIndexButton : {
        height : layout.height8,
        width : layout.height8,
        borderRadius : layout.height4,
        backgroundColor: "#bdbdbd",
        justifyContent: "center",
        alignItems:"center",
    },
    taskIndexText : {
        textAlign: "center",
        color: "#ffffff",
        fontSize: layout.fontSize4,
        fontWeight: "bold",
    },
    taskInfo : {
        width : layout.width84 - layout.height12 - layout.height8,
        height : layout.height12,
        justifyContent: "center",
    },
    taskName : {
        color : "#212121",
        fontSize : layout.fontSize1p8,
        marginBottom: layout.height1,
    },
    taskDescription : {
        color : "#212121",
        fontSize : layout.fontSize1p6,
    },
    taskMesures : {
        width : layout.width84,
        height : layout.height10,
        padding : layout.height1,
        flexDirection: "row",
        justifyContent : "center",
    },
    taskInput : {
        width : layout.width50,
        height : layout.height8,
        fontSize : layout.fontSize1p8,
        color : "#212121",
    },
    taskMetric : {
        marginTop : layout.height4,
        fontSize : layout.fontSize1p8,
        color : "#757575",
        fontWeight : "bold",
    },
    taskActions : {
        width : layout.width84,
        height : layout.height13,
        flexDirection: "row",
        justifyContent: "center",
    },
    taskOkButton : {
        width : layout.width20,
        height : layout.height6,
        backgroundColor : "#4caf50",
        marginHorizontal: layout.width2,
        marginVertical : layout.height3p5,
        justifyContent : "center",
    },
    taskMehButton : {
        width : layout.width20,
        height : layout.height6,
        backgroundColor : "#ff5722",
        marginHorizontal: layout.width2,
        marginVertical : layout.height3p5,
        justifyContent : "center",
    },
    taskNOkButton : {
        width : layout.width20,
        height : layout.height6,
        backgroundColor : "#f44336",
        marginHorizontal: layout.width2,
        marginVertical : layout.height3p5,
        justifyContent : "center",
    },
    taskSaveButton : {
        width : layout.width30,
        height : layout.height6,
        backgroundColor : "#00bcd4",
        marginHorizontal: layout.width2,
        marginVertical : layout.height3p5,
        justifyContent : "center",
    },
    taskButtonText : {
        color : "#ffffff",
        fontSize : layout.fontSize1p8,
        textAlign : "center",
        fontWeight: "bold",
    },
    taskFlags : {
        width : layout.width12,
        height : layout.height10,
        padding : layout.height2,
        justifyContent : "center",
        alignItems: "center",
    },
    taskFlagOk : {
        width : layout.height4,
        height : layout.height4,
        borderRadius: layout.height2,
        backgroundColor : "#4caf50",
    },
    taskFlagNOk : {
        width : layout.height4,
        height : layout.height4,
        borderRadius: layout.height2,
        backgroundColor : "#f44336",
    },
    taskFile : {
        height : layout.height8,
        width : layout.height8,
        padding : layout.height2,
    },
    taskFileIcon : {
        textAlign : "center",
        fontSize : layout.fontSize3,
        color : "#232323",
    }
});

class ChecklistExecute extends Component {

    static navigationOptions = {
        drawerLabel: 'CHECKLISTS',
        drawerIcon: ({tintColor}) => (
            <Icon name='check-square-o' style={{fontSize : 24, color : '#757575'}}/>
        ),
    };

    constructor(props)
    {
        super(props);

        let tasks = this.props.checklists.currentChecklist.checklistInstanceTasks;
        this.state = {
            tasks : tasks,
            currentTask : 0,
            mesure : null,
        };
        for(var i = 0; i < tasks.length; i++)
        {
            if(tasks[i].status === "todo")
            {
                this.state = {
                    tasks : tasks,
                    currentTask : i,
                    mesure : null,
                };
                break;
            }
        }
    }

    componentWillMount()
    {

    }

    resetTasks()
    {
        let list = this.state.tasks;

        for(var i = 0; i < list.length; i++)
        {
            this.props.tryResetTask(this.props.login, list[i]);
        }
    }

    getStatus(status)
    {
        if(status === "todo")
            return "done";
        else
            return "todo";
    }

    executeTaskOk()
    {
        let task = Object.assign({}, this.state.tasks[this.state.currentTask], {value : "OK", status : "done"});
        let array = this.state.tasks;
        array[this.state.currentTask] = task;

        this.props.tryCompleteTask(this.props.login, this.state.tasks[this.state.currentTask]);

        this.setState(
            {
                tasks : array,
                currentTask: this.state.currentTask + 1,
            }
        );

        if(this.state.currentTask === this.state.tasks.length - 1)
        {
            this.props.tryCompleteList(this.props.login, this.props.checklists.currentChecklist, this.getStatus(this.props.checklists.currentChecklist.status));
            this.resetTasks();
            this.props.goToChecklistPage(this.props.nav);
        }
    }

    executeTaskNok()
    {
        let subtask = Object.assign({}, this.state.tasks[this.state.currentTask].task, {type : "paliatif"});
        let task = Object.assign({}, this.state.tasks[this.state.currentTask], {task : subtask});
        let array = this.state.tasks;
        array[this.state.currentTask] = task;
        this.setState(
            {
                tasks : array,
            }
        );
    }

    executeTaskStillNok()
    {
        let task = Object.assign({}, this.state.tasks[this.state.currentTask], {value : "NOK", status : "done"});
        let array = this.state.tasks;
        array[this.state.currentTask] = task;

        this.props.tryCompleteTask(this.props.login, this.state.tasks[this.state.currentTask]);

        this.setState(
            {
                tasks : array,
                currentTask: this.state.currentTask + 1,
            }
        );

        if(this.state.currentTask === this.state.tasks.length - 1)
        {
            this.props.tryCompleteList(this.props.login, this.props.checklists.currentChecklist, this.getStatus(this.props.checklists.currentChecklist.status));
            this.resetTasks();
            this.props.goToChecklistPage(this.props.nav);
        }
    }

    executeTaskMesure()
    {
        let task = Object.assign({}, this.state.tasks[this.state.currentTask], {value : this.state.mesure, status : "done"});
        let array = this.state.tasks;
        array[this.state.currentTask] = task;

        this.props.tryCompleteTask(this.props.login, this.state.tasks[this.state.currentTask]);

        this.setState(
            {
                tasks : array,
                currentTask: this.state.currentTask + 1,
                mesure : null,
            }
        );

        if(this.state.currentTask === this.state.tasks.length - 1)
        {
            this.props.tryCompleteList(this.props.login, this.props.checklists.currentChecklist, this.getStatus(this.props.checklists.currentChecklist.status));
            this.resetTasks();
            this.props.goToChecklistPage(this.props.nav);
        }
    }

    executeTaskCorrige()
    {
        let task = Object.assign({}, this.state.tasks[this.state.currentTask], {value : "CORRIGE", status : "done"});
        let array = this.state.tasks;
        array[this.state.currentTask] = task;

        this.props.tryCompleteTask(this.props.login, this.state.tasks[this.state.currentTask]);

        this.setState(
            {
                tasks : array,
                currentTask: this.state.currentTask + 1,
            }
        );

        if(this.state.currentTask === this.state.tasks.length - 1)
        {
            this.props.tryCompleteList(this.props.login, this.props.checklists.currentChecklist, this.getStatus(this.props.checklists.currentChecklist.status));
            this.resetTasks();
            this.props.goToChecklistPage(this.props.nav);
        }
    }

    executeTaskPaliatif()
    {
        let task = Object.assign({}, this.state.tasks[this.state.currentTask], {value : "PALIATIF", status : "done"});
        let array = this.state.tasks;
        array[this.state.currentTask] = task;

        this.props.tryCompleteTask(this.props.login, this.state.tasks[this.state.currentTask]);

        this.setState(
            {
                tasks : array,
                currentTask: this.state.currentTask + 1,
            }
        );

        if(this.state.currentTask === this.state.tasks.length - 1)
        {
            this.props.tryCompleteList(this.props.login, this.props.checklists.currentChecklist, this.getStatus(this.props.checklists.currentChecklist.status));
            this.resetTasks();
            this.props.goToChecklistPage(this.props.nav);
        }
    }

    renderTaskFlag(value, ranges)
    {
        if(parseInt(value) > ranges[0].minValue && parseInt(value) < ranges[0].maxValue)
        {
            return(
                <View style={styles.taskFlagOk}>
                </View>
            );
        }
        else
        {
            return(
                <View style={styles.taskFlagNOk}>
                </View>
            );
        }
    }

    displayFileLink(task)
    {
        if(task.file)
        {
            return (
                <TouchableWithoutFeedback onPress={() => {
                    Linking.canOpenURL(task.file.path).then(supported => {
                        if (supported) {
                            Linking.openURL(task.file.path);
                        } else {
                            console.log("Unable to open URL");
                        }
                    });
                }}>
                    <View style={styles.taskFile}>
                        <Icon name="file-text-o" style={styles.taskFileIcon} />
                    </View>
                </TouchableWithoutFeedback>
            );
        }

        return null;
    }

    buildTasksList()
    {
        let tasks = this.props.checklists.currentChecklist.checklistInstanceTasks;
        let list = [];

        for(var i = 0; i < tasks.length; i++)
        {
            if(tasks[i].task.type === "oknok")
            {
                if(i !== this.state.currentTask)
                {
                    list.push(
                        <ElevatedView key={i} elevation={8} style={styles.taskSmall}>
                            <View style={{flexDirection:"row"}}>
                                <View style={styles.taskIndex}>
                                    <View style={styles.taskIndexButton}>
                                        <Text style={styles.taskIndexText}>
                                            { i + 1}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.taskInfo}>
                                    <Text style={styles.taskName}>
                                        {tasks[i].task.title}
                                    </Text>
                                </View>
                                { this.displayFileLink(tasks[i].task) }
                            </View>
                        </ElevatedView>
                    );
                }
                else
                {
                    list.push(
                        <ElevatedView key={i} elevation={8} style={styles.task}>
                            <View style={{flexDirection:"row"}}>
                                <View style={styles.taskIndex}>
                                    <View style={styles.taskIndexButton}>
                                        <Text style={styles.taskIndexText}>
                                            { i + 1}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.taskInfo}>
                                    <Text style={styles.taskName}>
                                        {tasks[i].task.title}
                                    </Text>
                                    <Text style={styles.taskDescription}>
                                        {tasks[i].task.description}
                                    </Text>
                                </View>
                                { this.displayFileLink(tasks[i].task) }
                            </View>
                            <View style={styles.taskActions}>
                                <TouchableWithoutFeedback onPress={this.executeTaskOk.bind(this)}>
                                    <ElevatedView elevation={10} style={styles.taskOkButton}>
                                        <Text style={styles.taskButtonText}>
                                            OK
                                        </Text>
                                    </ElevatedView>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={this.executeTaskNok.bind(this)}>
                                    <ElevatedView elevation={10} style={styles.taskNOkButton}>
                                        <Text style={styles.taskButtonText}>
                                            NOK
                                        </Text>
                                    </ElevatedView>
                                </TouchableWithoutFeedback>
                            </View>
                        </ElevatedView>
                    );
                }
            }
            else if(tasks[i].task.type === "paliatif")
            {
                if(i !== this.state.currentTask)
                {
                    list.push(
                        <ElevatedView key={i} elevation={8} style={styles.taskSmall}>
                            <View style={{flexDirection:"row"}}>
                                <View style={styles.taskIndex}>
                                    <View style={styles.taskIndexButton}>
                                        <Text style={styles.taskIndexText}>
                                            { i + 1}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.taskInfo}>
                                    <Text style={styles.taskName}>
                                        {tasks[i].task.title}
                                    </Text>
                                </View>
                                { this.displayFileLink(tasks[i].task) }
                            </View>
                        </ElevatedView>
                    );
                }
                else
                {
                    list.push(
                        <ElevatedView key={i} elevation={8} style={styles.task}>
                            <View style={{flexDirection:"row"}}>
                                <View style={styles.taskIndex}>
                                    <View style={styles.taskIndexButton}>
                                        <Text style={styles.taskIndexText}>
                                            { i + 1}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.taskInfo}>
                                    <Text style={styles.taskName}>
                                        {tasks[i].task.title}
                                    </Text>
                                    <Text style={styles.taskDescription}>
                                        {tasks[i].task.description}
                                    </Text>
                                </View>
                                { this.displayFileLink(tasks[i].task) }
                            </View>
                            <View style={styles.taskActions}>
                                <TouchableWithoutFeedback onPress={this.executeTaskCorrige.bind(this)}>
                                    <ElevatedView elevation={10} style={styles.taskOkButton}>
                                        <Text style={styles.taskButtonText}>
                                            Corrigé
                                        </Text>
                                    </ElevatedView>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={this.executeTaskPaliatif.bind(this)}>
                                    <ElevatedView elevation={10} style={styles.taskMehButton}>
                                        <Text style={styles.taskButtonText}>
                                            Paliatif
                                        </Text>
                                    </ElevatedView>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={this.executeTaskStillNok.bind(this)}>
                                    <ElevatedView elevation={10} style={styles.taskNOkButton}>
                                        <Text style={styles.taskButtonText}>
                                            NOK
                                        </Text>
                                    </ElevatedView>
                                </TouchableWithoutFeedback>
                            </View>
                        </ElevatedView>
                    );
                }
            }
            else if(tasks[i].task.type === "mesure")
            {
                if(i !== this.state.currentTask)
                {
                    list.push(
                        <ElevatedView key={i} elevation={8} style={styles.taskSmall}>
                            <View style={{flexDirection:"row"}}>
                                <View style={styles.taskIndex}>
                                    <View style={styles.taskIndexButton}>
                                        <Text style={styles.taskIndexText}>
                                            {i + 1}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.taskInfo}>
                                    <Text style={styles.taskName}>
                                        {tasks[i].task.title}
                                    </Text>
                                </View>
                                { this.displayFileLink(tasks[i].task) }
                            </View>
                        </ElevatedView>
                    );
                }
                else
                {
                    list.push(
                        <ElevatedView key={i} elevation={8} style={styles.task}>
                            <View style={{flexDirection:"row"}}>
                                <View style={styles.taskIndex}>
                                    <View style={styles.taskIndexButton}>
                                        <Text style={styles.taskIndexText}>
                                            {i + 1}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.taskInfo}>
                                    <Text style={styles.taskName}>
                                        {tasks[i].task.title}
                                    </Text>
                                    <Text style={styles.taskDescription}>
                                        {tasks[i].task.description}
                                    </Text>
                                </View>
                                { this.displayFileLink(tasks[i].task) }
                            </View>
                            <View style={styles.taskMesures}>
                                <View style={styles.taskFlags}>
                                    {this.renderTaskFlag(this.state.mesure, tasks[i].task.ranges)}
                                </View>
                                <TextInput style={styles.taskInput} placeholder={"OK : " + tasks[i].task.ranges[0].minValue + " - " + tasks[i].task.ranges[0].maxValue} onChangeText={(value) => {this.setState({mesure : value})}}/>
                                <Text style={styles.taskMetric}>{tasks[i].task.ranges[0].unit}</Text>
                            </View>
                            <View style={styles.taskActions}>
                                <TouchableWithoutFeedback onPress={this.executeTaskMesure.bind(this)}>
                                    <ElevatedView elevation={10} style={styles.taskSaveButton}>
                                        <Text style={styles.taskButtonText}>
                                            Enregistrer
                                        </Text>
                                    </ElevatedView>
                                </TouchableWithoutFeedback>
                            </View>
                        </ElevatedView>
                    );
                }
            }
        }

        return list;
    }

    render() {
        console.log(this.state);
        let item = this.props.checklists.currentChecklist;
        return (
            <View style={styles.login}>
                <HeaderChecklist {...this.props} headerTitle="Checklist en cours"/>
                <View style={styles.body}>
                    <ElevatedView style={styles.listInfos} elevation={2}>
                        <Text style={styles.listInfosText}>
                            {item.checklist.name}
                        </Text>
                    </ElevatedView>
                    <ElevatedView elevation={2} style={styles.listTasks}>
                        <ScrollView contentContainerStyle={{paddingBottom : layout.height5}}>
                            {this.buildTasksList()}
                            <KeyboardSpacer />
                        </ScrollView>
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