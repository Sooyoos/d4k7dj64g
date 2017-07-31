import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import TagHistoryItem from './TagHistoryItem';

let styles = StyleSheet.create({
    list: {

    },
});

function lpad(value, padding) {
    var zeroes = new Array(padding+1).join("0");
    return (zeroes + value).slice(-padding);
}

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
                    <TagHistoryItem {...this.props} key={i} item={this.props.items[i]} />
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