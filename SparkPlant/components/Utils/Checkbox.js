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
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import ElevatedView from "react-native-elevated-view";

let styles = StyleSheet.create({
    bodyChecked : {
        backgroundColor : "#3f51b5",
        height : responsiveHeight(4),
        width : responsiveHeight(4),
        borderRadius : responsiveHeight(0.2),
        marginVertical: responsiveHeight(1),
        marginHorizontal: responsiveWidth(1),
        justifyContent: "center",
    },
    bodyUnchecked : {
        backgroundColor : "#ffffff",
        height : responsiveHeight(4),
        width : responsiveHeight(4),
        borderRadius : responsiveHeight(0.2),
        borderWidth: responsiveHeight(0.4),
        borderColor : "#3f51b5",
        marginVertical: responsiveHeight(1),
        marginHorizontal: responsiveWidth(1),
    },
    icon : {
        color : "#ffffff",
        fontSize : responsiveFontSize(2.5),
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