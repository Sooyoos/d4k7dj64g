import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActionCreators } from '../../actions';
import {fontSize2p1, width10} from "../../assets/layout";


let styles = StyleSheet.create({
    button : {
        alignItems: 'center',
        justifyContent: 'center',
        width : width10,
    },
    buttonIcon : {
        color:'#ffffff',
        fontSize: fontSize2p1,
    }
});

class HeaderButton extends Component {
    constructor(props)
    {
        super(props);
    }

    goToRoute(){
        this.props.navigation.navigate(this.props.route);
    }

    dispatchRoute()
    {
        switch(this.props.route)
        {
            case "CreateTagStep1" :
                this.props.goToCreateTagStep1();
                break;
            case "SearchTag" :
                this.props.goToSearchTags(this.props.nav);
                break;
            case "FilterTag" :
                this.props.goToFilterTags(this.props.nav);
                break;
            case "CreateNewsStep1" :
                this.props.goToCreateNewsStep1();
                break;
            case "SearchNews" :
                this.props.goToSearchNews(this.props.nav);
                break;
            case "SearchWaitingNews" :
                this.props.goToSearchWaitingNews(this.props.nav);
                break;
            default :
                break;
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.dispatchRoute.bind(this)}>
                <View style={styles.button}>
                    <Icon style={styles.buttonIcon} name={this.props.iconName} />
                </View>
            </TouchableWithoutFeedback>
        );
    }
};

function mapStateToProps(state) {
    return {
        login: state.login,
        nav : state.nav,
        tags : state.tags,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(HeaderButton);