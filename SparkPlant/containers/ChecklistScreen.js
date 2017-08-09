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
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import HeaderChecklist from "../components/Header/HeaderChecklist";
import FooterButton from "../components/Footer/FooterButton";
import ChecklistList from '../components/Checklist/ChecklistList';

let styles = StyleSheet.create({
    login: {
        height:responsiveHeight(7),
    },
    body: {
        height:responsiveHeight(83),
        backgroundColor : "#efefef",
        alignItems:'center',
        justifyContent: 'center',
    },
    footer: {
        height:responsiveHeight(10),
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
        paddingBottom : responsiveHeight(3),
    },
});

let items = [
    {
        type : "M",
        status: "OK",
        checklist: {
            name: "Nettoyage des presses",
            description: "Nettoyage des presses de l'atelier 1",
            recurrence : "hebdomadaire",
        },
    },
    {
        type : "S",
        status: "KO",
        checklist: {
            name: "Mesure de la pression interne",
            description: "Pompe atelier 8",
            recurrence : "hebdomadaire",
        },
    },
    {
        type : "M",
        status: "KO",
        checklist: {
            name: "Tour de vérification",
            description: "Vérifier l'intégrité des clotûres exterieures",
            recurrence : "quotidien",
        },
    },
    {
        type : "S",
        status: "OK",
        checklist: {
            name: "Vérifier la température",
            description: "Vérifier la température du réacteur 3",
            recurrence : "quotidien",
        },
    }
];

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

    }

    render() {
        return (
            <View style={styles.login}>
                <HeaderChecklist {...this.props} headerTitle="Checklists"/>
                <View style={styles.body}>
                    <ChecklistList itemRoute={this.props.goToBeginChecklist} items={items} />
                </View>
                <View style={styles.footer}>
                    <FooterButton {...this.props} active={true} iconName="check-square-o" text="Mes listes" route={this.props.goToChecklistPage}/>
                    <FooterButton {...this.props} active={false} iconName="folder-open" text="Modèles" route={this.props.goToChecklistLibrary}/>
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


export default connect(mapStateToProps, mapDispatchToProps)(ChecklistScreen);