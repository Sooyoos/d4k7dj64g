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
import HeaderNews from "../components/Header/HeaderNews";
import FooterButton from "../components/Footer/FooterButton";
import NewsList from '../components/News/NewsList';

let styles = StyleSheet.create({
    login: {
        height:layout.height7,
    },
    body: {
        height:layout.height83,
        backgroundColor : "#efefef",
        alignItems:'center',
        justifyContent: 'center',
    },
    footer: {
        height:layout.height10,
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
        paddingBottom : layout.height3,
    },
});

class NewsScreen extends Component {

    static navigationOptions = {
        drawerLabel: 'NEWS',
        drawerIcon: ({tintColor}) => (
            <Icon name='newspaper-o' style={{fontSize : 24, color : '#757575'}}/>
        ),
    };

    constructor(props)
    {
        super(props);
    }

    componentWillMount()
    {
        this.props.tryUserNews(this.props.login);
    }

    isResponsable()
    {
        let roles = this.props.users.loggedUser.rolesByUnit;

        for(var i = 0; i < roles.length; i++)
        {
            if(roles[i].role.title === "Responsable")
            {
                return true;
            }
        }

        return false;
    }

    render() {
        let responsable = this.isResponsable();

        if(responsable)
        {
            return (
                <View style={styles.login}>
                    <HeaderNews {...this.props} headerTitle="News"/>
                    <View style={styles.body}>
                        <NewsList itemRoute={this.props.goToNewsDetail} items={this.props.news.news} />
                    </View>
                    <View style={styles.footer}>
                        <FooterButton {...this.props} active={true} iconName="newspaper-o" text="Publiées" route={() => { this.props.goToNewsPage(this.props.nav) }}/>
                        <FooterButton {...this.props} active={false} iconName="clock-o" text="A valider" route={() => { this.props.goToWaitingNews(this.props.nav) }}/>
                    </View>
                </View>
            );
        }
        else
        {
            return (
                <View style={styles.login}>
                    <HeaderNews {...this.props} headerTitle="News"/>
                    <View style={styles.body}>
                        <NewsList itemRoute={this.props.goToNewsDetail} items={this.props.news.news} />
                    </View>
                    <View style={styles.footer}>
                        <FooterButton {...this.props} active={false} iconName="newspaper-o" text="Publiées" route={ () => { this.props.goToNewsPage(this.props.nav) }}/>
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
        news : state.news,
        users : state.users,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(NewsScreen);