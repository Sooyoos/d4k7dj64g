import React, { Component} from 'react';
import {
    AsyncStorage,
} from 'react-native';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';

export default class SparkPlant extends Component {

    constructor(props)
    {
        super(props);
        this.state = ({currentPage : 'Login'});
    }

    componentDidMount(){
        AsyncStorage.getItem("@SparkPlant:currentPage").then(currentPage => {
                this.setState({
                    currentPage: currentPage
                });
            }
        );
    }

    componentDidUpdate(){
        AsyncStorage.getItem("@SparkPlant:currentPage").then(currentPage => {
                this.setState({
                    currentPage: currentPage
                });
            }
        );
    }

    render() {
        currentPage = this.state.currentPage;
        if(currentPage == 'Login')
        {
            return (
                <Login />
            );
        }
        else if(currentPage == 'Dashboard')
        {
            return (
                <Dashboard />
            );
        }
        else
        {
            return (
                <Login />
            );
        }
    }
}