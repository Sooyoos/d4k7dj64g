import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ElevatedView from 'react-native-elevated-view';
import Moment from "moment";
import { ActionCreators } from '../../actions';
import * as layout from "../../assets/layout";

let styles = StyleSheet.create({
    item: {
        height : layout.height15,
        width : layout.width90,
        paddingVertical : layout.height1,
        paddingHorizontal : layout.width2,
        backgroundColor : "#ffffff",
        marginVertical: layout.height2p5,
        flexDirection: 'row',
    },
    itemInfos : {
        width : layout.width63,
        height : layout.height13,
        paddingHorizontal: layout.width2,
        paddingVertical: layout.height1,
    },
    itemUser : {
        fontSize : layout.fontSize2p2,
        color : "#000000",
        fontWeight: 'bold',
    },
    itemDate : {
        fontSize : layout.fontSize1p8,
        color : "#000000",
        marginTop : layout.height2,
    },
    itemResult : {
        width : layout.width23,
        height : layout.height13,
        paddingHorizontal: layout.width2,
        paddingVertical: layout.height1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemSuccessRate : {
        fontSize : layout.fontSize4p75,
        color : "#000000",
        textAlign: 'center',
    },
});

class ChecklistHistoryItem extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            <TouchableWithoutFeedback>
                <ElevatedView style={styles.item} elevation={4}>
                    <View style={styles.itemInfos}>
                        <Text style={styles.itemUser}>
                            { this.props.item.user.firstName } { this.props.item.user.lastName }
                        </Text>
                        <Text style={styles.itemDate}>
                            { Moment(this.props.item.createdAt).format('DD/MM/YYYY à HH:mm') }
                        </Text>
                    </View>
                    <View style={styles.itemResult}>
                        <Text style={styles.itemSuccessRate}>
                            { this.props.item.successRate } %
                        </Text>
                    </View>
                </ElevatedView>
            </TouchableWithoutFeedback>
        );
    }
}

function mapStateToProps(state) {
    return {
        login: state.login,
        nav : state.nav,
        checklists : state.checklists,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ChecklistHistoryItem);