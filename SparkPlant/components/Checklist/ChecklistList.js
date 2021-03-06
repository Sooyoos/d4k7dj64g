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
import ChecklistListItem from './ChecklistListItem';
import {height1, height20, height80} from "../../assets/layout";

let styles = StyleSheet.create({
    list: {
        height : height80,
        paddingTop : height1,
        paddingBottom : height20,
        backgroundColor : "#efefef",
    },
});

class ChecklistList extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            activeItem : null,
        };
    }

    activateItem(key)
    {
        this.setState({activeItem : key});
    }

    deactivateItem()
    {
        this.setState({activeItem : null});
    }

    buildList()
    {
        let lists = this.props.items;
        let list = [];

        if(lists && this.props.checklists.loading === false)
        {
            for(var i = 0; i < lists.length; i++)
            {
                if(i === this.state.activeItem)
                {
                    list.push(
                        {
                            active : true,
                            index : i,
                            activateItem : this.activateItem.bind(this),
                            deactivateItem : this.deactivateItem.bind(this),
                            route : this.props.itemRoute,
                            key : i,
                            item : lists[i],
                        }
                    );
                }
                else
                {
                    list.push(
                        {
                            active : false,
                            index : i,
                            activateItem : this.activateItem.bind(this),
                            deactivateItem : this.deactivateItem.bind(this),
                            route : this.props.itemRoute,
                            key : i,
                            item : lists[i],
                        }
                    );
                }
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
                    renderItem={({item}) => <ChecklistListItem active={item.active} index={item.index} activateItem={item.activateItem} deactivateItem={item.deactivateItem} route={item.route} key={item.key} item={item.item}/>}
                />
            </TouchableWithoutFeedback>
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