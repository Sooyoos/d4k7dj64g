import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import HeaderTags from "../../components/Header/HeaderTags";
import FooterButton from "../../components/Footer/FooterButton";
import TagList from "../../components/Tags/TagList";

let styles = StyleSheet.create({
    login: {
        flex:1,
    },
    header : {
        height : responsiveHeight(7),
    },
    body: {
        height : responsiveHeight(83),
        backgroundColor : "#efefef",
        alignItems:'center',
        justifyContent: 'center',
    },
    footer: {
        height : responsiveHeight(10),
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
        paddingBottom : responsiveHeight(3),
    },
});

class TagsFull extends Component {

    static navigationOptions = {
        title : 'TAGS',
        drawerLabel: "TAGS",
        drawerIcon: ({tintColor}) => (
            <Icon name='tag' style={{fontSize : responsiveFontSize(1.8), color : '#757575'}}/>
        ),
    };

    constructor(props) {
        super(props);
    }

    componentWillMount()
    {
        this.props.tryAllTags(this.props.login);
        if(this.props.tags.filters.status.length > 0 || this.props.tags.filters.axis.length > 0 || this.props.tags.filters.units.length > 0)
        {
            this.props.filterFullTags();
        }
    }

    render() {
        if(this.props.tags.loading === false)
        {
            if(this.props.tags.filterFullResults !== null)
            {
                return (
                    <View style={styles.login}>
                        <HeaderTags {...this.props} style={styles.header} headerTitle="Tous les tags"/>
                        <View style={styles.body}>
                            <TagList {...this.props} items={this.props.tags.filterFullResults} />
                        </View>
                        <View style={styles.footer}>
                            <FooterButton {...this.props} active={false} iconName="eye" text="Suivis" route={this.props.goToTagsPage}/>
                            <FooterButton {...this.props} active={true} iconName="tags" text="Tous" route={this.props.goToTagsFull}/>
                        </View>
                    </View>
                );
            }
            else
            {
                return (
                    <View style={styles.login}>
                        <HeaderTags {...this.props} style={styles.header} headerTitle="Tous les tags"/>
                        <View style={styles.body}>
                            <TagList {...this.props} items={this.props.tags.allTags} />
                        </View>
                        <View style={styles.footer}>
                            <FooterButton {...this.props} active={false} iconName="eye" text="Suivis" route={this.props.goToTagsPage}/>
                            <FooterButton {...this.props} active={true} iconName="tags" text="Tous" route={this.props.goToTagsFull}/>
                        </View>
                    </View>
                );
            }
        }
        else
        {
            return (
                <View style={styles.login}>
                    <HeaderTags {...this.props} style={styles.header} headerTitle="Tous les tags"/>
                    <View style={styles.body}>
                        <ActivityIndicator color="#3f51b5" size="large"/>
                    </View>
                    <View style={styles.footer}>
                        <FooterButton {...this.props} active={false} iconName="eye" text="Suivis" route={this.props.goToTagsPage}/>
                        <FooterButton {...this.props} active={true} iconName="tags" text="Tous" route={this.props.goToTagsFull}/>
                    </View>
                </View>
            );
        }

    }
};

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


export default connect(mapStateToProps, mapDispatchToProps)(TagsFull);