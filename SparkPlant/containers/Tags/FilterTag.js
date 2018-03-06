import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    Alert,
    TextInput,
    TouchableWithoutFeedback,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActionCreators } from '../../actions';
import * as layout from "../../assets/layout";
import HeaderTags from "../../components/Header/HeaderTags";
import ElevatedView from "react-native-elevated-view";
import Panel from '../../components/Utils/Panel';
import Checkbox from '../../components/Utils/Checkbox';

let styles = StyleSheet.create({
    body: {
        height:layout.height93,
        backgroundColor : "#efefef",
        alignItems:'center',
        justifyContent: 'center',
        paddingBottom: layout.height5,
    },
    filterButton : {
        height : layout.height5,
        width : layout.width40,
        backgroundColor : "#3f51b5",
        alignItems : "center",
        justifyContent: "center",
    },
    filterButtonText : {
        fontSize : layout.fontSize2,
        color : "#ffffff",
        textAlign : "center",
    }
});

class FilterTag extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            filters : {
                status : null,
                axis : null,
                unit : null,
            },
        }
    }

    static navigationOptions = {
        title : 'TAGS',
        drawerLabel: "TAGS",
        drawerIcon: ({tintColor}) => (
            <Icon name='tag' style={{fontSize : layout.fontSize1p8, color : '#757575'}}/>
        ),
    };

    componentWillMount()
    {
        if(this.props.tags.axis === null)
        {
            this.props.tryTagAxis(this.props.login);
        }

        if(this.props.utils.units === null)
        {
            this.props.tryUnits(this.props.login);
        }
    }

    buildStatus()
    {
        return(
            <View style={{paddingHorizontal: layout.width2, paddingVertical: layout.height1}}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Text style={{color : "#212121", fontSize : layout.fontSize1p8, width : layout.width70}}>
                        En cours
                    </Text>
                    <Checkbox checked={this.props.tags.filters.status.indexOf("ongoing") !== -1} list="status" value="ongoing" do={this.props.addTagsFilter} undo={this.props.removeTagsFilter}/>
                </View>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Text style={{color : "#212121", fontSize : layout.fontSize1p8, width : layout.width70}}>
                        Fermé et résolu
                    </Text>
                    <Checkbox checked={this.props.tags.filters.status.indexOf("closed_resolved") !== -1} list="status" value="closed_resolved" do={this.props.addTagsFilter} undo={this.props.removeTagsFilter}/>
                </View>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Text style={{color : "#212121", fontSize : layout.fontSize1p8, width : layout.width70}}>
                        Fermé non résolu
                    </Text>
                    <Checkbox checked={this.props.tags.filters.status.indexOf("closed_unresolved") !== -1} list="status" value="closed_unresolved" do={this.props.addTagsFilter} undo={this.props.removeTagsFilter}/>
                </View>
            </View>
        );
    }

    buildAxis()
    {
        let axis = this.props.tags.axis;
        let list = [];

        if(axis)
        {
            for(var i = 0; i < axis.length; i++)
            {
                list.push(
                    <View key={i} style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={{color : "#212121", fontSize : layout.fontSize1p8, width : layout.width70}}>
                            {axis[i].name}
                        </Text>
                        <Checkbox checked={this.props.tags.filters.axis.indexOf(axis[i]["@id"]) !== -1} list="axis" value={axis[i]["@id"]} do={this.props.addTagsFilter} undo={this.props.removeTagsFilter}/>
                    </View>
                );
            }
        }

        return(
            <View style={{paddingHorizontal: layout.width2, paddingVertical: layout.height1}}>
                {list}
            </View>
        );
    }

    buildUnits()
    {
        let units = this.props.utils.units;
        let list = [];

        if(units)
        {
            for(var i = 0; i < units.length; i++)
            {
                list.push(
                    <View key={i} style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={{color : "#212121", fontSize : layout.fontSize1p8, width : layout.width70}}>
                            {units[i].name}
                        </Text>
                        <Checkbox checked={this.props.tags.filters.units.indexOf(units[i]["@id"]) !== -1} list="units" value={units[i]["@id"]} do={this.props.addTagsFilter} undo={this.props.removeTagsFilter}/>
                    </View>
                );
            }
        }

        return(
            <View style={{paddingHorizontal: layout.width2, paddingVertical: layout.height1}}>
                {list}
            </View>
        );
    }

    render() {
        if(this.props.tags.loading === false)
        {
            return (
                <View style={styles.login}>
                    <HeaderTags {...this.props} headerTitle="Tags"/>
                    <View style={styles.body}>
                        <ScrollView showsVerticalScrollIndicator={false} >
                            <Panel title="Avancement" content={this.buildStatus()}/>
                            <Panel title="Nature" content={this.buildAxis()}/>
                            <Panel title="Unité" content={this.buildUnits()}/>
                            <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Tags')}}>
                                <View style={styles.filterButton}>
                                    <Text style={styles.filterButtonText}>
                                        Filtrer
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </ScrollView>
                    </View>
                </View>
            );
        }
        else
        {
            return(
            <View style={styles.login}>
                <HeaderTags {...this.props} headerTitle="Tags"/>
                <ActivityIndicator color="#3f51b5" size="large"/>
            </View>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        login: state.login,
        nav : state.nav,
        tags : state.tags,
        news : state.news,
        utils : state.utils,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(FilterTag);