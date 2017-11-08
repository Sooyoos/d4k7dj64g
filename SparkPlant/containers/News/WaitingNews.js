import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActionCreators } from '../../actions';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import HeaderTags from "../../components/Header/HeaderTags";
import FooterButton from "../../components/Footer/FooterButton";
import NewsList from '../../components/News/NewsList';
import HeaderNews from "../../components/Header/HeaderNews";

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

class WaitingNews extends Component {

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
        this.props.tryWaitingNews(this.props.login);
    }

    render() {
        return (
            <View style={styles.login}>
                <HeaderNews {...this.props} headerTitle="News" waiting={true}/>
                <View style={styles.body}>
                    <NewsList itemRoute={this.props.goToWaitingNewsDetail} items={this.props.news.waitingNews} />
                </View>
                <View style={styles.footer}>
                    <FooterButton {...this.props} active={false} iconName="newspaper-o" text="Publiées" route={() => { this.props.goToNewsPage(this.props.nav) }}/>
                    <FooterButton {...this.props} active={true} iconName="clock-o" text="A valider" route={() => { this.props.goToWaitingNews(this.props.nav) }}/>
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


export default connect(mapStateToProps, mapDispatchToProps)(WaitingNews);