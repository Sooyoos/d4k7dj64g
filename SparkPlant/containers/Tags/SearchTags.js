import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActionCreators } from '../../actions';
import * as layout from "../../assets/layout";
import HeaderTags from "../../components/Header/HeaderTags";
import TagList from '../../components/Tags/TagList';
import ElevatedView from "react-native-elevated-view";

let styles = StyleSheet.create({
    login: {
        height:layout.height7,
    },
    body: {
        height:layout.height93,
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
        alignItems: "center",
    },
    searchIcon : {
        color : "#ffffff",
        fontSize : layout.fontSize3,
        textAlign : 'center',
    },
});

class SearchTags extends Component {

    static navigationOptions = {
        title : 'TAGS',
        drawerLabel: "TAGS",
        drawerIcon: ({tintColor}) => (
            <Icon name='tag' style={{fontSize : layout.fontSize1p8, color : '#757575'}}/>
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
                        <TouchableOpacity onPress={this.search.bind(this)}>
                            <ElevatedView style={styles.searchButton} elevation={6}>
                                <Icon name="search" style={styles.searchIcon}/>
                            </ElevatedView>
                        </TouchableOpacity>
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