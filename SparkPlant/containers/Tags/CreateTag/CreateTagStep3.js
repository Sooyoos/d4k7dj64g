import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ElevatedView from 'react-native-elevated-view';
import * as layout from "../../../assets/layout";
import HeaderTagDetails from "../../../components/Header/HeaderTags";

let styles = StyleSheet.create({
    managerCard : {
        width : layout.width90,
        height : layout.height20,
        margin: layout.width5,
        backgroundColor: '#ffffff',
    },
    cardHeader : {
        height : layout.height10,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardHeaderIconView : {
        width: layout.width15,
        height : layout.width15,
        borderRadius : layout.width7p5,
        backgroundColor: '#00bcd4',
        margin : layout.width1p5,
        alignItems : "center",
        justifyContent : "center",
    },
    cardHeaderIcon : {
        fontSize : layout.fontSize5,
        textAlign : 'center',
        color : '#ffffff',
    },
    cardHeaderTitle : {
        flex : 9,
        fontSize : layout.fontSize2,
        fontWeight: 'bold',
        color : '#212121',
    },
    cardManagerContent : {
        padding : layout.width2,
        backgroundColor : '#ffffff',
        justifyContent : 'center',
    },
    cardManagerContentView : {
        backgroundColor : '#efefef',
        width : layout.width60,
        height : layout.height6,
        borderRadius: layout.width2,
        justifyContent: 'center',
        margin : layout.height1,
    },
    cardManagerContentText : {
        textAlign: 'center',
        color : '#232323',
        fontSize : layout.fontSize1p8,
    },
    peopleCard : {
        width : layout.width90,
        height : layout.height55,
        margin: layout.width5,
        backgroundColor: '#ffffff',
    },
    cardPeopleContent : {
        padding : layout.width2,
        backgroundColor : '#ffffff',
        justifyContent : 'center',
    },
    cardPeopleContentView : {
        backgroundColor : '#efefef',
        width : layout.width60,
        height : layout.height6,
        borderRadius: layout.width2,
        justifyContent: 'center',
        flexDirection: 'row',
        margin : layout.height1,
    },
    cardPeopleContentText : {
        textAlign: 'center',
        color : '#232323',
        fontSize : layout.fontSize1p8,
        width : layout.width50,
    },
    cardPeopleIcon : {
        textAlign: 'center',
        color : '#232323',
        fontSize : layout.fontSize2p2,
        width : layout.width10,
    },
    buttonView : {
        width: layout.width23,
        height : layout.width23,
        borderRadius : layout.width11p5,
        backgroundColor: '#00bcd4',
        marginLeft:layout.width75,
        alignItems : "center",
        justifyContent: "center",
        marginBottom: layout.height1,
    },
    buttonIcon : {
        fontSize : layout.fontSize7p5,
        textAlign : 'center',
        color : '#ffffff',
    },
});

class CreateTagStep3 extends Component {

    static navigationOptions = {
        drawerLabel: 'TAGS',
        drawerIcon: ({tintColor}) => (
            <Icon name='tag' style={{fontSize : 24, color : '#757575'}}/>
        ),
    };

    constructor(props) {
        super(props);
        this.state = {
            followers : null
        }
    }

    componentWillMount()
    {
        if(this.props.tags.creation_current.place !== null)
        {
            this.props.tryTagSupervisor(this.props.login, this.props.tags.creation_current);
            this.props.tryTagFollowers(this.props.login, this.props.users.loggedUser, this.props.tags.creation_current);
        }
    }

    deleteFollower(index)
    {
        console.log(index);
        let followers = this.props.tags.creation_current.users;
        followers.splice(index, 1);
        this.setState({followers : followers});
    }

    preview()
    {
        console.log(this.props.tags.creation_current.users);
        if(this.state.followers)
        {
            this.props.trySetTagFollowers(this.state.followers);
        }
        else
        {
            this.props.trySetTagFollowers(this.props.tags.creation_current.users);
        }

        this.props.goToCreateTagPreview();
    }

    render() {
        let supervisor = this.props.tags.creation_current.supervisor;
        let followers = this.props.tags.creation_current.users;
        if(supervisor !== null)
        {
            let users = [];
            for(let i = 0; i < followers.length; i++)
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
                                <TouchableOpacity onPress={() =>{this.deleteFollower(i)}}>
                                    <Icon name="close" style={styles.cardPeopleIcon} />
                                </TouchableOpacity>
                            </View>
                        </ElevatedView>
                    );
                }
            }
            return (
                <View style={{flex : 1, backgroundColor : "#efefef"}}>
                    <HeaderTagDetails {...this.props} headerTitle="Créer un tag" />
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <ElevatedView style={styles.managerCard} elevation={2}>
                            <ElevatedView style={styles.cardHeader} elevation={2}>
                                <View style={styles.cardHeaderIconView}>
                                    <Icon name="account-circle" style={styles.cardHeaderIcon} />
                                </View>
                                <Text style={styles.cardHeaderTitle}>
                                    En charge du tag
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
                            <ScrollView style={{height : layout.height40}} contentContainerStyle={styles.cardPeopleContent} horizontal={false}>
                                { users }
                            </ScrollView>
                        </ElevatedView>
                    </ScrollView>
                    <View style={{flex : 0.5, alignItems:'flex-end', flexDirection:'row'}}>
                        <TouchableOpacity onPress={this.preview.bind(this)}>
                            <ElevatedView style={styles.buttonView} elevation={7}>
                                <Icon name="eye" style={styles.buttonIcon} />
                            </ElevatedView>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        else if(supervisor === null && followers && followers.length > 0)
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
                    <ScrollView showsVerticalScrollIndicator={false}>
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
                                    <ActivityIndicator color="#3f51b5" size="large"/>
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
                            <ScrollView style={{height : layout.height40}} contentContainerStyle={styles.cardPeopleContent} horizontal={false}>
                                { users }
                            </ScrollView>
                        </ElevatedView>
                    </ScrollView>
                </View>
            );
        }
        else
        {
            return (
                <View style={{flex : 1, backgroundColor : "#efefef"}}>
                    <HeaderTagDetails {...this.props} headerTitle="Créer un tag" />
                    <ScrollView showsVerticalScrollIndicator={false}>
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
                                    <ActivityIndicator color="#3f51b5" size="large"/>
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
                                <ActivityIndicator color="#3f51b5" size="large"/>
                            </View>
                        </ElevatedView>
                    </ScrollView>
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
        users : state.users,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateTagStep3);