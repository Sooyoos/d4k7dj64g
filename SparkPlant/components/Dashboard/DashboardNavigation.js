import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActionCreators } from '../../actions';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

let styles = StyleSheet.create({
    dashboardNav: {
        flex:5,
        width:responsiveWidth(100),
        alignItems:'center',
    },
    dashboardNavSection: {
        width:responsiveWidth(100),
        flex:5,
        alignItems: 'center',
        flexDirection: 'row',
    },
    dashboardNavIcon : {
        textAlign : 'center',
        width:responsiveWidth(50),
        color : '#3f51b5',
        fontSize : responsiveFontSize(8),
    },
    dashboardNavLabel : {
        textAlign : 'center',
        width:responsiveWidth(50),
        color : '#000000',
        fontSize : responsiveFontSize(2),
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
                    <TouchableWithoutFeedback onPress={this.navigateToTags.bind(this)}>
                        <View>
                            <Icon style={styles.dashboardNavIcon} name="tag"/>
                            <Text style={styles.dashboardNavLabel}>
                                Tags
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.navigateToChecklist.bind(this)}>
                        <View>
                            <Icon style={styles.dashboardNavIcon} name="check-square-o"/>
                            <Text style={styles.dashboardNavLabel}>
                                Checklists
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.dashboardNavSection}>
                    <TouchableWithoutFeedback onPress={this.navigateToNews.bind(this)}>
                        <View>
                            <Icon style={styles.dashboardNavIcon} name="newspaper-o"/>
                            <Text style={styles.dashboardNavLabel}>
                                News
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.navigateToAnalytics.bind(this)}>
                        <View>
                            <Icon style={styles.dashboardNavIcon} name="bar-chart"/>
                            <Text style={styles.dashboardNavLabel}>
                                Analytics
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
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