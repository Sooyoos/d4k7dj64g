import React, { Component } from 'react';
import {
    StyleSheet,
    Picker,
    Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

let styles = StyleSheet.create({
    list : {
        width:Dimensions.get('window').width / 2,
        height:100,
    }
});

let factories = [
    {value : 1, label : "PSA Aulnay"},
    {value : 2, label : "PSA Rennes"},
    {value : 3, label : "Keroler Betton"},
    {value : 4, label : "Coralis Cesson"},
];

class LoginFactoryList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let factoryList = [];

        for(let i = 0; i < factories.length; i++)
        {
            factoryList.push(
                <Picker.Item key={i} label={factories[i].label} value={factories[i].value} />
            );
        }

        return(
            <Picker prompt='Selectionnez votre usine' style={styles.list} selectedValue={this.props.login.factory} onValueChange={(itemValue, itemIndex) => this.props.setLoginFactory(itemValue)}>
                {factoryList}
            </Picker>
        );
    }
};

function mapStateToProps(state) {
    return {
        login: state.login,
        nav : state.nav,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginFactoryList);