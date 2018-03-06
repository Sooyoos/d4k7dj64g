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
import ChecklistHistoryList from "../../components/Checklist/ChecklistHistoryList";
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
            checklist : this.props.checklists.currentChecklist,
        };
    }

    componentWillMount()
    {
        this.props.tryChecklistHistory(this.props.login, this.state.checklist);
    }

    render() {
        return (
            <View style={styles.login}>
                <HeaderChecklist {...this.props} headerTitle="Checklists"/>
                <View style={styles.body}>
                    <ElevatedView style={styles.checklistInfos} elevation={4}>
                        <Text style={styles.checklistTitle}>
                            { this.state.checklist.name }
                        </Text>
                        <Text style={styles.checklistPlace}>
                            { this.state.checklist.place.name }
                        </Text>
                        <Text style={styles.checklistDescription}>
                            { this.state.checklist.description }
                        </Text>
                    </ElevatedView>
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
                        <ChecklistHistoryList />
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