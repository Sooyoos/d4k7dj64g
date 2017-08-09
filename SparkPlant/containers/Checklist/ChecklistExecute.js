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
        justifyContent: "center",
    },
    taskInput : {
        width : responsiveWidth(50),
        height : responsiveHeight(8),
        fontSize : responsiveFontSize(1.8),
        color : "#212121",
    },
    taskMetric : {
        marginTop : responsiveHeight(4),
        fontSize : responsiveFontSize(1.8),
        color : "#757575",
        fontWeight : "bold",
        justifyContent : "flex-end",
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
    }
});

class ChecklistExecute extends Component {

    constructor(props)
    {
        super(props);
    }

    componentWillMount()
    {

    }

    render() {
        return (
            <View style={styles.login}>
                <HeaderChecklist {...this.props} headerTitle="Checklist en cours"/>
                <View style={styles.body}>
                    <ElevatedView style={styles.listInfos} elevation={2}>
                        <Text style={styles.listInfosText}>
                            Titre de la Checklist
                        </Text>
                    </ElevatedView>
                    <ElevatedView elevation={2} style={styles.listTasks}>
                        <ScrollView>
                            <ElevatedView elevation={8} style={styles.task}>
                                <View style={{flexDirection:"row"}}>
                                    <View style={styles.taskIndex}>
                                        <View style={styles.taskIndexButton}>
                                            <Text style={styles.taskIndexText}>
                                                1
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.taskInfo}>
                                        <Text style={styles.taskName}>
                                            Nom de la tâche
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.taskActions}>
                                    <ElevatedView elevation={10} style={styles.taskOkButton}>
                                        <Text style={styles.taskButtonText}>
                                            OK
                                        </Text>
                                    </ElevatedView>
                                    <ElevatedView elevation={10} style={styles.taskNOkButton}>
                                        <Text style={styles.taskButtonText}>
                                            NOK
                                        </Text>
                                    </ElevatedView>
                                </View>
                            </ElevatedView>
                            <ElevatedView elevation={8} style={styles.task}>
                                <View style={{flexDirection:"row"}}>
                                    <View style={styles.taskIndex}>
                                        <View style={styles.taskIndexButton}>
                                            <Text style={styles.taskIndexText}>
                                                2
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.taskInfo}>
                                        <Text style={styles.taskName}>
                                            Nom de la tâche
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.taskActions}>
                                    <ElevatedView elevation={10} style={styles.taskOkButton}>
                                        <Text style={styles.taskButtonText}>
                                            Corrigé
                                        </Text>
                                    </ElevatedView>
                                    <ElevatedView elevation={10} style={styles.taskMehButton}>
                                        <Text style={styles.taskButtonText}>
                                            Paliatif
                                        </Text>
                                    </ElevatedView>
                                    <ElevatedView elevation={10} style={styles.taskNOkButton}>
                                        <Text style={styles.taskButtonText}>
                                            NOK
                                        </Text>
                                    </ElevatedView>
                                </View>
                            </ElevatedView>
                            <ElevatedView elevation={8} style={styles.task}>
                                <View style={{flexDirection:"row"}}>
                                    <View style={styles.taskIndex}>
                                        <View style={styles.taskIndexButton}>
                                            <Text style={styles.taskIndexText}>
                                                3
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.taskInfo}>
                                        <Text style={styles.taskName}>
                                            Nom de la tâche
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.taskMesures}>
                                    <TextInput style={styles.taskInput} placeholder="Mesure"/>
                                    <Text style={styles.taskMetric}>mm</Text>
                                </View>
                                <View style={styles.taskActions}>
                                    <ElevatedView elevation={10} style={styles.taskSaveButton}>
                                        <Text style={styles.taskButtonText}>
                                            Enregistrer
                                        </Text>
                                    </ElevatedView>
                                </View>
                            </ElevatedView>
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
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ChecklistExecute);