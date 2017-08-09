import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import ChecklistListItem from './ChecklistListItem';

let styles = StyleSheet.create({
    list: {
        height : responsiveHeight(80),
        paddingTop : responsiveHeight(1),
        paddingBottom : responsiveHeight(20),
    },
});

class ChecklistList extends Component {

    buildList()
    {
        let news = this.props.items;
        let list = [];

        if(news)
        {
            for(var i = 0; i < news.length; i++)
            {
                list.push(
                    <ChecklistListItem route={this.props.itemRoute} key={i} item={news[i]}/>
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


export default connect(mapStateToProps, mapDispatchToProps)(ChecklistList);