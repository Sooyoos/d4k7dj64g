import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    Platform,
    Picker,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalPicker from 'react-native-modal-picker';
import ElevatedView from 'react-native-elevated-view';
import { ActionCreators } from '../../actions';
import * as layout from "../../assets/layout";
import HeaderChecklist from "../../components/Header/HeaderChecklist";
import FooterButton from "../../components/Footer/FooterButton";
import ChecklistList from '../../components/Checklist/ChecklistList';

let styles = StyleSheet.create({
    login: {
        height:layout.height7,
    },
    body: {
        height:layout.height80,
        backgroundColor : "#efefef",
        alignItems:'center',
        justifyContent: 'center',
        paddingTop: layout.height2,
    },
    placePicker : {
        width: layout.width90,
        height : layout.height8,
        alignItems : 'center',
        justifyContent : 'center',
    },
    footer: {
        height:layout.height13,
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
        paddingBottom : layout.height3,
    },
});

class ChecklistLibrary extends Component {

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
            filter : null,
        }
    }

    componentWillMount()
    {
        this.props.tryPlaces(this.props.login);
        this.props.tryChecklistsTemplates(this.props.login);
    }

    buildUsersListAndroid()
    {
        let places = this.props.utils.places;
        let list = [];

        list.push(
            <Picker.Item key={-1} label={"Tous les lieux"} value="all" />
        );

        if(places)
        {
            for(var i = 0; i < places.length; i++)
            {
                list.push(
                    <Picker.Item key={i} label={places[i].name} value={places[i]} />
                );
            }
        }

        return <Picker style={styles.placePicker} selectedValue={this.state.filter} onValueChange={(value, index) => { this.props.filterChecklist(value); this.setState({filter : value}) }}>
            {list}
        </Picker>;
    }

    buildUsersListIos()
    {
        let places = this.props.utils.places;
        let list = [];

        if(places)
        {
            for(var i = 0; i < places.length; i++)
            {
                list.push(
                    {
                        key : i,
                        label : places[i].name,
                        value : places[i],
                    }
                );
            }
        }

        return <ModalPicker
            data={list}
            initValue="Lieu"
            style={styles.placePicker}
            selectStyle={{ height : layout.height5, width : layout.width90, alignItems : 'center', justifyContent : 'center'}}
            onChange={(option) => { this.props.filterChecklist(option) }} />;
    }

    render() {
        return (
            <View style={styles.login}>
                <HeaderChecklist {...this.props} headerTitle="Checklists"/>
                <View style={styles.body}>
                    <ElevatedView style={{backgroundColor : "#ffffff", paddingHorizontal: layout.width2, marginVertical: layout.height2}} elevation={4}>
                        { Platform.OS === 'ios' ? this.buildUsersListIos() : this.buildUsersListAndroid() }
                    </ElevatedView>
                    { this.props.checklists.filteredTemplates !== null ? <ChecklistList itemRoute={this.props.goToChecklistDetails} items={this.props.checklists.filteredTemplates} /> : <ChecklistList itemRoute={this.props.goToChecklistDetails} items={this.props.checklists.templates} /> }
                </View>
                <View style={styles.footer}>
                    <FooterButton {...this.props} active={false} iconName="square-o" text="Mes modèles" route={() => { this.props.goToChecklistPage(this.props.nav) }}/>
                    <FooterButton {...this.props} active={true} iconName="folder-open-o" text="Tous les modèles" route={() => { this.props.goToChecklistLibrary(this.props.nav) }}/>
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
        utils : state.utils,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ChecklistLibrary);