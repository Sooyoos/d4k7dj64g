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
        let lists = this.props.items;
        let list = [];

        if(lists)
        {
            for(var i = 0; i < lists.length; i++)
            {
                list.push(
                    <ChecklistListItem route={this.props.itemRoute} key={i} item={lists[i]}/>
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
        checklists : state.checklists,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ChecklistList);