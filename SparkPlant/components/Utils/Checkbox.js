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
    bodyChecked : {
        backgroundColor : "#3f51b5",
        height : layout.height4,
        width : layout.height4,
        marginVertical: layout.height1,
        marginHorizontal: layout.width1,
        justifyContent: "center",
    },
    bodyUnchecked : {
        backgroundColor : "#ffffff",
        height : layout.height4,
        width : layout.height4,
        borderWidth: layout.height0p4,
        borderColor : "#3f51b5",
        marginVertical: layout.height1,
        marginHorizontal: layout.width1,
        justifyContent: "center",
    },
    icon : {
        color : "#ffffff",
        fontSize : layout.fontSize2p5,
        textAlign : "center",
    }

});

class Checkbox extends Component {
    constructor(props)
    {
        super(props);
        if(this.props.checked === true)
        {
            this.state = {checked : true};
        }
        else
        {
            this.state = {checked : false};
        }
    }

    check()
    {
        this.setState({checked : true});
        this.props.do(this.props.list, this.props.value);
    }

    uncheck()
    {
        this.setState({checked : false});
        this.props.undo(this.props.list, this.props.value);
    }

    render() {
        if(this.state.checked === false)
        {
            return(
                <TouchableWithoutFeedback onPress={this.check.bind(this)}>
                    <View style={styles.bodyUnchecked}>
                        <Icon name="square" style={styles.icon} />
                    </View>
                </TouchableWithoutFeedback>
            );
        }
        else
        {
            return(
                <TouchableWithoutFeedback onPress={this.uncheck.bind(this)}>
                    <View style={styles.bodyChecked}>
                        <Icon name="check" style={styles.icon} />
                    </View>
                </TouchableWithoutFeedback>
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


export default connect(mapStateToProps, mapDispatchToProps)(Checkbox);