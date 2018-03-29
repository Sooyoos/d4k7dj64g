import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    AsyncStorage,
    TouchableWithoutFeedback,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActionCreators } from '../actions';
import Header from '../components/Header/Header';
import DashboardNavigation from '../components/Dashboard/DashboardNavigation';
import DashboardNews from '../components/Dashboard/DashboardNews';
import {fullHeight, fullWidth, height46p5, height93} from "../assets/layout";

let styles = StyleSheet.create({
    login: {
        width : fullWidth,
        height : fullHeight,
    },
    body: {
        width : fullWidth,
        height : height93,
        backgroundColor: '#FFFFFF',
        alignItems:'center',
        justifyContent: 'center',
    },
});

class DashboardScreen extends Component {

    static navigationOptions = {
        drawerLabel: 'HOME',
        drawerIcon: ({tintColor}) => (
            <Icon name='home' style={{fontSize : 24, color : '#757575'}}/>
        ),
    };

    constructor(props)
    {
        super(props);
    }

    componentWillMount()
    {

    }

    isResponsable()
    {
        if(this.props.users.loggedUser)
        {
            let roles = this.props.users.loggedUser.rolesByUnit;

            for(var i = 0; i < roles.length; i++)
            {
                if(roles[i].role.title === "Responsable")
                {
                    return true;
                }
            }
        }

        return false;
    }

    render() {
        if(this.props.login.loading === false && this.props.users.loading === false && this.props.news.loading === false)
        {
            return (
                <View style={styles.login}>
                    <Header props={this.props} from="Dashboard"/>
                    <View style={styles.body}>
                        <DashboardNavigation />
                        <DashboardNews news={this.props.news.news} responsable={this.isResponsable()}/>
                    </View>
                </View>
            );
        }

        else
        {
            return(
                <View style={styles.login}>
                    <Header props={this.props} from="Dashboard"/>
                    <View style={styles.body}>
                        <DashboardNavigation />
                        <View style={{height : height46p5, width : fullWidth, alignItems: 'center', justifyContent: 'center'}}>
                            <ActivityIndicator color="#3f51b5" size="large"/>
                        </View>
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
        tags : state.tags,
        utils : state.utils,
        news : state.news,
        users : state.users,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);