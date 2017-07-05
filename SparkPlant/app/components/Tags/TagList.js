import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
} from 'react-native';
import TagListItem from './TagListItem';

let styles = StyleSheet.create({
    list: {

    },
});

export default class TagList extends Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

    buildList()
    {
        let list = [];

        for(var i = 0; i < this.props.items.length ; i++)
        {
            list.push(
                <TagListItem key={i} tag={this.props.items[i]} />
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