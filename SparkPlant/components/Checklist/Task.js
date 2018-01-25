import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ElevatedView from 'react-native-elevated-view';
import { ActionCreators } from '../../actions';
import * as layout from "../../assets/layout";
import TaskHeader from "./TaskHeader";


let styles = StyleSheet.create({
    task : {
        width : layout.width90,
        height : layout.height55,
        backgroundColor : "#ffffff",
        marginVertical: layout.height2,
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
        width : layout.width25,
        height : layout.height6,
        marginHorizontal : layout.width2,
        marginVertical : layout.height2,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#388E3C',

    },
    buttonPaliatif : {
        width : layout.width25,
        height : layout.height6,
        marginHorizontal : layout.width2,
        marginVertical : layout.height2,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#E64A19',
    },
    buttonNok : {
        width : layout.width25,
        height : layout.height6,
        marginHorizontal : layout.width2,
        marginVertical : layout.height2,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#D32F2F',
    },
    buttonNeutral : {
        width : layout.width25,
        height : layout.height6,
        marginHorizontal : layout.width2,
        marginVertical : layout.height2,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#888888',
    },
    buttonText : {
        fontSize : layout.fontSize2p5,
        color : '#ffffff',
        textAlign : 'center',
    },
    buttonSubmit : {
        width : layout.width50,
        height : layout.height5,
        marginHorizontal : layout.width2,
        marginVertical : layout.height2,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#3f51b5',
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
    }
});

