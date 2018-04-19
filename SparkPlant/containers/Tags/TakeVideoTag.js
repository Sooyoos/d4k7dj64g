import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Text,
} from 'react-native';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import {fontSize1p8, fullHeight, fullWidth} from "../../assets/layout";

let styles = StyleSheet.create({
    login: {
        width : fullWidth,
        height : fullHeight
    },
    capture : {
        width : fullWidth,
        height : fullHeight
    }
});

export default class TakeVideoTag extends Component {

    static navigationOptions = {
        title : 'TAGS',
        drawerLabel: "TAGS",
        drawerIcon: ({tintColor}) => (
            <Icon name='tag' style={{fontSize : fontSize1p8, color : '#757575'}}/>
        ),
    };

    constructor(props) {
        super(props);
    }

    takePicture() {
        const options = {};
        this.camera.capture({metadata: options})
            .then((data) => {})
            .catch((err) => {});
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