import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    TextInput,
    TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActionCreators } from '../../actions';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import HeaderNews from "../../components/Header/HeaderNews";
import FooterButton from "../../components/Footer/FooterButton";
import NewsList from '../../components/News/NewsList';
import ElevatedView from "react-native-elevated-view";

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
    searchView : {
        width : responsiveWidth(90),
        height : responsiveHeight(10),
        marginHorizontal: responsiveWidth(5),
        marginVertical: responsiveHeight(2),
        backgroundColor: "#ffffff",
        paddingHorizontal: responsiveWidth(5),
        paddingVertical: responsiveHeight(1),
        flexDirection: "row",
        justifyContent : 'center',
    },
    searchField : {
        width : responsiveWidth(60),
        height : responsiveHeight(5),
        marginHorizontal: responsiveWidth(5),
        marginVertical: responsiveHeight(2),
        fontSize : responsiveFontSize(1.8),
    },
    searchButton : {
        backgroundColor: "#00bcd4",
        width : responsiveHeight(8),
        height : responsiveHeight(8),
        borderRadius : responsiveHeight(4),
        justifyContent: 'center',
    },
    searchIcon : {
        color : "#ffffff",
        fontSize : responsiveFontSize(3.4),
        textAlign : 'center',
    },
    footer: {
        height:responsiveHeight(10),
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
        paddingBottom : responsiveHeight(3),
    },
});

class SearchNews extends Component {

    static navigationOptions = {
        drawerLabel: 'NEWS',
        drawerIcon: ({tintColor}) => (
            <Icon name='newspaper-o' style={{fontSize : 24, color : '#757575'}}/>
        ),
    };

    constructor(props)
    {
        super(props);
        this.state = {
            search : null,
        }
    }

    componentWillMount()
    {
        this.props.tryUserNews(this.props.login);
    }

    search()
    {
        let fullList = this.props.news.news;
        let shortList = [];

        for(var i = 0; i < fullList.length; i++)
        {
            if(fullList[i].title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
            {
                shortList.push(fullList[i]);
            }
        }

        this.props.searchNews(shortList, this.state.search);
    }

    render() {
        return (
            <View style={styles.login}>
                <HeaderNews {...this.props} headerTitle="News"/>
                <View style={styles.body}>
                    <ElevatedView style={styles.searchView} elevation={2}>
                        <TextInput placeholder="Rechercher" style={styles.searchField} value={this.state.search} onChangeText={(value) => this.setState({search : value})}/>
                        <TouchableWithoutFeedback onPress={this.search.bind(this)}>
                            <ElevatedView style={styles.searchButton} elevation={6}>
                                <Icon name="search" style={styles.searchIcon}/>
                            </ElevatedView>
                        </TouchableWithoutFeedback>
                    </ElevatedView>
                    <NewsList itemRoute={this.props.goToNewsDetail} items={this.props.news.searchResults} />
                </View>
                <View style={styles.footer}>
                    <FooterButton {...this.props} active={true} iconName="newspaper-o" text="Publiées" route={() => { this.props.goToSearchNews(this.props.nav) }}/>
                    <FooterButton {...this.props} active={false} iconName="clock-o" text="A valider" route={() => { this.props.goToSearchWaitingNews(this.props.nav) }}/>
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


export default connect(mapStateToProps, mapDispatchToProps)(SearchNews);