import React, { Component } from 'react';
import {
    View,
    AsyncStorage,
    StyleSheet,
} from 'react-native';
import FooterButton from "../FooterButton/FooterButton";

let styles = StyleSheet.create({
    footer: {
        flex:0.1,
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
    },
});

export default class Footer extends Component {
    constructor(props)
    {
        super(props);
        this.state = {currentPage : 'Login'};
    }

    componentDidMount()
    {
        AsyncStorage.getItem("@SparkPlant:currentPage").then(currentPage => {
                this.setState({
                    currentPage:currentPage
                });
            }
        );
    }

    render() {
        let currentPage = this.state.currentPage;

        if(currentPage != 'Login')
        {
            return (
                <View style={styles.footer}>
                    <FooterButton route="Dashboard" iconName="home"/>
                    <FooterButton route="Tags" iconName="tag"/>
                    <FooterButton route="Checklists" iconName="check-square-o"/>
                    <FooterButton route="News" iconName="newspaper-o"/>
                </View>
            );
        }
        else
        {
            return (
                <View style={styles.footer}>

                </View>
            );
        }
    }
};