import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import TagListItem from './TagListItem';

let styles = StyleSheet.create({
    list: {
        height : responsiveHeight(80),
        paddingTop : 20,
        paddingBottom: 20,
    },
});

export default class TagList extends Component {

    constructor(props) {
        super(props);
    }

    buildList()
    {
        let list = [];

        for(var i = 0; i < this.props.items.length ; i++)
        {
            list.push(
                <TagListItem {...this.props} key={i} tag={this.props.items[i]} />
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