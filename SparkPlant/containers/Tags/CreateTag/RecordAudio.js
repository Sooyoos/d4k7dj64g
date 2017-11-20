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
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../actions';
import * as layout from "../../../assets/layout";
import ElevatedView from 'react-native-elevated-view';
import HeaderTagDetails from "../../../components/Header/HeaderTags";
import Icon from 'react-native-vector-icons/FontAwesome';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import {fullHeight} from "../../../assets/layout";
import {fullWidth} from "../../../assets/layout";

let styles = StyleSheet.create({
    header : {
        height : layout.height7,
    },
    body: {
        height : layout.height83,
        backgroundColor: '#FFFFFF',
        alignItems:'center',
        justifyContent: 'center',
    },
    actionButtonView : {
        width: layout.width16,
        height : layout.width16,
        borderRadius : layout.width8,
        backgroundColor: '#00bcd4',
        padding : 3,
        marginVertical : 10,
        marginHorizontal : 5,
        justifyContent: "center",
        alignItems : "center",
    },
    actionButtonIcon : {
        fontSize : layout.fontSize5,
        textAlign : 'center',
        color : '#ffffff',
    },
});

class RecordAudio extends Component {

    constructor(props) {
        super(props);
        this.state = {recording : false, file : null};
    }

    componentDidMount()
    {
        let filename = AudioUtils.DocumentDirectoryPath + '/sparkplant' + Date.now() + '.aac';
        this.prepareRecordingPath(filename);
    }

    prepareRecordingPath(audioPath)
    {
        AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: "Low",
            AudioEncoding: "aac",
            AudioEncodingBitRate: 32000
        });
    }

    async record()
    {
        this.setState({recording : true});

        try {
            const filePath = await AudioRecorder.startRecording();
            console.warn(filePath);
        }
        catch(error)
        {
            console.warn(error);
        }
    }

    async stop()
    {
        this.setState({recording : false});
        let mode = this.props.tags.toRecord;

        try{
            const filePath = await AudioRecorder.stopRecording();
            console.warn(filePath);

            if(mode === "place")
            {
                //this.props.goToCreateTagStep1();
                this.props.tryTagsUploadPlaceAudio(this.props.login, {
                    uri: "file://" + filePath,
                    type: "audio/aac",
                    name: filePath.substring(filePath.lastIndexOf("/"))
                });
            }
            else
            {
                //this.props.goToCreateTagStep2();
                this.props.tryTagsUploadDescriptionAudio(this.props.login, {
                    uri: "file://" + filePath,
                    type: "audio/aac",
                    name: filePath.substring(filePath.lastIndexOf("/"))
                });
            }
        }
        catch(error)
        {
            console.warn(error);
        }


        this.props.navigateBack();
    }

    render() {
        let tag = this.props.tags.creation_current;

        if(this.props.tags.loading === false)
        {
            if(this.state.recording)
            {
                return (
                    <View style={{height : fullHeight, width : fullWidth, backgroundColor : "#ffffff"}}>
                        <HeaderTagDetails {...this.props} headerTitle="Créer un tag" />
                        <View style={styles.body}>
                            <TouchableWithoutFeedback onPress={() => {this.stop()}}>
                                <ElevatedView style={styles.actionButtonView} elevation={3}>
                                    <Icon name="stop" style={styles.actionButtonIcon} />
                                </ElevatedView>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                );
            }
            else
            {
                return (
                    <View style={{height : fullHeight, width : fullWidth, backgroundColor : "#ffffff"}}>
                        <HeaderTagDetails {...this.props} headerTitle="Créer un tag" />
                        <View style={styles.body}>
                            <TouchableWithoutFeedback onPress={() => {this.record()}}>
                                <ElevatedView style={styles.actionButtonView} elevation={3}>
                                    <Icon name="microphone" style={styles.actionButtonIcon} />
                                </ElevatedView>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                );
            }
        }
        else
        {
            return(
                <View style={{height : fullHeight, width : fullWidth, backgroundColor : "#ffffff"}}>
                    <HeaderTagDetails {...this.props} headerTitle="Créer un tag" />
                    <View style={styles.body}>
                        <ActivityIndicator color="#3f51b5" size="large"/>
                    </View>
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


export default connect(mapStateToProps, mapDispatchToProps)(RecordAudio);