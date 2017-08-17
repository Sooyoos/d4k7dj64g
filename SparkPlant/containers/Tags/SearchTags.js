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
import HeaderTags from "../../components/Header/HeaderTags";
import TagList from '../../components/Tags/TagList';
import ElevatedView from "react-native-elevated-view";

let styles = StyleSheet.create({
    login: {
        height:responsiveHeight(7),
    },
    body: {
        height:responsiveHeight(93),
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
});

class SearchTags extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            search : null,
        }
    }

    componentWillMount()
    {
        this.props.tryAllTags(this.props.login);
    }

    search()
    {
        let fullList = this.props.tags.allTags;
        let shortList = [];

        for(var i = 0; i < fullList.length; i++)
        {
            if(fullList[i].title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
            {
                shortList.push(fullList[i]);
            }
        }

        this.props.searchTags(shortList, this.state.search);
    }

    render() {
        return (
            <View style={styles.login}>
                <HeaderTags {...this.props} headerTitle="Tags"/>
                <View style={styles.body}>
                    <ElevatedView style={styles.searchView} elevation={2}>
                        <TextInput placeholder="Rechercher" style={styles.searchField} value={this.state.search} onChangeText={(value) => this.setState({search : value})}/>
                        <TouchableWithoutFeedback onPress={this.search.bind(this)}>
                            <ElevatedView style={styles.searchButton} elevation={6}>
                                <Icon name="search" style={styles.searchIcon}/>
                            </ElevatedView>
                        </TouchableWithoutFeedback>
                    </ElevatedView>
                    <TagList {...this.props} items={this.props.tags.searchResults} />
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


export default connect(mapStateToProps, mapDispatchToProps)(SearchTags);