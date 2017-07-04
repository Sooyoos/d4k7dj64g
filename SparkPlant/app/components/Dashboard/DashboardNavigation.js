import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

let styles = StyleSheet.create({
    dashboardNav: {
        flex:5,
        width:420,
        alignItems:'center',
    },
    dashboardNavSection: {
        width:420,
        flex:5,
        alignItems: 'center',
        flexDirection: 'row',
    },
    dashboardNavIcon : {
        textAlign : 'center',
        width:210,
        color : '#3f51b5',
        fontSize : 60,
    },
    dashboardNavLabel : {
        textAlign : 'center',
        width:210,
        color : '#000000',
        fontSize : 20,
    }
});

export default class DashboardNavigation extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.dashboardNav}>
                <View style={styles.dashboardNavSection}>
                    <TouchableWithoutFeedback>
                        <View>
                            <Icon style={styles.dashboardNavIcon} name="tag"/>
                            <Text style={styles.dashboardNavLabel}>
                                Tags
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <View>
                            <Icon style={styles.dashboardNavIcon} name="check-square-o"/>
                            <Text style={styles.dashboardNavLabel}>
                                Checklists
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.dashboardNavSection}>
                    <TouchableWithoutFeedback>
                        <View>
                            <Icon style={styles.dashboardNavIcon} name="newspaper-o"/>
                            <Text style={styles.dashboardNavLabel}>
                                News
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
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