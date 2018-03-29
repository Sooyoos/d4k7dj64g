import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Alert,
    FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import TagHistoryItem from './TagHistoryItem';

let styles = StyleSheet.create({
    list: {

    },
});

class TagHistoryList extends Component {

    constructor(props) {
        super(props);
    }

    buildList()
    {
        let list = [];

        if(this.props.items)
        {
            for(var i = 0; i < this.props.items.length ; i++)
            {
                list.push(
                    {
                        key : i,
                        item : this.props.items[i],
                    }
                );
            }
        }

        return list;
    }

    render() {
        let list = this.buildList();
        return (
            <FlatList
                data={list}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => <TagHistoryItem key={item.key} item={item.item} />}
            />
        );
    }
};

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


export default connect(mapStateToProps, mapDispatchToProps)(TagHistoryList);