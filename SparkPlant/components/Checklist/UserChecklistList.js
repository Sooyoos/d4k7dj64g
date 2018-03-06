import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Moment from "moment";
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

    shouldBeExecuted(checklist)
    {
        let history = this.props.checklists.fullChecklistHistory;

        if(history !== null)
        {
            for(var i = 0; i < history.length; i++)
            {
                if(history[i].checklist["@id"] === checklist.checklist["@id"])
                {
                    let now = Moment();
                    let date = Moment(history[i].createdAt, Moment.ISO_8601);

                    if(checklist.checklist.frequency === "mensuel")
                    {
                        if(now.isSame(date.add(1, 'months')) || now.isAfter(date.add(1, 'months')))
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                    else if(checklist.checklist.frequency === "hebdomadaire")
                    {
                        if(now.isSame(date.add(1, 'weeks')) || now.isAfter(date.add(1, 'weeks')))
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                    else if(checklist.checklist.frequency === "quotidien")
                    {
                        if(now.isSame(date.add(1, 'days')) || now.isAfter(date.add(1, 'days')))
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                    else
                    {
                        return false;
                    }
                }
            }

            return true;
        }
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
                        <UserChecklistListItem active={true} index={i} toDo={this.shouldBeExecuted(lists[i])} activateItem={this.activateItem.bind(this)} deactivateItem={this.deactivateItem.bind(this)} route={this.props.itemRoute} key={i} item={lists[i]}/>
                    );
                }
                else
                {
                    list.push(
                        <UserChecklistListItem active={false} index={i} toDo={this.shouldBeExecuted(lists[i])} activateItem={this.activateItem.bind(this)} deactivateItem={this.deactivateItem.bind(this)} route={this.props.itemRoute} key={i} item={lists[i]}/>
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