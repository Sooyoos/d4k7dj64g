import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActionCreators } from '../../actions';
import * as layout from "../../assets/layout";
import ElevatedView from "react-native-elevated-view";

let styles = StyleSheet.create({
    panel : {
        backgroundColor : "#ffffff",
        marginVertical: layout.height0p5,
    },
    header: {
        height:layout.height7,
        width:layout.width90,
        paddingVertical : layout.height1,
        paddingHorizontal : layout.width2,
        backgroundColor : "#ffffff",
        flexDirection: "row",
    },
    body: {
        width:layout.width90,
        backgroundColor : "#ffffff",
    },
    title : {
        width : layout.width78,
        color : "#212121",
        fontSize : layout.fontSize2p2,
    },
    icon : {
        width : layout.width8,
        color : "#212121",
        fontSize : layout.fontSize2p5,
    }
});

class Panel extends Component {
    constructor(props)
    {
        super(props);
        this.state = {open : false};
    }

    open()
    {
        this.setState({open : true});
    }

    close()
    {
        this.setState({open : false});
    }

    render() {
        if(this.state.open === false)
        {
            return(
                <ElevatedView style={styles.panel} elevation={2}>
                    <ElevatedView style={styles.header} elevation={4}>
                        <Text style={styles.title}>
                            {this.props.title}
                        </Text>
                        <TouchableWithoutFeedback onPress={this.open.bind(this)}>
                            <Icon name="caret-down" style={styles.icon}/>
                        </TouchableWithoutFeedback>
                    </ElevatedView>
                </ElevatedView>
            );
        }
        else
        {
            return(
                <ElevatedView style={styles.panel} elevation={2}>
                    <ElevatedView style={styles.header} elevation={4}>
                        <Text style={styles.title}>
                            {this.props.title}
                        </Text>
                        <TouchableWithoutFeedback onPress={this.close.bind(this)}>
                            <Icon name="caret-up" style={styles.icon}/>
                        </TouchableWithoutFeedback>
                    </ElevatedView>
                    <View style={styles.body}>
                        {this.props.content}
                    </View>
                </ElevatedView>
            );
        }
    }
};

function mapStateToProps(state) {
    return {
        login: state.login,
        nav : state.nav,
        tags : state.tags,
        news : state.news,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Panel);