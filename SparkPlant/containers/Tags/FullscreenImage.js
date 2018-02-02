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
import { ActionCreators } from '../../../actions';
import * as layout from "../../../assets/layout";

let styles = StyleSheet.create({
    body : {
        width : layout.fullWidth,
        height : layout.fullHeight,
    },
    portrait : {
        width : layout.fullWidth,
        height : layout.fullHeight,
    },
    landscape : {
        width : layout.fullWidth,
        height : layout.fullHeight,
        transform : [
            { rotateY: '60deg'},
        ]
    }
});

class FullscreenImage extends Component {

    constructor(props) {
        super(props);

        Image.getSize(this.props.tags.currentFile.path, (width, height) => { this.state = { width : width, height : height }; });
    }

    render() {
        if(this.state.height > this.state.width) // portrait
        {
            return(
                <View style={styles.body}>
                    <TouchableWithoutFeedback>
                        <Image
                            style={styles.portrait}
                            source={{uri : this.props.tags.currentFile.path}} />
                    </TouchableWithoutFeedback>
                </View>
            );
        }
        else // landscape
        {
            return(
                <View style={styles.body}>
                    <TouchableWithoutFeedback>
                        <Image
                            style={styles.landscape}
                            source={{uri : this.props.tags.currentFile.path}} />
                    </TouchableWithoutFeedback>
                </View>
            );
        }
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


export default connect(mapStateToProps, mapDispatchToProps)(FullscreenImage);