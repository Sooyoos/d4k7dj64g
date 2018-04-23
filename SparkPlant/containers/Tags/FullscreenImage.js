import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Image,
    Text,
    TouchableWithoutFeedback,
    ActivityIndicator,
    Alert,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImageRotate from 'react-native-image-rotate';
import { ActionCreators } from '../../actions';
import * as layout from "../../assets/layout";

let styles = StyleSheet.create({
    body : {
        width : layout.fullWidth,
        height : layout.fullHeight,
    },
    portrait : {
        width : layout.fullWidth,
        height : layout.fullHeight,
    },
});

class FullscreenImage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            width : null,
            height : null,
            uri : null,
        };
    }

    componentWillMount()
    {
        Image.getSize(this.props.utils.currentImage, (width, height) => {
            if((width > height) && (width > layout.fullWidth))
            {
                ImageRotate.rotateImage(
                    this.props.utils.currentImage,
                    90,
                    (uri) => {
                        Image.getSize(uri, (width, height) => { this.setState({ uri : uri, width : width, height : height }) });
                    },
                    (error) => {

                    }
                );
            }
            else
            {
                this.setState({
                    uri : this.props.utils.currentImage,
                    width : width,
                    height : height,
                });
            }
        });
    }

    render() {
        return(
            <View style={styles.body}>
                <TouchableWithoutFeedback onPress={() => { this.props.navigateBack() }}>
                    <Image
                        style={{width : this.state.width, height : this.state.height, maxWidth: layout.fullWidth, maxHeight: layout.fullHeight}}
                        source={{uri : this.state.uri}}
                        resizeMethod="resize" onProgress={(e) => { console.warn(e.nativeEvent.loaded); if(e.nativeEvent.loaded === e.nativeEvent.total){ this.setState({loadingImage : false}) } }}
                    />
                </TouchableWithoutFeedback>
            </View>
        );
    }
};

function mapStateToProps(state) {
    return {
        login: state.login,
        nav : state.nav,
        tags : state.tags,
        utils : state.utils,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(FullscreenImage);