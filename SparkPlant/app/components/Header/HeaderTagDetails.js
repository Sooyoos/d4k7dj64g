import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

let styles = StyleSheet.create({
    header: {
        flex:0.5,
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
        padding : 10,
    },
    back : {
        flex : 1,
    },
    title : {
        color:'#ffffff',
        flex: 8,
        fontSize : 20,
    },
});

export default class HeaderTagDetails extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {goBack} = this.props.navigation;
        return (
            <View style={styles.header}>
                <TouchableWithoutFeedback onPress={() => goBack(null)}>
                    <View style={styles.back}>
                        <Icon name="arrow-left" style={{fontSize : 20, color : '#ffffff'}} />
                    </View>
                </TouchableWithoutFeedback>
                <Text style={styles.title}>
                    {this.props.headerTitle}
                </Text>
            </View>
        );
    }
};