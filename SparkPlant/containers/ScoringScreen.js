import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActionCreators } from '../actions';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Header from "../components/Header/Header";
import moment from 'moment';

let styles = StyleSheet.create({
    login: {
        flex:1,
    },
    body: {
        flex:8.4,
        backgroundColor: '#efefef',
        alignItems:'center',
        justifyContent: 'center',
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(4),
    },
    card : {
        height : responsiveHeight(10),
        width : responsiveWidth(96),
        backgroundColor: "#ffffff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: responsiveHeight(0.5),
    },
    cardScore : {
        width : responsiveHeight(10),
        height : responsiveHeight(10),
        alignItems: "center",
        justifyContent: "center",
    },
    cardScoreText : {
        textAlign : "center",
        fontSize : responsiveFontSize(3),
        color : "#3f51b5",
    },
    cardInfo : {
        width : responsiveWidth(96) - responsiveHeight(10),
        height : responsiveHeight(10),
        alignItems: "center",
        justifyContent: "center",
    },
    cardTitle : {
        textAlign : "center",
        fontSize : responsiveFontSize(1.8),
        color : "#232323",
    },
    cardDate : {
        textAlign : "center",
        fontSize : responsiveFontSize(1.8),
        color : "#777777",
    }
});

class ScoringScreen extends Component {

    constructor(props)
    {
        super(props);
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
                    <View style={styles.card} key={i}>
                        <View style={styles.cardScore}>
                            <Text style={styles.cardScoreText}>
                                + {actions[i].points}
                            </Text>
                        </View>
                        <View style={styles.cardInfo}>
                            <Text style={styles.cardTitle}>
                                Création d'un tag
                            </Text>
                            <Text style={styles.cardDate}>
                                Le {moment(actions[i].createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY à HH:mm")}
                            </Text>
                        </View>
                    </View>
                );
            }
            else if(actions[i].type === "add_news")
            {
                list.push(
                    <View style={styles.card} key={i}>
                        <View style={styles.cardScore}>
                            <Text style={styles.cardScoreText}>
                                + {actions[i].points}
                            </Text>
                        </View>
                        <View style={styles.cardInfo}>
                            <Text style={styles.cardTitle}>
                                Création d'une news
                            </Text>
                            <Text style={styles.cardDate}>
                                Le {moment(actions[i].createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY à HH:mm")}
                            </Text>
                        </View>
                    </View>
                );
            }
            else if(actions[i].type === "add_checklist")
            {
                list.push(
                    <View style={styles.card} key={i}>
                        <View style={styles.cardScore}>
                            <Text style={styles.cardScoreText}>
                                + {actions[i].points}
                            </Text>
                        </View>
                        <View style={styles.cardInfo}>
                            <Text style={styles.cardTitle}>
                                Création d'une checkliste
                            </Text>
                            <Text style={styles.cardDate}>
                                Le {moment(actions[i].createdAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY à HH:mm")}
                            </Text>
                        </View>
                    </View>
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
            return (
                <View style={styles.login}>
                    <Header props={this.props} />
                    <View style={styles.body}>
                        <ScrollView>
                            { this.buildCardList() }
                        </ScrollView>
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