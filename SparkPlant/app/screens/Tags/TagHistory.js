import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
} from 'react-native';

let styles = StyleSheet.create({
    list: {

    },
});

export default class TagHistory extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>

            </ScrollView>
        );
    }
};