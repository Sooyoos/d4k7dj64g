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
        height : layout.height55,
        backgroundColor : "#ffffff",
        marginVertical: layout.height2,
    },
    addListView : {
        width : layout.fullWidth,
        height : layout.height7,
        backgroundColor: "#ffffff",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    listInfosText : {
        fontSize : layout.fontSize1p8,
        color : "#212121",
        textAlign: 'center',
    },
    listTask : {
        width : layout.width84,
        height : layout.height14,
        marginHorizontal: layout.width3,
        marginVertical: layout.height1p5,
        backgroundColor : "#ffffff",
        flexDirection: "row",
    },
    taskIndex : {
        width : layout.height14,
        height : layout.height14,
        padding : layout.height3,
        justifyContent : "center",
    },
    taskIndexButton : {
        width : layout.height8,
        height : layout.height8,
        borderRadius : layout.height4,
        backgroundColor : "#bdbdbd",
        justifyContent : "center",
        alignItems : "center",
    },
    taskIndexText : {
        color : "#ffffff",
        fontSize: layout.fontSize4,
        textAlign: "center",
        fontWeight: "bold",
    },
    taskContent : {
        width : layout.width84 - layout.height14,
        height : layout.height14,
        paddingHorizontal: layout.width0p5,
        paddingVertical: layout.height2,
        justifyContent : "center",
    },
    taskContentText : {
        color : "#212121",
        fontSize : layout.fontSize2,
    },
    taskContentRanges : {
        color : "#212121",
        fontSize : layout.fontSize1p6,
    },
    unitPicker : {
        width : layout.width50,
        height : layout.height5,
        marginRight: layout.width3
    },
    unitButton : {
        height : layout.height5,
        width : layout.height5,
        borderRadius: layout.height2p5,
        backgroundColor : "#00bcd4",
        justifyContent : "center",
        alignItems : "center",
    },
    unitButtonIcon : {
        color : "#ffffff",
        fontSize : layout.fontSize2,
        textAlign : "center",
    }
});

class ChecklistDetails extends Component {

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
            unit : null,
        }
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
        let user = this.props.users.loggedUser;
        let ids = [];
        let roles = user.rolesByUnit;
        let list = [];

        list.push(
            <Picker.Item key={-1} label="Affecter à l'unité" value={null} />
        );

        for(var i = 0; i < roles.length; i++)
        {
            if(!ids.includes(roles[i].unit["@id"]))
            {
                list.push(
                    <Picker.Item key={i} label={roles[i].unit.name} value={roles[i].unit["@id"]} />
                );
            }
        }

        return list;
    }

    checklistIsAlreadyAssigned(checklist)
    {
        let checklists = this.props.checklists.checklists;

        for(var i = 0; i < checklists.length; i++)
        {
            if(checklist["@id"] === checklists[i]["@id"])
            {
                return true;
            }
        }

        return false;
    }

    assignChecklist()
    {
        let checklist = this.props.checklists.currentTemplate;
        let unit = this.state.unit;
        let checklistInstance = {
            checklist : checklist["@id"],
            unit : unit,
        };

        if(!this.checklistIsAlreadyAssigned(checklist))
        {
            this.props.tryAssignChecklists(this.props.login, checklistInstance);
            this.props.goToChecklistLibrary(this.props.nav);
        }

        Alert.alert(
            'Checkliste déjà utilisée',
            'Votre unité réalise déjà cette checkliste',
            [
                {text: 'OK', onPress: () => this.props.goToChecklistLibrary(this.props.nav)},
            ],
            { cancelable: false }
        )
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
                        <Picker style={styles.unitPicker} onValueChange={(value, index) => this.setState({unit : value})}>
                            {this.buildUnitList()}
                        </Picker>
                        <TouchableWithoutFeedback onPress={this.assignChecklist.bind(this)}>
                            <ElevatedView elevation={4} style={styles.unitButton}>
                                <Icon style={styles.unitButtonIcon} name="arrow-right"/>
                            </ElevatedView>
                        </TouchableWithoutFeedback>
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
        users : state.users,
        checklists : state.checklists,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ChecklistDetails);