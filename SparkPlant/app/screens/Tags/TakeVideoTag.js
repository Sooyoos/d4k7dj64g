import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Text,
} from 'react-native';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';

let styles = StyleSheet.create({
    login: {
        flex:1,
    },
    capture : {
        flex : 1,
    }
});

export default class TakeVideoTag extends Component {

    constructor(props) {
        super(props);
    }

    takePicture() {
        const options = {};
        //options.location = ...
        this.camera.capture({metadata: options})
            .then((data) => console.log(data))
            .catch(err => console.error(err));
    }

    render() {
        return (
            <View style={styles.login}>
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}>
                    <Text style={styles.capture} onPress={this.takePicture.bind(this)}>photo</Text>
                </Camera>
            </View>
        );
    }
};