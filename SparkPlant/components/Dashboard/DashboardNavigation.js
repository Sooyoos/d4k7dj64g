import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActionCreators } from '../../actions';
import * as layout from "../../assets/layout";
import { baseUrl } from "../../actions/types";

let styles = StyleSheet.create({
    dashboardNav: {
        height:layout.height46p5,
        width:layout.fullWidth,
        alignItems:'center',
    },
    dashboardNavSection: {
        width:layout.fullWidth,
        height:layout.height23p25,
        alignItems: 'center',
        flexDirection: 'row',
    },
    dashboardNavIcon : {
        width:layout.height12,
        height:layout.height12,
    },
    dashboardNavLabel : {
        textAlign : 'center',
        width:layout.width50,
        color : '#000000',
        fontSize : layout.fontSize2,
    }
});

class DashboardNavigation extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount()
    {

    }

    navigateToTags()
    {
        this.props.goToTagsPage(this.props.nav);
    }

    navigateToChecklist()
    {
        this.props.goToChecklistPage(this.props.nav);
    }

    navigateToNews()
    {
        this.props.goToNewsPage(this.props.nav);
    }

    navigateToAnalytics()
    {
        this.props.navigation.navigate('Charts');
    }

    render() {
        return (
            <View style={styles.dashboardNav}>
                <View style={styles.dashboardNavSection}>
                    <TouchableOpacity onPress={this.navigateToTags.bind(this)}>
                        <View style={{alignItems : 'center'}}>
                            <Image
                                style={styles.dashboardNavIcon}
                                resizeMode="contain"
                                source={{uri : baseUrl + "/img/" + "icon-tags.png"}}
                                cache="force-cache"
                            />
                            <Text style={styles.dashboardNavLabel}>
                                Tags
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.navigateToChecklist.bind(this)}>
                        <View style={{alignItems : 'center'}}>
                            <Image
                                style={styles.dashboardNavIcon}
                                resizeMode="contain"
                                source={{uri : baseUrl + "/img/" + "icon-checklists.png"}}
                                cache="force-cache"
                            />
                            <Text style={styles.dashboardNavLabel}>
                                Checklists
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.dashboardNavSection}>
                    <TouchableOpacity onPress={this.navigateToNews.bind(this)}>
                        <View style={{alignItems : 'center'}}>
                            <Image
                                style={styles.dashboardNavIcon}
                                resizeMode="contain"
                                source={{uri : baseUrl + "/img/" + "icon-news.png"}}
                                cache="force-cache"
                            />
                            <Text style={styles.dashboardNavLabel}>
                                News
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.navigateToAnalytics.bind(this)}>
                        <View style={{alignItems : 'center'}}>
                            <Image
                                style={styles.dashboardNavIcon}
                                resizeMode="contain"
                                source={{ uri : baseUrl + "/img/" + "icon-analytics.png"}}
                                cache="force-cache"
                            />
                            <Text style={styles.dashboardNavLabel}>
                                Analytics
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
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


export default connect(mapStateToProps, mapDispatchToProps)(DashboardNavigation);