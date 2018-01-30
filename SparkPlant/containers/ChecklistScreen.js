import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActionCreators } from '../actions';
import * as layout from "../assets/layout";
import HeaderChecklist from "../components/Header/HeaderChecklist";
import FooterButton from "../components/Footer/FooterButton";
import UserChecklistList from '../components/Checklist/UserChecklistList';

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
    footer: {
        height:layout.height13,
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
        paddingBottom : layout.height3,
    },
});

class ChecklistScreen extends Component {

    static navigationOptions = {
        drawerLabel: 'CHECKLISTS',
        drawerIcon: ({tintColor}) => (
            <Icon name='check-square-o' style={{fontSize : 24, color : '#757575'}}/>
        ),
    };

    constructor(props)
    {
        super(props);
    }

    componentWillMount()
    {
        this.props.tryUnits(this.props.login);
        this.props.tryFullChecklistHistory(this.props.login);
        this.props.tryUserChecklists(this.props.login);
        this.props.tryChecklistsTemplates(this.props.login);
    }

    render() {
        return (
            <View style={styles.login}>
                <HeaderChecklist {...this.props} headerTitle="Checklists"/>
                <View style={styles.body}>
                    <UserChecklistList itemRoute={this.props.goToChecklistExecute} items={this.props.checklists.checklists}/>
                </View>
                <View style={styles.footer}>
                    <FooterButton {...this.props} active={true} iconName="check-square-o" text="Mes modèles" route={() => { this.props.goToChecklistPage(this.props.nav) }}/>
                    <FooterButton {...this.props} active={false} iconName="folder-o" text="Tous les modèles" route={() => { this.props.goToChecklistLibrary(this.props.nav) }}/>
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


export default connect(mapStateToProps, mapDispatchToProps)(ChecklistScreen);