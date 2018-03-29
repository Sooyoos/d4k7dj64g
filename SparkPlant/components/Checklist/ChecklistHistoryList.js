import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import ChecklistHistoryItem from './ChecklistHistoryItem';
import * as layout from "../../assets/layout";

let styles = StyleSheet.create({
    list: {
        height : layout.height65,
        paddingTop : layout.height1,
        paddingBottom : layout.height20,
        backgroundColor : "#efefef",
        alignItems: 'center',
        justifyContent: 'center',
    },
});

class ChecklistHistoryList extends Component {

    constructor(props)
    {
        super(props);
    }

    buildList()
    {
        let lists = this.props.checklists.checklistHistory;
        let list = [];

        if(lists)
        {
            for(var i = 0; i < lists.length; i++)
            {
                list.push(
                    {
                        key : i,
                        item : lists[i],
                    }
                );
            }
        }
        return list;
    }

    render() {
        let list = this.buildList();
        return (
            <TouchableWithoutFeedback onPress={() => {this.deactivateItem()}}>
                <FlatList
                    data={list}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => <ChecklistHistoryItem key={item.key} item={item.item}/>}
                />
            </TouchableWithoutFeedback>
        );
    }
}

function mapStateToProps(state) {
    return {
        login: state.login,
        nav : state.nav,
        checklists : state.checklists,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ChecklistHistoryList);