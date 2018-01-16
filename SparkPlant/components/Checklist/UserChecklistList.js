import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import UserChecklistListItem from './UserChecklistListItem';
import {height1, height20, height80} from "../../assets/layout";

let styles = StyleSheet.create({
    list: {
        height : height80,
        paddingTop : height1,
        paddingBottom : height20,
        backgroundColor : "#efefef",
    },
});

class UserChecklistList extends Component {

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

        if(lists)
        {
            for(var i = 0; i < lists.length; i++)
            {
                if(i === this.state.activeItem)
                {
                    console.log(i);
                    console.log(this.state.activeItem);

                    list.push(
                        <UserChecklistListItem active={true} index={i} activateItem={this.activateItem.bind(this)} deactivateItem={this.deactivateItem.bind(this)} route={this.props.itemRoute} key={i} item={lists[i]}/>
                    );
                }
                else
                {
                    list.push(
                        <UserChecklistListItem active={false} index={i} activateItem={this.activateItem.bind(this)} deactivateItem={this.deactivateItem.bind(this)} route={this.props.itemRoute} key={i} item={lists[i]}/>
                    );
                }
            }
        }
        return list;
    }

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableWithoutFeedback onPress={() => {this.deactivateItem()}}>
                    <View style={styles.list}>
                        {this.buildList()}
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
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


export default connect(mapStateToProps, mapDispatchToProps)(UserChecklistList);