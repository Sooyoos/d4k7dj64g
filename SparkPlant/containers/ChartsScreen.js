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

let data = [
    [
        {
            value : 128,
            name : "J - 7"
        },

    ],
    [
        {
            value : 248,
            name : "J - 6"
        },
    ],
    [
        {
            value : 29,
            name : "J - 5"
        },
    ],
    [
        {
            value : 437,
            name : "J - 4"
        },
    ],
    [
        {
            value : 148,
            name : "J - 3"
        },
    ],
    [
        {
            value : 365,
            name : "J - 2"
        },
    ],
    [
        {
            value : 172,
            name : "J - 1"
        },
    ],
];

let options1 = {
    width: responsiveWidth(75),
    height: responsiveHeight(25),
    margin: {
        top: responsiveHeight(6),
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

let options2 = {
    width: responsiveWidth(75),
    height: responsiveHeight(25),
    margin: {
        top: responsiveHeight(6),
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
    }

    componentWillMount()
    {

    }

    render() {
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
                        <Bar data={data} options={options1} accessorKey='value'/>
                        <Text style={styles.chartTitle}>
                            Tags non résolus
                        </Text>
                        <Bar data={data} options={options2} accessorKey='value'/>
                    </View>
                </View>
            </View>
        );
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