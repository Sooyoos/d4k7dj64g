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
import ElevatedView from 'react-native-elevated-view';
import HeaderTagDetails from "../../../components/Header/HeaderTags";
import Icon from 'react-native-vector-icons/FontAwesome';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import Sound from "react-native-sound";
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
    actions : {
        flexDirection: "row",
        height : layout.width18,
        alignItems : 'center',
        justifyContent : 'center',
    }
});

class RecordAudio extends Component {

    constructor(props) {
        super(props);
        this.state = {recording : false, file : null};
    }

    componentDidMount()
    {
        let filename = AudioUtils.DocumentDirectoryPath + '/sparkplant' + Date.now() + '.aac';
        AudioRecorder.onFinished = (data) => {
            // Android callback comes in the form of a promise instead.
            if (Platform.OS === 'ios') {
                //this._finishRecording(data.status === "OK", data.audioFileURL);
                let mode = this.props.tags.toRecord;

                if(mode === "place")
                {
                    //this.props.goToCreateTagStep1();
                    this.props.tryTagsUploadPlaceAudio(this.props.login, {
                        uri: data.audioFileURL,
                        type: "audio/aac",
                        name: data.audioFileURL.substring(data.audioFileURL.lastIndexOf("/"))
                    });
                }
                else
                {
                    //this.props.goToCreateTagStep2();
                    this.props.tryTagsUploadDescriptionAudio(this.props.login, {
                        uri: data.audioFileURL,
                        type: "audio/aac",
                        name: data.audioFileURL.substring(data.audioFileURL.lastIndexOf("/"))
                    });
                }
            }
        };
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

            if(Platform.OS === 'android')
            {
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
            this.setState({ file : "file://" + filePath });
        }
        catch(error)
        {
            console.warn(error);
        }
    }

    playAudio(file)
    {
        console.log(file);
        let sound = new Sound("file://" + file, Sound.MAIN_BUNDLE, (error) => {
            if (error) {

            }

            sound.play((success) => {
                if (success) {
                    sound.release();
                } else {
                    sound.release();
                }
            });

        });
    }

    render() {
        let tag = this.props.tags.creation_current;

        console.log(this.state);

        if(this.props.tags.loading === false)
        {
            if(this.state.recording === true)
            {
                return (
                    <View style={{height : fullHeight, width : fullWidth, backgroundColor : "#ffffff"}}>
                        <HeaderTagDetails {...this.props} headerTitle="Créer un tag" />
                        <View style={styles.body}>
                            <View style={styles.actions}>
                                <TouchableWithoutFeedback onPress={() => {this.stop()}}>
                                    <ElevatedView style={styles.actionButtonView} elevation={3}>
                                        <Icon name="stop" style={styles.actionButtonIcon} />
                                    </ElevatedView>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                );
            }
            else
            {
                if(this.state.file === null)
                {
                    return (
                        <View style={{height : fullHeight, width : fullWidth, backgroundColor : "#ffffff"}}>
                            <HeaderTagDetails {...this.props} headerTitle="Créer un tag" />
                            <View style={styles.body}>
                                <View style={styles.actions}>
                                    <TouchableWithoutFeedback onPress={() => {this.record()}}>
                                        <ElevatedView style={styles.actionButtonView} elevation={3}>
                                            <Icon name="microphone" style={styles.actionButtonIcon} />
                                        </ElevatedView>
                                    </TouchableWithoutFeedback>
                                </View>
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
                                <Text style={{ fontSize:layout.fontSize2p4 }}>
                                    { this.state.file }
                                </Text>
                                <View style={styles.actions}>
                                    <TouchableWithoutFeedback onPress={() => { this.playAudio(this.state.file) }}>
                                        <ElevatedView style={styles.actionButtonView} elevation={3}>
                                            <Icon name="play" style={styles.actionButtonIcon} />
                                        </ElevatedView>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => {this.record()}}>
                                        <ElevatedView style={styles.actionButtonView} elevation={3}>
                                            <Icon name="microphone" style={styles.actionButtonIcon} />
                                        </ElevatedView>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => { this.props.navigateBack() }}>
                                        <ElevatedView style={styles.actionButtonView} elevation={3}>
                                            <Icon name="check-circle-o" style={styles.actionButtonIcon} />
                                        </ElevatedView>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                    );
                }
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