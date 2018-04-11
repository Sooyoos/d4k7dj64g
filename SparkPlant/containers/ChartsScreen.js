import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Text,
    ScrollView,
    Picker,
    Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActionCreators } from '../actions';
import * as layout from "../assets/layout";
import Header from "../components/Header/Header";
import { Bar } from 'react-native-pathjs-charts';
import DatePicker from 'react-native-datepicker';
import ModalSelector from 'react-native-modal-selector';
import moment from 'moment';

let solvedTagOptions = {
    width: layout.width75,
    height: layout.height20,
    margin: {
        top: layout.height2,
        left: layout.width10,
        bottom: layout.height10,
        right: layout.width10,
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
    height: layout.height20,
    margin: {
        top: layout.height2,
        left: layout.width10,
        bottom: layout.height10,
        right: layout.width10
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
        height : layout.height93,
        width : layout.fullWidth,
        alignItems:'center',
        justifyContent: 'center',
    },
    chartView : {
        height : layout.height35,
        width : layout.width90,
        marginVertical : layout.height0p5,
    },
    chartFilters : {
        height : layout.height20,
        width : layout.fullWidth,
    },
    chartTitle : {
        color : "#232323",
        fontWeight: "bold",
        textAlign : "center",
        fontSize : layout.fontSize1p8,
    },
    select : {
        height : layout.height5,
        width : layout.width45,
        marginHorizontal : layout.width2p5,
        marginBottom: layout.height2,
    },
    selectDate : {
        height : layout.height7,
        width : layout.width45,
        marginHorizontal : layout.width2p5,
        marginBottom: layout.height2,
    }
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
            filters : {
                unit : null,
                place : null,
            }
        }
    }


    changeDate(date)
    {
        let endDate = moment(date, "DD/MM/YYYY").add(6,'d').format("YYYY-MM-DD HH:mm:ss");
        let beginDate = moment(date, "DD/MM/YYYY").format("YYYY-MM-DD HH:mm:ss");

        this.props.loadSolvedTags(this.props.login, beginDate, endDate, this.state.filters.place, this.state.filters.unit);
        this.props.loadUnsolvedTags(this.props.login, beginDate, endDate, this.state.filters.place, this.state.filters.unit);
        this.setState({ beginDate : beginDate, endDate : endDate });
    }

    changeFilter(key, value)
    {
        let newFilters = this.state.filters;
        newFilters[key] = value;

        this.setState({ filters : newFilters });
        this.props.loadSolvedTags(this.props.login, this.state.beginDate, this.state.endDate, newFilters.place, newFilters.unit);
        this.props.loadUnsolvedTags(this.props.login, this.state.beginDate, this.state.endDate, newFilters.place, newFilters.unit);
    }


    buildListIos(fullList, listLabel, labelField, filter) {
        let list = [];

        for(var i = 0; i < fullList.length; i++)
        {
            list.push(
                {
                    key : i,
                    label : fullList[i][labelField],
                    value : fullList[i],
                }
            );
        }

        return <ModalSelector
            data={list}
            initValue={this.state.filters[filter] ? this.state.filters[filter] : listLabel}
            style={styles.select}
            selectStyle={{ height : layout.height5, width : layout.width35, alignItems : 'center', justifyContent : 'center'}}
            onChange={(option) => { this.changeFilter(filter, option); }} />;
    }

    buildListAndroid(fullList, listLabel, labelField, filter) {
        let list = [];

        list.push(
            <Picker.Item key={-1} label={listLabel} value={null} />
        );

        for(var i = 0; i < fullList.length; i++)
        {
            list.push(
                <Picker.Item key={i} label={fullList[i][labelField]} value={fullList[i]} />
            );
        }

        return <Picker selectedValue={this.state.filters[filter] ? this.state.filters[filter] : null} style={styles.select} onValueChange={(value, index) => { this.changeFilter(filter, value); }} >
            {list}
        </Picker>
            ;
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
                        name : moment(begin,"YYYY-MM-DD HH:mm:ss").format("DD/MM"),
                    }
                ],
                [
                    {
                        value : parseFloat(sortedList[1].length),
                        name : moment(begin,"YYYY-MM-DD HH:mm:ss").add(1, 'd').format("DD/MM"),
                    }
                ],
                [
                    {
                        value : parseFloat(sortedList[2].length),
                        name : moment(begin,"YYYY-MM-DD HH:mm:ss").add(2, 'd').format("DD/MM"),
                    }
                ],
                [
                    {
                        value : parseFloat(sortedList[3].length),
                        name : moment(begin,"YYYY-MM-DD HH:mm:ss").add(3, 'd').format("DD/MM"),
                    }
                ],
                [
                    {
                        value : parseFloat(sortedList[4].length),
                        name : moment(begin,"YYYY-MM-DD HH:mm:ss").add(4, 'd').format("DD/MM"),
                    }
                ],
                [
                    {
                        value : parseFloat(sortedList[5].length),
                        name : moment(begin,"YYYY-MM-DD HH:mm:ss").add(5, 'd').format("DD/MM"),
                    }
                ],
                [
                    {
                        value : parseFloat(sortedList[6].length),
                        name : moment(begin,"YYYY-MM-DD HH:mm:ss").add(6, 'd').format("DD/MM"),
                    }
                ],
            ]
        )
    }

    componentWillMount()
    {
        this.props.tryUnits(this.props.login);
        this.props.tryPlaces(this.props.login);
        this.props.loadSolvedTags(this.props.login, this.state.beginDate, this.state.endDate);
        this.props.loadUnsolvedTags(this.props.login, this.state.beginDate, this.state.endDate);
    }

    render() {
        if(this.props.charts.loading === true || this.props.charts.solvedTags === null || this.props.charts.unsolvedTags === null || this.props.utils.places === null || this.props.utils.units === null)
        {
            return (
                <View style={styles.login}>
                    <Header props={this.props} from="Charts"/>
                    <View style={styles.body}>
                        <View style={styles.chartFilters}>
                            <ActivityIndicator color="#3f51b5" size="large"/>
                        </View>
                        <View style={styles.chartView}>
                            <Text style={styles.chartTitle}>
                                Tags résolus
                            </Text>
                            <ActivityIndicator color="#3f51b5" size="large"/>
                        </View>
                        <View style={styles.chartView}>
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
                    <Header props={this.props} from="Charts"/>
                    <View style={styles.body}>
                        <View style={styles.chartFilters}>
                            <View style={{flexDirection: 'row'}}>
                                { Platform.OS === 'ios' ? this.buildListIos(this.props.utils.places, "Lieu", "name", "place") : this.buildListAndroid(this.props.utils.places, "Lieu", "name", "place") }
                                { Platform.OS === 'ios' ? this.buildListIos(this.props.utils.units, "Unité", "name", "unit") : this.buildListAndroid(this.props.utils.units, "Unité", "name", "unit") }
                            </View>
                            <View style={{alignItems : 'center', justifyContent : 'center'}}>
                                <DatePicker
                                    style={styles.selectDate}
                                    date={moment(this.state.beginDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY")}
                                    mode="date"
                                    placeholder="Date de début"
                                    format="DD/MM/YYYY"
                                    minDate="17/12/2017"
                                    maxDate="17/12/3017"
                                    confirmBtnText="Valider"
                                    cancelBtnText="Annuler"
                                    onDateChange={(date) => {this.changeDate(date)}}
                                />
                            </View>
                        </View>
                        <View style={styles.chartView}>
                            <Text style={styles.chartTitle}>
                                Tags résolus
                            </Text>
                            <Text style={{textAlign : "center", fontSize : layout.fontSize1p8, marginVertical: layout.height5}}>
                                Pas de données disponibles
                            </Text>
                        </View>
                        <View style={styles.chartView}>
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
                    <Header props={this.props} from="Charts"/>
                    <View style={styles.body}>
                        <View style={styles.chartFilters}>
                            <View style={{flexDirection: 'row'}}>
                                { Platform.OS === 'ios' ? this.buildListIos(this.props.utils.places, "Lieu", "name", "place") : this.buildListAndroid(this.props.utils.places, "Lieu", "name", "place") }
                                { Platform.OS === 'ios' ? this.buildListIos(this.props.utils.units, "Unité", "name", "unit") : this.buildListAndroid(this.props.utils.units, "Unité", "name", "unit") }
                            </View>
                            <View style={{alignItems : 'center', justifyContent : 'center'}}>
                                <DatePicker
                                    style={styles.selectDate}
                                    date={moment(this.state.beginDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY")}
                                    mode="date"
                                    placeholder="Date de début"
                                    format="DD/MM/YYYY"
                                    minDate="17/12/2017"
                                    maxDate="17/12/3017"
                                    confirmBtnText="Valider"
                                    cancelBtnText="Annuler"
                                    onDateChange={(date) => {this.changeDate(date)}}
                                />
                            </View>
                        </View>
                        <View style={styles.chartView}>
                            <Text style={styles.chartTitle}>
                                Tags résolus
                            </Text>
                            <Bar data={this.formatTagList(this.state.beginDate, this.props.charts.solvedTags)} options={solvedTagOptions} accessorKey='value'/>
                        </View>
                        <View style={styles.chartView}>
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
                    <Header props={this.props} from="Charts"/>
                    <View style={styles.body}>
                        <View style={styles.chartFilters}>
                            <View style={{flexDirection: 'row'}}>
                                { Platform.OS === 'ios' ? this.buildListIos(this.props.utils.places, "Lieu", "name", "place") : this.buildListAndroid(this.props.utils.places, "Lieu", "name", "place") }
                                { Platform.OS === 'ios' ? this.buildListIos(this.props.utils.units, "Unité", "name", "unit") : this.buildListAndroid(this.props.utils.units, "Unité", "name", "unit") }
                            </View>
                            <View style={{alignItems : 'center', justifyContent : 'center'}}>
                                <DatePicker
                                    style={styles.selectDate}
                                    date={moment(this.state.beginDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY")}
                                    mode="date"
                                    placeholder="Date de début"
                                    format="DD/MM/YYYY"
                                    minDate="17/12/2017"
                                    maxDate="17/12/3017"
                                    confirmBtnText="Valider"
                                    cancelBtnText="Annuler"
                                    onDateChange={(date) => {this.changeDate(date)}}
                                />
                            </View>
                        </View>
                        <View style={styles.chartView}>
                            <Text style={styles.chartTitle}>
                                Tags résolus
                            </Text>
                            <Text style={{textAlign : "center", fontSize : layout.fontSize1p8, marginVertical: layout.height5}}>
                                Pas de données disponibles
                            </Text>
                        </View>
                        <View style={styles.chartView}>
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
                    <Header props={this.props} from="Charts"/>
                        <View style={styles.body}>
                            <View style={styles.chartFilters}>
                                <View style={{flexDirection: 'row'}}>
                                    { Platform.OS === 'ios' ? this.buildListIos(this.props.utils.places, "Lieu", "name", "place") : this.buildListAndroid(this.props.utils.places, "Lieu", "name", "place") }
                                    { Platform.OS === 'ios' ? this.buildListIos(this.props.utils.units, "Unité", "name", "unit") : this.buildListAndroid(this.props.utils.units, "Unité", "name", "unit") }
                                </View>
                                <View style={{alignItems : 'center', justifyContent : 'center'}}>
                                    <DatePicker
                                        style={styles.selectDate}
                                        date={moment(this.state.beginDate, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY")}
                                        mode="date"
                                        placeholder="Date de début"
                                        format="DD/MM/YYYY"
                                        minDate="17/12/2017"
                                        maxDate="17/12/3017"
                                        confirmBtnText="Valider"
                                        cancelBtnText="Annuler"
                                        onDateChange={(date) => {this.changeDate(date)}}
                                    />
                                </View>
                            </View>
                            <View style={styles.chartView}>
                                <Text style={styles.chartTitle}>
                                    Tags résolus
                                </Text>
                                <Bar data={this.formatTagList(this.state.beginDate, this.props.charts.solvedTags)} options={solvedTagOptions} accessorKey='value'/>
                            </View>
                            <View style={styles.chartView}>
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
        utils : state.utils,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ChartsScreen);