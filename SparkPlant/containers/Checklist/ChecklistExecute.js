import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
    TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ElevatedView from 'react-native-elevated-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActionCreators } from '../../actions';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import HeaderChecklist from "../../components/Header/HeaderChecklist";

let styles = StyleSheet.create({
    login: {
        height:responsiveHeight(7),
    },
    body: {
        height:responsiveHeight(93),
        backgroundColor : "#efefef",
        alignItems:'center',
    },
    listInfos : {
        width : responsiveWidth(100),
        height : responsiveHeight(10),
        backgroundColor: "#ffffff",
        justifyContent: 'center',
    },
    listTasks : {
        width : responsiveWidth(90),
        height : responsiveHeight(75),
        backgroundColor : "#ffffff",
        marginVertical: responsiveHeight(2),
    },
    listInfosText : {
        fontSize : responsiveFontSize(1.8),
        color : "#212121",
        textAlign: 'center',
    },
    task : {
        width : responsiveWidth(84),
        height : responsiveHeight(35),
        marginHorizontal: responsiveWidth(3),
        marginVertical: responsiveHeight(2),
        backgroundColor : "#ffffff",
    },
    taskSmall : {
        width : responsiveWidth(84),
        height : responsiveHeight(15),
        marginHorizontal: responsiveWidth(3),
        marginVertical: responsiveHeight(2),
        backgroundColor : "#ffffff",
    },
    taskIndex : {
        height : responsiveHeight(12),
        width : responsiveHeight(12),
        padding : responsiveHeight(2),
    },
    taskIndexButton : {
        height : responsiveHeight(8),
        width : responsiveHeight(8),
        borderRadius : responsiveHeight(4),
        backgroundColor: "#bdbdbd",
        justifyContent: "center",
    },
    taskIndexText : {
        textAlign: "center",
        color: "#ffffff",
        fontSize: responsiveFontSize(4),
        fontWeight: "bold",
    },
    taskInfo : {
        width : responsiveWidth(84) - responsiveHeight(12),
        height : responsiveHeight(12),
        justifyContent: "center",
    },
    taskName : {
        color : "#212121",
        fontSize : responsiveFontSize(1.8),
    },
    taskMesures : {
        width : responsiveWidth(84),
        height : responsiveHeight(10),
        padding : responsiveHeight(1),
        flexDirection: "row",
        justifyContent : "center",
    },
    taskInput : {
        width : responsiveWidth(60),
        height : responsiveHeight(8),
        fontSize : responsiveFontSize(1.8),
        color : "#212121",
    },
    taskMetric : {
        marginTop : responsiveHeight(4),
        fontSize : responsiveFontSize(1.8),
        color : "#757575",
        fontWeight : "bold",
    },
    taskActions : {
        width : responsiveWidth(84),
        height : responsiveHeight(13),
        flexDirection: "row",
        justifyContent: "center",
    },
    taskOkButton : {
        width : responsiveWidth(20),
        height : responsiveHeight(6),
        backgroundColor : "#4caf50",
        marginHorizontal: responsiveWidth(2),
        marginVertical : responsiveHeight(3.5),
        justifyContent : "center",
    },
    taskMehButton : {
        width : responsiveWidth(20),
        height : responsiveHeight(6),
        backgroundColor : "#ff5722",
        marginHorizontal: responsiveWidth(2),
        marginVertical : responsiveHeight(3.5),
        justifyContent : "center",
    },
    taskNOkButton : {
        width : responsiveWidth(20),
        height : responsiveHeight(6),
        backgroundColor : "#f44336",
        marginHorizontal: responsiveWidth(2),
        marginVertical : responsiveHeight(3.5),
        justifyContent : "center",
    },
    taskSaveButton : {
        width : responsiveWidth(30),
        height : responsiveHeight(6),
        backgroundColor : "#00bcd4",
        marginHorizontal: responsiveWidth(2),
        marginVertical : responsiveHeight(3.5),
        justifyContent : "center",
    },
    taskButtonText : {
        color : "#ffffff",
        fontSize : responsiveFontSize(1.8),
        textAlign : "center",
        fontWeight: "bold",
    },
    taskFlags : {
        width : responsiveWidth(12),
        height : responsiveHeight(10),
        padding : responsiveHeight(2),
        justifyContent : "center",
        alignItems: "center",
    },
    taskFlagOk : {
        width : responsiveHeight(4),
        height : responsiveHeight(4),
        borderRadius: responsiveHeight(2),
        backgroundColor : "#4caf50",
    },
    taskFlagNOk : {
        width : responsiveHeight(2),
        height : responsiveHeight(2),
        borderRadius: responsiveHeight(1),
        backgroundColor : "#f44336",
    }
});

class ChecklistExecute extends Component {

    constructor(props)
    {
        super(props);

        let tasks = this.props.checklists.currentChecklist.checklistInstanceTasks;
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
            this.props.goToChecklistPage();
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
            this.props.goToChecklistPage();
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
            this.props.goToChecklistPage();
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
            this.props.goToChecklistPage();
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
            this.props.goToChecklistPage();
        }
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
                                </View>
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
                                </View>
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
                                </View>
                            </View>
                            <View style={styles.taskMesures}>
                                <View style={styles.taskFlags}>
                                    <View style={styles.taskFlagOk}>
                                    </View>
                                </View>
                                <TextInput style={styles.taskInput} placeholder="Mesure" onChangeText={(value) => {this.setState({mesure : value})}}/>
                                <Text style={styles.taskMetric}>{tasks[i].task.mesure}</Text>
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
                        <ScrollView>
                            {this.buildTasksList()}
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