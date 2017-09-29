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
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Header from "../components/Header/Header";
import { Bar } from 'react-native-pathjs-charts';
import moment from 'moment';

let solvedTagOptions = {
    width: responsiveWidth(75),
    height: responsiveHeight(25),
    margin: {
        top: responsiveHeight(8),
        left: responsiveWidth(6),
        bottom: responsiveHeight(6),
        right: responsiveWidth(6)
    },
    color: '#2980B9',
    gutter: 20,
    animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
    },
    axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        label: {
            fontFamily: 'Arial',
            fontSize: responsiveFontSize(1.5),
            fontWeight: true,
            fill: '#34495E',
        }
    },
    axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        label: {
            fontFamily: 'Arial',
            fontSize: responsiveFontSize(1.5),
            fontWeight: true,
            fill: '#34495E',
        }
    }
};

let unsolvedTagOptions = {
    width: responsiveWidth(75),
    height: responsiveHeight(25),
    margin: {
        top: responsiveHeight(8),
        left: responsiveWidth(6),
        bottom: responsiveHeight(6),
        right: responsiveWidth(6)
    },
    color: '#bc294e',
    gutter: 20,
    animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
    },
    axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        label: {
            fontFamily: 'Arial',
            fontSize: responsiveFontSize(1.5),
            fontWeight: true,
            fill: '#34495E',
        }
    },
    axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        label: {
            fontFamily: 'Arial',
            fontSize: responsiveFontSize(1.5),
            fontWeight: true,
            fill: '#34495E',
        }
    }
};

let styles = StyleSheet.create({
    login: {
        flex:1,
    },
    body: {
        flex:8.4,
        backgroundColor: '#FFFFFF',
        alignItems:'center',
        justifyContent: 'center',
    },
    title : {
        color : "#232323",
        fontWeight: "bold",
        textAlign : "center",
        fontSize : responsiveFontSize(2.2),
    },
    chartView : {
        height : responsiveHeight(82),
        width : responsiveWidth(100),
        paddingHorizontal: responsiveWidth(5),
    },
    chartTitle : {
        color : "#232323",
        fontWeight: "bold",
        textAlign : "center",
        fontSize : responsiveFontSize(1.8),
    },
});

class ChartsScreen extends Component {

    static navigationOptions = {
        title : 'ANALYTICS',
        drawerLabel: "ANALYTICS",
        drawerIcon: ({tintColor}) => (
            <Icon name='bar-chart' style={{fontSize : responsiveFontSize(1.8), color : '#757575'}}/>
        ),
    };

    constructor(props)
    {
        super(props);
        this.state = {
            beginDate : moment().subtract(8,'d').format("YYYY-MM-DD HH:mm:ss"),
            endDate : moment().subtract(1,'d').format("YYYY-MM-DD HH:mm:ss"),
        }
    }

    formatTagList(begin, list)
    {
        let sortedList = [];

        for(var i = 0; i < 7; i++)
        {
            let beginDate = moment(begin,"YYYY-MM-DD HH:mm:ss");
            let date = beginDate.add(i, 'd').format("DD/MM/YYYY");
            sortedList[i] = [];

            for(var j = 0; j < list.length; j++)
            {
                let tagDate = moment(list[j].updatedAt, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY");

                if(date === tagDate)
                {
                    sortedList[i].push(list[j]);
                }
            }
        }

        return(
            [
                [
                    {
                        value : sortedList[0].length,
                        name : "J - 7",
                    }
                ],
                [
                    {
                        value : sortedList[1].length,
                        name : "J - 6",
                    }
                ],
                [
                    {
                        value : sortedList[2].length,
                        name : "J - 5",
                    }
                ],
                [
                    {
                        value : sortedList[3].length,
                        name : "J - 4",
                    }
                ],
                [
                    {
                        value : sortedList[4].length,
                        name : "J - 3",
                    }
                ],
                [
                    {
                        value : sortedList[5].length,
                        name : "J - 2",
                    }
                ],
                [
                    {
                        value : sortedList[6].length,
                        name : "J - 1",
                    }
                ],
            ]
        )
    }

    componentWillMount()
    {
        this.props.loadSolvedTags(this.props.login, this.state.beginDate, this.state.endDate);
        this.props.loadUnsolvedTags(this.props.login, this.state.beginDate, this.state.endDate);
    }

    render() {

        if(this.props.charts.loading === true || this.props.charts.solvedTags === null || this.props.charts.unsolvedTags === null)
        {
            return (
                <View style={styles.login}>
                    <Header props={this.props} />
                    <View style={styles.body}>
                        <View style={{height : responsiveHeight(8), width : responsiveWidth(100)}}>
                            <Text style={styles.title}>
                                Activité des tags sur les 7 derniers jours
                            </Text>
                        </View>
                        <View style={styles.chartView}>
                            <Text style={styles.chartTitle}>
                                Tags résolus
                            </Text>
                            <ActivityIndicator color="#3f51b5" size="large"/>
                            <Text style={styles.chartTitle}>
                                Tags non résolus
                            </Text>
                            <ActivityIndicator color="#3f51b5" size="large"/>
                        </View>
                    </View>
                </View>
            );
        }
        else
        {
            return (
                <View style={styles.login}>
                    <Header props={this.props} />
                    <View style={styles.body}>
                        <View style={{height : responsiveHeight(8), width : responsiveWidth(100)}}>
                            <Text style={styles.title}>
                                Activité des tags sur les 7 derniers jours
                            </Text>
                        </View>
                        <View style={styles.chartView}>
                            <Text style={styles.chartTitle}>
                                Tags résolus
                            </Text>
                            <Bar data={this.formatTagList(this.state.beginDate, this.props.charts.solvedTags)} options={solvedTagOptions} accessorKey='value'/>
                            <Text style={styles.chartTitle}>
                                Tags non résolus
                            </Text>
                            <Bar data={this.formatTagList(this.state.beginDate, this.props.charts.unsolvedTags)} options={unsolvedTagOptions} accessorKey='value'/>
                        </View>
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
        charts : state.charts,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ChartsScreen);