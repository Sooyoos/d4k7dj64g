import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    Text,
    Image,
    Dimensions,
    Alert,
} from 'react-native';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';

let styles = StyleSheet.create({
    login: {
        flex:1,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    img: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    capture: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 5,
        borderColor: '#FFF',
        marginBottom: 15,
    },
    cancel: {
        position: 'absolute',
        right: 20,
        top: 20,
        backgroundColor: 'transparent',
        color: '#FFF',
        fontWeight: '600',
        fontSize: 17,
    }
});

export default class TakePictureTag extends Component {

    static navigationOptions = {
        title : 'TAGS',
        drawerLabel: "TAGS",
        drawerIcon: ({tintColor}) => (
            <Icon name='tag' style={{fontSize : responsiveFontSize(1.8), color : '#757575'}}/>
        ),
    };

    constructor(props) {
        super(props);
        this.state = {
            path: null,
        };
        console.log("constructor");
    }

    takePicture() {
        this.camera.capture()
            .then((data) => {
                console.log(data);
                this.setState({ path: data.path });
            })
            .catch(err => console.error(err));
    }

    renderCamera() {
        return (
            <Camera
                ref={(cam) => {
                    this.camera = cam;
                }}
                style={styles.preview}
                aspect={Camera.constants.Aspect.fill}
                captureTarget={Camera.constants.CaptureTarget.disk}
                orientation = {Camera.constants.Orientation.portrait}
            >
                <TouchableHighlight
                    style={styles.capture}
                    onPress={this.takePicture.bind(this)}
                    underlayColor="rgba(255, 255, 255, 0.5)"
                >
                    <View />
                </TouchableHighlight>
            </Camera>
        );
    }

    renderImage() {
        return (
            <View>
                <Image
                    source={{ uri: this.state.path }}
                    style={styles.img}
                />
                <Text
                    style={styles.cancel}
                    onPress={() => this.setState({ path: null })}
                >Cancel
                </Text>
            </View>
        );
    }


    render() {
        return (
            <View style={styles.login}>
                {this.state.path ? this.renderImage() : this.renderCamera()}
            </View>
        );
    }
};