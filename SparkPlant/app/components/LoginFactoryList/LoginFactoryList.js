import React, { Component } from 'react';
import {
    StyleSheet,
    Picker,
    AsyncStorage,
} from 'react-native';

let styles = StyleSheet.create({
    list : {
        width:280,
        height:100,
    }
});

let factories = [
    "PSA Aulnay",
    "PSA Rennes",
    "Keroler Betton",
    "Coralis Cesson",
];

export default class LoginFactoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {factory : AsyncStorage.getItem('@SparkPlant:loginFactory')};
    }

    componentDidMount() {
        AsyncStorage.getItem("@SparkPlant:loginFactory").then((value) => {
            this.setState({factory: value});
        }).done();
    };

    componentDidUpdate(prevProps, prevState)
    {
       /* try{
            AsyncStorage.setItem('@SparkPlant:loginFactory', this.state.factory);
        }
        catch(error)
        {
            console.log('Could not save factory data : ' + error);
        }

        try {
            const value = AsyncStorage.getItem('@SparkPlant:loginFactory');
            if (value !== null){
                return value;
            }
        } catch (error) {
            console.log('Could not retrieve factory data : ' + error);
        }*/

    }

    render() {
        let factoryList = [];

        for(let i = 0; i < factories.length; i++)
        {
            factoryList.push(
                <Picker.Item key={i} label={factories[i]} value={factories[i]} />
            );
        }

        return(
            <Picker prompt='Select your factory' style={styles.list} selectedValue={this.state.factory} onValueChange={(itemValue, itemIndex) => this.setState({factory:itemValue})}>
                {factoryList}
            </Picker>
            );
    }
};