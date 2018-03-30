import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActionCreators } from '../actions';
import * as layout from "../assets/layout";
import Header from "../components/Header/Header";
import moment from 'moment';
import {fullWidth} from "../assets/layout";
import {fullHeight} from "../assets/layout";
import {height93} from "../assets/layout";

let styles = StyleSheet.create({
    login: {
        width : fullWidth,
        height : fullHeight,
    },
    body: {
        width : fullWidth,
        height : height93,
        backgroundColor: '#efefef',
        alignItems:'center',
        justifyContent: 'center',
        paddingVertical: layout.height2,
        paddingHorizontal: layout.width4,
    },
    card : {
        height : layout.height10,
        width : layout.width96,
        backgroundColor: "#ffffff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: layout.height1,
    },
    cardScore : {
        width : layout.height10,
        height : layout.height10,
        alignItems: "center",
        justifyContent: "center",
    },
    cardScoreText : {
        textAlign : "center",
        fontSize : layout.fontSize3,
        color : "#3f51b5",
    },
    cardInfo : {
        width : layout.width96 - layout.height10,
        height : layout.height10,
        alignItems: "center",
        justifyContent: "center",
    },
    cardTitle : {
        textAlign : "center",
        fontSize : layout.fontSize1p8,
        color : "#232323",
    },
    cardDate : {
        textAlign : "center",
        fontSize : layout.fontSize1p8,
        color : "#777777",
    }
});

class ScoringScreen extends Component {

    constructor(props)
    {
        super(props);
    }

    componentWillMount()
    {
        this.props.tryUserActions(this.props.users.loggedUser);
    }

    buildCardList()
    {
        let actions = this.props.users.loggedUser.actions;
        let list = [];

        for(var i = 0; i < actions.length; i++)
        {
            if(actions[i].type === "add_tag")
            {
                list.push(
                    {
                        key : i,
                        points : actions[i].points,
                        label : "Création d'un tag",
                        date : "Le " + moment(actions[i].createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY à HH:mm"),
                    }
                );
            }
            else if(actions[i].type === "add_news")
            {
                list.push(
                    {
                        key : i,
                        points : actions[i].points,
                        label : "Création d'une news",
                        date : "Le " + moment(actions[i].createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY à HH:mm"),
                    }
                );
            }
            else if(actions[i].type === "add_checklist")
            {
                list.push(
                    {
                        key : i,
                        points : actions[i].points,
                        label : "Création d'une checkliste",
                        date : "Le " + moment(actions[i].createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY à HH:mm"),
                    }
                );
            }
        }

        return list;
    }

    render() {

        if(this.props.users.loading === true || this.props.users.loggedUser === null || this.props.users.loggedUser.actions === null)
        {
            return (
                <View style={styles.login}>
                    <Header props={this.props} />
                    <View style={styles.body}>
                        <ActivityIndicator color="#3f51b5" size="large"/>
                    </View>
                </View>
            );
        }
        else
        {
            let list = this.buildCardList();
            return (
                <View style={styles.login}>
                    <Header props={this.props} />
                    <View style={styles.body}>
                        <FlatList
                            data={list}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item}) => <View style={styles.card} key={item.key}>
                                <View style={styles.cardScore}>
                                    <Text style={styles.cardScoreText}>
                                        + {item.points}
                                    </Text>
                                </View>
                                <View style={styles.cardInfo}>
                                    <Text style={styles.cardTitle}>
                                        { item.label }
                                    </Text>
                                    <Text style={styles.cardDate}>
                                        { item.date }
                                    </Text>
                                </View>
                            </View>}
                        />
                    </View>
                </View>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        login: state.login,
        nav : state.nav,
        users : state.users,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ScoringScreen);