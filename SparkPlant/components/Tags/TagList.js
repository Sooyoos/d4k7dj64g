import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    FlatList,
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
                        {
                            key : i,
                            tag : this.props.items[i].tag,
                        }
                    );
                }
                else
                {
                    list.push(
                        {
                            key : i,
                            tag : this.props.items[i],
                        }
                    );
                }

            }

            return list;
        }

        return null;
    }

    render() {
        let list = this.buildList() && this.buildList().length > 0 ? this.buildList() : [];
        console.log(list);
        return (
            <FlatList
                data={list}
                renderItem={({item}) => <TagListItem key={item.key} tag={item.tag} />}
                showsVerticalScrollIndicator={false}
            />
        );
    }
};