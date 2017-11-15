import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
} from 'react-native';
import TagListItem from './TagListItem';
import {height1, height20, height80} from "../../assets/layout";

let styles = StyleSheet.create({
    list: {
        height : height80,
        paddingTop : height1,
        paddingBottom : height20,
    },
});

export default class TagList extends Component {

    constructor(props) {
        super(props);
    }

    buildList()
    {
        if(this.props.items)
        {
            let list = [];

            for(var i = 0; i < this.props.items.length ; i++)
            {
                if(this.props.items[i].tag)
                {
                    list.push(
                        <TagListItem {...this.props} key={i} tag={this.props.items[i].tag} />
                    );
                }
                else
                {
                    list.push(
                        <TagListItem {...this.props} key={i} tag={this.props.items[i]} />
                    );
                }

            }

            return list;
        }

        return null;
    }

    render() {
        return (
            <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
                {this.buildList()}
            </ScrollView>
        );
    }
};