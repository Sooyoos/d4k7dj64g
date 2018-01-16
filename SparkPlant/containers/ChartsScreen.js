import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Text,
    ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActionCreators } from '../actions';
import * as layout from "../assets/layout";
import Header from "../components/Header/Header";
import { Bar } from 'react-native-pathjs-charts';
import moment from 'moment';
import {height83} from "../assets/layout";

let solvedTagOptions = {
    width: layout.width75,
    height: layout.height19,
    margin: {
        top: layout.height8,
        left: layout.width6,
        bottom: layout.height6,
        right: layout.width6,
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
            fontSize: layout.fontSize1p5,
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
            fontSize: layout.fontSize1p5,
            fontWeight: true,
            fill: '#34495E',
        }
    }
};

let unsolvedTagOptions = {
    width: layout.width75,
    height: layout.height19,
    margin: {
        top: layout.height8,
        left: layout.width6,
        bottom: layout.height6,
        right: layout.width6
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
            fontSize: layout.fontSize1p5,
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
            fontSize: layout.fontSize1p5,
            fontWeight: true,
            fill: '#34495E',
        }
    }
};

let styles = StyleSheet.create({
    login: {
        width : layout.fullWidth,
        height : layout.fullHeight
    },
    body: {
        backgroundColor: '#FFFFFF',
        alignItems:'center',
        justifyContent: 'center',
    },
    title : {
        color : "#232323",
        fontWeight: "bold",
        textAlign : "center",
        fontSize : layout.fontSize2p2,
    },
    chartView : {
        paddingVertical : layout.height2,
        paddingHorizontal: layout.width5,
    },
    chartTitle : {
        color : "#232323",
        fontWeight: "bold",
        textAlign : "center",
        fontSize : layout.fontSize1p8,
    },
});

class ChartsScreen extends Component {

    static navigationOptions = {
        title : 'ANALYTICS',
        drawerLabel: "ANALYTICS",
        drawerIcon: ({tintColor}) => (
            <Icon name='bar-chart' style={{fontSize : 24, color : '#757575'}}/>
        ),
    };

    constructor(props)
    {
        super(props);
        this.state = {
            beginDate : moment().subtract(6,'d').format("YYYY-MM-DD HH:mm:ss"),
            endDate : moment().format("YYYY-MM-DD HH:mm:ss"),
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
                        value : parseFloat(sortedList[0].length),
                        name : "J - 6",
                    }
                ],
                [
                    {
                        value : parseFloat(sortedList[1].length),
                        name : "J - 5",
                    }
                ],
                [
                    {
                        value : parseFloat(sortedList[2].length),
                        name : "J - 4",
                    }
                ],
                [
                    {
                        value : parseFloat(sortedList[3].length),
                        name : "J - 3",
                    }
                ],
                [
                    {
                        value : parseFloat(sortedList[4].length),
                        name : "J - 2",
                    }
                ],
                [
                    {
                        value : parseFloat(sortedList[5].length),
                        name : "J - 1",
                    }
                ],
                [
                    {
                        value : parseFloat(sortedList[6].length),
                        name : "J",
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
                        <View style={{height : layout.height8, width : layout.fullWidth}}>
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
        else if(this.props.charts.loading === false && this.props.charts.solvedTags.length === 0 && this.props.charts.unsolvedTags.length  === 0)
        {
            return (
                <View style={styles.login}>
                    <Header props={this.props} />
                    <View style={styles.body}>
                        <View style={{height : layout.height8, width : layout.fullWidth}}>
                            <Text style={styles.title}>
                                Activité des tags sur les 7 derniers jours
                            </Text>
                        </View>
                        <View style={styles.chartView}>
                            <Text style={styles.chartTitle}>
                                Tags résolus
                            </Text>
                            <Text style={{textAlign : "center", fontSize : layout.fontSize1p8, marginVertical: layout.height5}}>
                                Pas de données disponibles
                            </Text>
                            <Text style={styles.chartTitle}>
                                Tags non résolus
                            </Text>
                            <Text style={{textAlign : "center", fontSize : layout.fontSize1p8, marginVertical: layout.height5}}>
                                Pas de données disponibles
                            </Text>
                        </View>
                    </View>
                </View>
            );
        }
        else if(this.props.charts.loading === false && this.props.charts.solvedTags.length !== 0 && this.props.charts.unsolvedTags.length  === 0)
        {
            return (
                <View style={styles.login}>
                    <Header props={this.props} />
                    <View style={styles.body}>
                        <View style={{height : layout.height8, width : layout.fullWidth}}>
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
                            <Text style={{textAlign : "center", fontSize : layout.fontSize1p8, marginVertical: layout.height5}}>
                                Pas de données disponibles
                            </Text>
                        </View>
                    </View>
                </View>
            );
        }
        else if(this.props.charts.loading === false && this.props.charts.solvedTags.length === 0 && this.props.charts.unsolvedTags.length !== 0)
        {
            return (
                <View style={styles.login}>
                    <Header props={this.props} />
                    <View style={styles.body}>
                        <View style={{height : layout.height8, width : layout.fullWidth}}>
                            <Text style={styles.title}>
                                Activité des tags sur les 7 derniers jours
                            </Text>
                        </View>
                        <View style={styles.chartView}>
                            <Text style={styles.chartTitle}>
                                Tags résolus
                            </Text>
                            <Text style={{textAlign : "center", fontSize : layout.fontSize1p8, marginVertical: layout.height5}}>
                                Pas de données disponibles
                            </Text>
                            <Text style={styles.chartTitle}>
                                Tags non résolus
                            </Text>
                            <Bar data={this.formatTagList(this.state.beginDate, this.props.charts.unsolvedTags)} options={unsolvedTagOptions} accessorKey='value'/>
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
                            <View style={{height : layout.height8, width : layout.fullWidth}}>
                                <Text style={styles.title}>
                                    Activité des tags sur les 7 derniers jours
                                </Text>
                            </View>
                            <ScrollView showsVerticalScrollIndicator={false} style={{height : layout.height82, width : layout.fullWidth}}>
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
                            </ScrollView>
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