class Task extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            task : this.props.task,
            index : this.props.index,
            instanceTask : {
                status : null,
                value : null,
                checklistInstance : null,
                task : null,
            },
        };
    }

    updateValue(value)
    {
        let instanceTask = this.state.instanceTask;
        instanceTask.value = value;

        this.setState({instanceTask : instanceTask});
    }

    updateStatus(status)
    {
        let instanceTask = this.state.instanceTask;
        instanceTask.status = status;

        this.setState({instanceTask : instanceTask});
    }

    displayButton(name, style)
    {
        console.log(this.state.instanceTask);
        if(this.state.instanceTask.status === name)
        {
            return(
                <TouchableWithoutFeedback onPress={() => { this.updateStatus(name) }}>
                    <ElevatedView style={style} elevation={3}>
                        <Text style={styles.buttonText}>
                            { name.toUpperCase() }
                        </Text>
                    </ElevatedView>
                </TouchableWithoutFeedback>
            );
        }
        else
        {
            return(
                <TouchableWithoutFeedback onPress={() => { this.updateStatus(name) }}>
                    <ElevatedView style={styles.buttonNeutral} elevation={3}>
                        <Text style={styles.buttonText}>
                            { name.toUpperCase() }
                        </Text>
                    </ElevatedView>
                </TouchableWithoutFeedback>
            );
        }
    }

    displayPaliatif()
    {
        if(this.state.instanceTask.status === "paliatif")
        {
            return(
                <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'center'}}>
                    <TouchableWithoutFeedback onPress={() => { this.updateStatus("nok") }}>
                        <ElevatedView style={styles.buttonNok} elevation={3}>
                            <Text style={styles.buttonText}>
                                NOK
                            </Text>
                        </ElevatedView>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => { this.updateStatus("ok") }}>
                        <ElevatedView style={styles.buttonOk} elevation={3}>
                            <Text style={styles.buttonText}>
                                OK
                            </Text>
                        </ElevatedView>
                    </TouchableWithoutFeedback>
                </View>
            );
        }
    }

    displayRanges()
    {
        let ranges = this.state.task.ranges;
        let list = [];

        for(var i = 0; i < ranges.length; i++)
        {
            list.push(
                <View key={i} style={{flexDirection : 'row', width : layout.width70, height : layout.height5, alignItems : 'center', justifyContent : 'center'}}>
                    <Text style={styles.tableText}>
                        { ranges[i].minValue }
                    </Text>
                    <Text style={styles.tableText}>
                        { ranges[i].maxValue }
                    </Text>
                </View>
            );
        }

        return list;
    }

    render() {
        if(this.state.task.type === "oknok")
        {
            if(this.state.instanceTask.status === null)
            {
                return (
                    <ElevatedView style={styles.task} elevation={4}>
                        <TaskHeader index={this.state.index} task={this.state.task} status={this.state.instanceTask.status}/>
                        <View style={styles.taskBody}>
                            <View style={{flexDirection : 'row'}}>
                                <View style={styles.taskDescription}>
                                    <Text style={styles.taskDescriptionText}>
                                        { this.state.task.description }
                                    </Text>
                                </View>
                                <TouchableWithoutFeedback onPress={() => {
                                    Linking.canOpenURL("").then(supported => {
                                        if (supported) {
                                            Linking.openURL("");} else {}
                                    });
                                }}>
                                    <View style={styles.taskFile}>
                                        <Icon name="file-text-o" style={styles.taskFileIcon} />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View>
                                <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'center'}}>
                                    <TouchableWithoutFeedback onPress={() => { this.updateStatus("nok") }}>
                                        <ElevatedView style={styles.buttonNok} elevation={3}>
                                            <Text style={styles.buttonText}>
                                                NOK
                                            </Text>
                                        </ElevatedView>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => { this.updateStatus("paliatif")  }}>
                                        <ElevatedView style={styles.buttonPaliatif} elevation={3}>
                                            <Text style={styles.buttonText}>
                                                PALIATIF
                                            </Text>
                                        </ElevatedView>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => { this.updateStatus("ok") }}>
                                        <ElevatedView style={styles.buttonOk} elevation={3}>
                                            <Text style={styles.buttonText}>
                                                OK
                                            </Text>
                                        </ElevatedView>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'center'}}>
                                    <TouchableWithoutFeedback>
                                        <ElevatedView style={styles.buttonSubmit} elevation={3}>
                                            <Text style={styles.buttonText}>OK</Text>
                                        </ElevatedView>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                    </ElevatedView>
                );
            }
            else
            {
                return (
                    <ElevatedView style={styles.task} elevation={4}>
                        <TaskHeader index={this.state.index} task={this.state.task} status={this.state.instanceTask.status}/>
                        <View style={styles.taskBody}>
                            <View style={{flexDirection : 'row'}}>
                                <View style={styles.taskDescription}>
                                    <Text style={styles.taskDescriptionText}>
                                        { this.state.task.description }
                                    </Text>
                                </View>
                                <TouchableWithoutFeedback onPress={() => {
                                    Linking.canOpenURL("").then(supported => {
                                        if (supported) {
                                            Linking.openURL("");} else {}
                                    });
                                }}>
                                    <View style={styles.taskFile}>
                                        <Icon name="file-text-o" style={styles.taskFileIcon} />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View>
                                <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'center'}}>
                                    { this.displayButton("nok", styles.buttonNok) }
                                    { this.displayButton("paliatif", styles.buttonPaliatif) }
                                    { this.displayButton("ok", styles.buttonOk) }
                                </View>
                                { this.displayPaliatif() }
                                <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'center'}}>
                                    <TouchableWithoutFeedback>
                                        <ElevatedView style={styles.buttonSubmit} elevation={3}>
                                            <Text style={styles.buttonText}>OK</Text>
                                        </ElevatedView>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                    </ElevatedView>
                );
            }
        }
        else
        {
            return(
                <ElevatedView style={styles.task} elevation={4}>
                    <TaskHeader index={this.state.index} task={this.state.task} status={this.state.instanceTask.status}/>
                    <View style={styles.taskBody}>
                        <View style={{flexDirection : 'row'}}>
                            <View style={styles.taskDescription}>
                                <Text style={styles.taskDescriptionText}>
                                    { this.state.task.description }
                                </Text>
                            </View>
                            <TouchableWithoutFeedback onPress={() => {
                                Linking.canOpenURL("").then(supported => {
                                    if (supported) {
                                        Linking.openURL("");} else {}
                                });
                            }}>
                                <View style={styles.taskFile}>
                                    <Icon name="file-text-o" style={styles.taskFileIcon} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'center'}}>
                            <TextInput placeholder="Valeur" value={this.state.value} onTextChange={(value) => { this.updateValue(value) }} style={styles.mesureInput} />
                            <TouchableWithoutFeedback>
                                <ElevatedView style={styles.buttonMesure} elevation={3}>
                                    <Text style={styles.buttonText}>OK</Text>
                                </ElevatedView>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={{alignItems : 'center', justifyContent : 'center'}}>
                            <ElevatedView elevation={2} style={styles.mesureTable}>
                                <ScrollView style={{width : layout.width70, height : layout.height15}} showsVerticalScrollIndicator={false}>
                                    <View style={{flexDirection : 'row', width : layout.width70, height : layout.height5, alignItems : 'center', justifyContent : 'center'}}>
                                        <Text style={styles.tableHeaderText}>
                                            Min
                                        </Text>
                                        <Text style={styles.tableHeaderText}>
                                            Max
                                        </Text>
                                    </View>
                                    { this.displayRanges() }
                                </ScrollView>
                            </ElevatedView>
                        </View>
                    </View>
                </ElevatedView>
            );
        }

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


export default connect(mapStateToProps, mapDispatchToProps)(Task);