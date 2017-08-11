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

let styles = StyleSheet.create({
    login: {
        flex:1,
    },
    body: {
        flex:8.4,
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

    render() {
        if(this.props.login.loading === false)
        {
            return (
                <View style={styles.login}>
                    <Header props={this.props}/>
                    <View style={styles.body}>
                        <DashboardNavigation {... this.props} />
                        <DashboardNews/>
                    </View>
                </View>
            );
        }
        else
        {
            return(
                <View style={styles.login}>
                    <ActivityIndicator color="#3f51b5" size="large"/>
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
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);