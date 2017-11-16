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
import * as layout from "../../assets/layout";
import HeaderTags from "../../components/Header/HeaderTags";
import FooterButton from "../../components/Footer/FooterButton";
import NewsList from '../../components/News/NewsList';
import HeaderNews from "../../components/Header/HeaderNews";
import ElevatedView from "react-native-elevated-view";

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
    searchView : {
        width : layout.width90,
        height : layout.height10,
        marginHorizontal: layout.width5,
        marginVertical: layout.height2,
        backgroundColor: "#ffffff",
        paddingHorizontal: layout.width5,
        paddingVertical: layout.height1,
        flexDirection: "row",
        justifyContent : 'center',
    },
    searchField : {
        width : layout.width60,
        height : layout.height5,
        marginHorizontal: layout.width5,
        marginVertical: layout.height2,
        fontSize : layout.fontSize1p8,
    },
    searchButton : {
        backgroundColor: "#00bcd4",
        width : layout.height8,
        height : layout.height8,
        borderRadius : layout.height4,
        justifyContent: 'center',
    },
    searchIcon : {
        color : "#ffffff",
        fontSize : layout.fontSize3p4,
        textAlign : 'center',
    },
    footer: {
        height:layout.height10,
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
        paddingBottom : layout.height3,
    },
});

class SearchWaitingNews extends Component {

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
        this.props.tryWaitingNews(this.props.login);
    }

    search()
    {
        let fullList = this.props.news.waitingNews;
        let shortList = [];

        for(var i = 0; i < fullList.length; i++)
        {
            if(fullList[i].title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
            {
                shortList.push(fullList[i]);
            }
        }

        this.props.searchWaitingNews(shortList, this.state.search);
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
                    <NewsList itemRoute={this.props.goToWaitingNewsDetail} items={this.props.news.searchResultsWaiting} />
                </View>
                <View style={styles.footer}>
                    <FooterButton {...this.props} active={false} iconName="newspaper-o" text="Publiées" route={() => { this.props.goToSearchNews(this.props.nav) }}/>
                    <FooterButton {...this.props} active={true} iconName="clock-o" text="A valider" route={() => { this.props.goToSearchWaitingNews(this.props.nav) }}/>
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


export default connect(mapStateToProps, mapDispatchToProps)(SearchWaitingNews);