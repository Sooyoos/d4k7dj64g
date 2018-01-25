import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ElevatedView from 'react-native-elevated-view';
import { ActionCreators } from '../../actions';
import * as layout from "../../assets/layout";

let styles = StyleSheet.create({
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
});

class TaskHeader extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            task : this.props.task,
            status : this.props.status,
            index : this.props.index,
        };
    }

    displayStatusIcon(status)
    {
        if(status === null)
        {
            return(
                <View style={styles.taskStatusIconNeutral}>
                </View>
            );
        }
        else if(status === 'ok')
        {
            return(
                <View style={styles.taskStatusIconSuccess}>
                </View>
            );
        }
        else
        {
            return(
                <View style={styles.taskStatusIconFailure}>
                </View>
            );
        }
    }

    render() {
        return (
            <ElevatedView style={styles.taskHeader} elevation={4}>
                <View style={{alignItems : 'center', justifyContent: 'center', height : layout.height10, width : layout.height10}}>
                    <View style={styles.taskIndex}>
                        <Text style={styles.taskIndexText}>
                            { this.state.index }
                        </Text>
                    </View>
                </View>
                <View style={styles.taskInfos}>
                    <View style={styles.taskTitle}>
                        <Text style={styles.taskTitleText}>
                            { this.state.task.title }
                        </Text>
                    </View>
                    <View style={styles.taskStatus}>
                        { this.displayStatusIcon(this.state.status) }
                    </View>
                </View>
            </ElevatedView>
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


export default connect(mapStateToProps, mapDispatchToProps)(TaskHeader);