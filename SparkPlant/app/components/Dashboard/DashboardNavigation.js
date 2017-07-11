import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

let styles = StyleSheet.create({
    dashboardNav: {
        flex:5,
        width:Dimensions.get('window').width,
        alignItems:'center',
    },
    dashboardNavSection: {
        width:Dimensions.get('window').width,
        flex:5,
        alignItems: 'center',
        flexDirection: 'row',
    },
    dashboardNavIcon : {
        textAlign : 'center',
        width:Dimensions.get('window').width / 2,
        color : '#3f51b5',
        fontSize : 60,
    },
    dashboardNavLabel : {
        textAlign : 'center',
        width:Dimensions.get('window').width / 2,
        color : '#000000',
        fontSize : 20,
    }
});

export default class DashboardNavigation extends Component {

    constructor(props) {
        super(props);
    }

    navigateToTags()
    {
        this.props.navigation.navigate('Tags');
    }

    navigateToChecklist()
    {
        this.props.navigation.navigate('Checklist');
    }

    navigateToNews()
    {
        this.props.navigation.navigate('News');
    }

    navigateToAnalytics()
    {
        this.props.navigation.navigate('Analytics');
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