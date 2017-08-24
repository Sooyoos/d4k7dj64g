import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    ScrollView,
    Text,
    Picker,
    TouchableWithoutFeedback,
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
        height : responsiveHeight(70),
        backgroundColor : "#ffffff",
        marginVertical: responsiveHeight(2),
    },
    addListView : {
        width : responsiveWidth(100),
        height : responsiveHeight(7),
        backgroundColor: "#ffffff",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    listInfosText : {
        fontSize : responsiveFontSize(1.8),
        color : "#212121",
        textAlign: 'center',
    },
    listTask : {
        width : responsiveWidth(84),
        height : responsiveHeight(14),
        marginHorizontal: responsiveWidth(3),
        marginVertical: responsiveHeight(1.5),
        backgroundColor : "#ffffff",
        flexDirection: "row",
    },
    taskIndex : {
        width : responsiveHeight(14),
        height : responsiveHeight(14),
        padding : responsiveHeight(3),
        justifyContent : "center",
    },
    taskIndexButton : {
        width : responsiveHeight(8),
        height : responsiveHeight(8),
        borderRadius : responsiveHeight(4),
        backgroundColor : "#bdbdbd",
        justifyContent : "center",
    },
    taskIndexText : {
        color : "#ffffff",
        fontSize: responsiveFontSize(4),
        textAlign: "center",
        fontWeight: "bold",
    },
    taskContent : {
        width : responsiveWidth(84) - responsiveHeight(14),
        height : responsiveHeight(14),
        paddingHorizontal: responsiveWidth(0.5),
        paddingVertical: responsiveHeight(2),
        justifyContent : "center",
    },
    taskContentText : {
        color : "#212121",
        fontSize : responsiveFontSize(2),
    },
    taskContentRanges : {
        color : "#212121",
        fontSize : responsiveFontSize(1.6),
    },
    unitPicker : {
        width : responsiveWidth(50),
        height : responsiveHeight(5),
        marginRight: responsiveWidth(3)
    },
    unitButton : {
        height : responsiveHeight(5),
        width : responsiveHeight(5),
        borderRadius: responsiveHeight(2.5),
        backgroundColor : "#00bcd4",
        justifyContent : "center",
    },
    unitButtonIcon : {
        color : "#ffffff",
        fontSize : responsiveFontSize(2),
        textAlign : "center",
    }
});

class ChecklistDetails extends Component {

    constructor(props)
    {
        super(props);
    }

    componentWillMount()
    {

    }

    buildTaskList(tasks)
    {
        let list = [];

        for(var i = 0; i < tasks.length; i++)
        {
            if(tasks[i].type !== "mesure")
            {
                list.push(
                    <ElevatedView key={i} elevation={4} style={styles.listTask}>
                        <View style={styles.taskIndex}>
                            <View style={styles.taskIndexButton}>
                                <Text style={styles.taskIndexText}>
                                    {i + 1}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.taskContent}>
                            <Text style={styles.taskContentText} numberOfLine={2}>
                                {tasks[i].title}
                            </Text>
                        </View>
                    </ElevatedView>
                );
            }
            else
            {
                list.push(
                    <ElevatedView key={i} elevation={4} style={styles.listTask}>
                        <View style={styles.taskIndex}>
                            <View style={styles.taskIndexButton}>
                                <Text style={styles.taskIndexText}>
                                    {i + 1}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.taskContent}>
                            <Text style={styles.taskContentText} numberOfLine={2}>
                                {tasks[i].title}
                            </Text>
                            <Text style={styles.taskContentRanges} numberOfLine={1}>
                                Min : {tasks[i].ranges[0].minValue} Max : {tasks[i].ranges[0].maxValue}
                            </Text>
                        </View>
                    </ElevatedView>
                );
            }

        }
        return list;
    }

    buildUnitList()
    {
        let full = this.props.utils.units;
        let list = [];

        for(var i = 0; i < full.length; i++)
        {
            list.push(
                <Picker.Item key={i} label={full[i].name} value={full[i]["@id"]} />
            );
        }
        return list;
    }

    assignChecklist()
    {

    }

    render() {
        let item = this.props.checklists.currentTemplate;

        return (
            <View style={styles.login}>
                <HeaderChecklist {...this.props} headerTitle="Checklists"/>
                <View style={styles.body}>
                    <ElevatedView style={styles.listInfos} elevation={2}>
                        <Text style={styles.listInfosText}>
                            {item.name}
                        </Text>
                        <Text style={styles.listInfosText}>
                            ({item.frequency})
                        </Text>
                    </ElevatedView>
                    <ElevatedView elevation={2} style={styles.listTasks}>
                        <ScrollView>
                            {this.buildTaskList(item.tasks)}
                        </ScrollView>
                    </ElevatedView>
                    <ElevatedView style={styles.addListView} elevation={2}>
                        <Picker style={styles.unitPicker} onValueChange={(value, index) => console.log(value)}>
                            {this.buildUnitList()}
                        </Picker>
                        <ElevatedView elevation={4} style={styles.unitButton}>
                            <TouchableWithoutFeedback>
                                <Icon style={styles.unitButtonIcon} name="arrow-right"/>
                            </TouchableWithoutFeedback>
                        </ElevatedView>
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
        utils : state.utils,
        checklists : state.checklists,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ChecklistDetails);