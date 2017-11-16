import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import NewsListItem from './NewsListItem';
import {height1, height20, height80} from "../../assets/layout";

let styles = StyleSheet.create({
    list: {
        height : height80,
        paddingTop : height1,
        paddingBottom : height20,
    },
});

class NewsList extends Component {

    buildList()
    {
        let news = this.props.items;
        let list = [];

        if(news)
        {
            for(var i = 0; i < news.length; i++)
            {
                list.push(
                    <NewsListItem route={this.props.itemRoute} key={i} item={news[i]}/>
                );
            }
        }
        return list;
    }

    render() {
        return (
            <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
                {this.buildList()}
            </ScrollView>
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


export default connect(mapStateToProps, mapDispatchToProps)(NewsList);