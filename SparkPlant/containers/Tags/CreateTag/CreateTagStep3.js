import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ElevatedView from 'react-native-elevated-view';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import HeaderTagDetails from "../../../components/Header/HeaderTags";

let styles = StyleSheet.create({
    managerCard : {
        width : responsiveWidth(90),
        height : responsiveHeight(20),
        margin: responsiveWidth(5),
        backgroundColor: '#ffffff',
    },
    cardHeader : {
        height : responsiveHeight(10),
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardHeaderIconView : {
        width: responsiveWidth(10),
        height : responsiveWidth(10),
        borderRadius : responsiveWidth(5),
        backgroundColor: '#00bcd4',
        margin : 10,
        padding : 3,
    },
    cardHeaderIcon : {
        flex : 2,
        fontSize : responsiveFontSize(4.5),
        textAlign : 'center',
        color : '#ffffff',
    },
    cardHeaderTitle : {
        flex : 9,
        fontSize : responsiveFontSize(2),
        fontWeight: 'bold',
        color : '#212121',
    },
    cardManagerContent : {
        padding : responsiveWidth(2),
        backgroundColor : '#ffffff',
        justifyContent : 'center',
    },
    cardManagerContentView : {
        backgroundColor : '#efefef',
        width : responsiveWidth(60),
        height : responsiveHeight(4),
        borderRadius: responsiveWidth(2),
        justifyContent: 'center',
        margin : responsiveHeight(1),
    },
    cardManagerContentText : {
        textAlign: 'center',
        color : '#232323',
        fontSize : responsiveFontSize(1.8),
    },
    peopleCard : {
        width : responsiveWidth(90),
        height : responsiveHeight(55),
        margin: responsiveWidth(5),
        backgroundColor: '#ffffff',
    },
    cardPeopleContent : {
        padding : responsiveWidth(2),
        backgroundColor : '#ffffff',
        justifyContent : 'center',
    },
    cardPeopleContentView : {
        backgroundColor : '#efefef',
        width : responsiveWidth(60),
        height : responsiveHeight(4),
        borderRadius: responsiveWidth(2),
        justifyContent: 'center',
        flexDirection: 'row',
        margin : responsiveHeight(1),
    },
    cardPeopleContentText : {
        textAlign: 'center',
        color : '#232323',
        fontSize : responsiveFontSize(1.8),
        width : responsiveWidth(50),
    },
    cardPeopleIcon : {
        textAlign: 'center',
        color : '#232323',
        fontSize : responsiveFontSize(2.2),
        width : responsiveWidth(10),
    },
    buttonView : {
        width: responsiveWidth(15),
        height : responsiveWidth(15),
        borderRadius : responsiveWidth(7.5),
        backgroundColor: '#00bcd4',
        padding : 3,
        margin : 15,
        marginLeft:responsiveWidth(80),
    },
    buttonIcon : {
        flex : 2,
        fontSize : responsiveFontSize(7.5),
        textAlign : 'center',
        color : '#ffffff',
    },
});

class CreateTagStep3 extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount()
    {
        this.props.tryTagSupervisor(this.props.login, this.props.tags.creation_current);
        this.props.tryTagFollowers(this.props.login, this.props.tags.creation_current);
    }

    preview()
    {
        this.props.goToCreateTagPreview();
    }

    render() {
        let supervisor = this.props.tags.creation_current.supervisor;
        let followers = this.props.tags.creation_current.users;
        if(supervisor !== null && followers !== null)
        {
            let users = [];
            for(var i = 0; i < followers.length; i++)
            {
                if(supervisor["@id"] !== followers[i]["@id"])
                {
                    users.push(
                        <ElevatedView key={i} elevation={3} style={styles.cardPeopleContentView}>
                            <View style={{justifyContent : 'center'}}>
                                <Text style={styles.cardPeopleContentText}>
                                    {followers[i].firstName} {followers[i].lastName}
                                </Text>
                            </View>
                            <View style={{justifyContent : 'center'}}>
                                <TouchableWithoutFeedback>
                                    <Icon name="close" style={styles.cardPeopleIcon} />
                                </TouchableWithoutFeedback>
                            </View>
                        </ElevatedView>
                    );
                }
            }
            return (
                <View style={{flex : 1, backgroundColor : "#efefef"}}>
                    <HeaderTagDetails {...this.props} headerTitle="Créer un tag" />
                    <ElevatedView style={styles.managerCard} elevation={2}>
                        <ElevatedView style={styles.cardHeader} elevation={2}>
                            <View style={styles.cardHeaderIconView}>
                                <Icon name="account-circle" style={styles.cardHeaderIcon} />
                            </View>
                            <Text style={styles.cardHeaderTitle}>
                                Responsable
                            </Text>
                        </ElevatedView>
                        <View style={styles.cardManagerContent}>
                            <ElevatedView elevation={3} style={styles.cardManagerContentView}>
                                <Text style={styles.cardManagerContentText}>
                                    {this.props.tags.creation_current.supervisor.firstName} {this.props.tags.creation_current.supervisor.lastName}
                                </Text>
                            </ElevatedView>
                        </View>
                    </ElevatedView>
                    <ElevatedView style={styles.peopleCard} elevation={2}>
                        <ElevatedView style={styles.cardHeader} elevation={2}>
                            <View style={styles.cardHeaderIconView}>
                                <Icon name="account-circle" style={styles.cardHeaderIcon} />
                            </View>
                            <Text style={styles.cardHeaderTitle}>
                                Personnes en suivi
                            </Text>
                        </ElevatedView>
                        <View style={styles.cardPeopleContent}>
                            { users }
                        </View>
                    </ElevatedView>
                    <View style={{flex : 0.5, alignItems:'flex-end', flexDirection:'row'}}>
                        <TouchableWithoutFeedback onPress={this.preview.bind(this)}>
                            <ElevatedView style={styles.buttonView} elevation={7}>
                                <Icon name="eye" style={styles.buttonIcon} />
                            </ElevatedView>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            );
        }
        else if(supervisor === null && followers !== null)
        {
            let users = [];
            for(var i = 0; i < followers.length; i++)
            {
                users.push(
                    <ElevatedView key={i} elevation={3} style={styles.cardPeopleContentView}>
                        <View style={{justifyContent : 'center'}}>
                            <Text style={styles.cardPeopleContentText}>
                                {followers[i].firstName} {followers[i].lastName}
                            </Text>
                        </View>
                        <View style={{justifyContent : 'center'}}>
                            <TouchableWithoutFeedback>
                                <Icon name="close" style={styles.cardPeopleIcon} />
                            </TouchableWithoutFeedback>
                        </View>
                    </ElevatedView>
                );
            }
            return (
                <View style={{flex : 1, backgroundColor : "#efefef"}}>
                    <HeaderTagDetails {...this.props} headerTitle="Créer un tag" />
                    <ElevatedView style={styles.managerCard} elevation={2}>
                        <ElevatedView style={styles.cardHeader} elevation={2}>
                            <View style={styles.cardHeaderIconView}>
                                <Icon name="account-circle" style={styles.cardHeaderIcon} />
                            </View>
                            <Text style={styles.cardHeaderTitle}>
                                Responsable
                            </Text>
                        </ElevatedView>
                        <View style={styles.cardManagerContent}>

                        </View>
                    </ElevatedView>
                    <ElevatedView style={styles.peopleCard} elevation={2}>
                        <ElevatedView style={styles.cardHeader} elevation={2}>
                            <View style={styles.cardHeaderIconView}>
                                <Icon name="account-circle" style={styles.cardHeaderIcon} />
                            </View>
                            <Text style={styles.cardHeaderTitle}>
                                Personnes en suivi
                            </Text>
                        </ElevatedView>
                        <View style={styles.cardPeopleContent}>
                            { users }
                        </View>
                    </ElevatedView>
                    <View style={{flex : 0.5, alignItems:'flex-end', flexDirection:'row'}}>
                        <TouchableWithoutFeedback onPress={this.preview.bind(this)}>
                            <ElevatedView style={styles.buttonView} elevation={7}>
                                <Icon name="eye" style={styles.buttonIcon} />
                            </ElevatedView>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            );
        }
        else
        {
            return (
                <View style={{flex : 1, backgroundColor : "#efefef"}}>
                    <HeaderTagDetails {...this.props} headerTitle="Créer un tag" />
                    <ElevatedView style={styles.managerCard} elevation={2}>
                        <ElevatedView style={styles.cardHeader} elevation={2}>
                            <View style={styles.cardHeaderIconView}>
                                <Icon name="account-circle" style={styles.cardHeaderIcon} />
                            </View>
                            <Text style={styles.cardHeaderTitle}>
                                Responsable
                            </Text>
                        </ElevatedView>
                    </ElevatedView>
                    <ElevatedView style={styles.peopleCard} elevation={2}>
                        <ElevatedView style={styles.cardHeader} elevation={2}>
                            <View style={styles.cardHeaderIconView}>
                                <Icon name="account-circle" style={styles.cardHeaderIcon} />
                            </View>
                            <Text style={styles.cardHeaderTitle}>
                                Personnes en suivi
                            </Text>
                        </ElevatedView>
                        <View style={styles.cardPeopleContent}>

                        </View>
                    </ElevatedView>
                    <View style={{flex : 0.5, alignItems:'flex-end', flexDirection:'row'}}>
                        <TouchableWithoutFeedback onPress={this.preview.bind(this)}>
                            <ElevatedView style={styles.buttonView} elevation={7}>
                                <Icon name="eye" style={styles.buttonIcon} />
                            </ElevatedView>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            );
        }

    }
};

function mapStateToProps(state) {
    return {
        login: state.login,
        nav : state.nav,
        tags : state.tags,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateTagStep3);