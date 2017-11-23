import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActionCreators } from '../actions';
import * as layout from "../assets/layout";
import HeaderTags from "../components/Header/HeaderTags";
import FooterButton from "../components/Footer/FooterButton";
import TagList from "../components/Tags/TagList";

let styles = StyleSheet.create({
    login: {
        height:layout.height7,
    },
    body: {
        height:layout.height80,
        backgroundColor : "#efefef",
        alignItems:'center',
        justifyContent: 'center',
    },
    footer: {
        height:layout.height13,
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
        paddingBottom : layout.height3,
    },
});

class TagsScreen extends Component {

    static navigationOptions = {
        title : 'TAGS',
        drawerLabel: "TAGS",
        drawerIcon: ({tintColor}) => (
            <Icon name='tag' style={{fontSize : 24, color : '#757575'}}/>
        ),
    };

    constructor(props)
    {
        super(props);
    }

    componentWillMount()
    {
        this.props.tryUserTags(this.props.login);
        this.props.tryAllTags(this.props.login);
        if(this.props.tags.filters.status.length > 0 || this.props.tags.filters.axis.length > 0 || this.props.tags.filters.units.length > 0)
        {
            this.props.filterTags();
        }
        else if(this.props.tags.filters.status.length === 0 && this.props.tags.filters.axis.length === 0 && this.props.tags.filters.units.length === 0)
        {
            this.props.resetFilterTags();
        }
    }

    render() {
        if(this.props.tags.loading === false)
        {
            if(this.props.tags.filterResults !== null)
            {
                return (
                    <View style={styles.login}>
                        <HeaderTags {...this.props} headerTitle="Mes tags"/>
                        <View style={styles.body}>
                            <TagList {...this.props} items={this.props.tags.filterResults} />
                        </View>
                        <View style={styles.footer}>
                            <FooterButton {...this.props} active={true} iconName="eye" text="Suivis" route={() => { this.props.goToTagsPage(this.props.nav)}}/>
                            <FooterButton {...this.props} active={false} iconName="tags" text="Tous" route={() => { this.props.goToTagsFull(this.props.nav)}}/>
                        </View>
                    </View>
                );
            }
            else
            {
                return (
                    <View style={styles.login}>
                        <HeaderTags {...this.props} headerTitle="Mes tags"/>
                        <View style={styles.body}>
                            <TagList {...this.props} items={this.props.tags.userTags} />
                        </View>
                        <View style={styles.footer}>
                            <FooterButton {...this.props} active={true} iconName="eye" text="Suivis" route={() => { this.props.goToTagsPage(this.props.nav)}}/>
                            <FooterButton {...this.props} active={false} iconName="tags" text="Tous" route={() => { this.props.goToTagsFull(this.props.nav) }}/>
                        </View>
                    </View>
                );
            }
        }
        else
        {
            return (
                <View style={styles.login}>
                    <HeaderTags {...this.props} headerTitle="Mes tags"/>
                    <View style={styles.body}>
                        <ActivityIndicator color="#3f51b5" size="large"/>
                    </View>
                    <View style={styles.footer}>
                        <FooterButton {...this.props} active={true} iconName="eye" text="Suivis" route={() => { this.props.goToTagsPage(this.props.nav) }}/>
                        <FooterButton {...this.props} active={false} iconName="tags" text="Tous" route={() => { this.props.goToTagsFull(this.props.nav) }}/>
                    </View>
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
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(TagsScreen);