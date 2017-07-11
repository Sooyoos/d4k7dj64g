import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
} from 'react-native';
import TagHistoryItem from './TagHistoryItem';

let styles = StyleSheet.create({
    list: {

    },
});

export default class TagHistoryList extends Component {

    constructor(props) {
        super(props);
    }

    buildList()
    {
        let list = [];

        for(var i = 0; i < this.props.items.length ; i++)
        {
            list.push(
                <TagHistoryItem {...this.props} key={i} item={this.props.items[i]} />
            );
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