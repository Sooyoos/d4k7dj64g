import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import ElevatedView from 'react-native-elevated-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as layout from "../../assets/layout";

let styles = StyleSheet.create({
    mediaCard : {
        height : layout.height20,
        width : layout.width40,
        backgroundColor : "#aaaaaa",
        marginHorizontal: layout.width1,
    },
    image : {
        height : Math.round(layout.height20),
        width : Math.round(layout.width40),
        backgroundColor : "#aaaaaa",
    },
    buttonView : {
        flexDirection : 'row',
        height : layout.height20,
        width : layout.width40,
        backgroundColor : "rgba(0,0,0,0.8)",
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteButton : {
        height : layout.width15,
        width : layout.width15,
        borderRadius : layout.width7p5,
        backgroundColor : "#D32F2F",
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: layout.width1,
    },
    fullscreenButton : {
        height : layout.width15,
        width : layout.width15,
        borderRadius : layout.width7p5,
        backgroundColor : "#0288D1",
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: layout.width1,
    },
    buttonIcon : {
        fontSize : layout.fontSize4,
        color : "#ffffff",
        textAlign : 'center',
    }
});

class TagMedia extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.active === true)
        {
            if(this.props.media.type && this.props.media.type.indexOf("video") === -1) // image
            {
                return(
                    <ElevatedView style={styles.mediaCard} elevation={2}>
                        <TouchableWithoutFeedback onPress={() => { this.props.deactivateItem() }}>
                            <View style={styles.buttonView}>
                                <TouchableOpacity onPress={() => { this.props.removeItem(this.props.index) }}>
                                    <ElevatedView style={styles.deleteButton} elevation={2}>
                                        <Icon name="trash-o" style={styles.buttonIcon} />
                                    </ElevatedView>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.props.expandItem(this.props.media) }}>
                                    <ElevatedView style={styles.fullscreenButton} elevation={2}>
                                        <Icon name="expand" style={styles.buttonIcon} />
                                    </ElevatedView>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </ElevatedView>
                );
            }
            else
            {
                return(
                    <ElevatedView style={styles.mediaCard} elevation={2}>
                        <TouchableWithoutFeedback onPress={() => { this.props.deactivateItem() }}>
                            <View style={styles.buttonView}>
                                <TouchableOpacity onPress={() => { this.props.removeItem(this.props.index) }}>
                                    <ElevatedView style={styles.deleteButton} elevation={2}>
                                        <Icon name="trash-o" style={styles.buttonIcon} />
                                    </ElevatedView>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </ElevatedView>
                );
            }

        }
        else
        {
            if((this.props.media.originalFile && (this.props.media.originalFile.indexOf(".jpg") !== -1 || this.props.media.originalFile.indexOf(".jpeg") !== -1 || this.props.media.originalFile.indexOf(".png") !== -1)) ||(this.props.media.type && this.props.media.type.indexOf("video") === -1)) // image
            {
                return(
                    <ElevatedView style={styles.mediaCard} elevation={2}>
                        <TouchableWithoutFeedback onPress={() => { this.props.activateItem(this.props.index) }}>
                            <Image
                                style={styles.image}
                                source={{uri : this.props.media.uri}}
                                resizeMethod="resize" onProgress={(e) => { console.warn(e.nativeEvent.loaded); if(e.nativeEvent.loaded === e.nativeEvent.total){ this.setState({loadingImage : false}) } }}
                            />
                        </TouchableWithoutFeedback>
                    </ElevatedView>
                );
            }
            else // video
            {
                return(
                    <ElevatedView style={styles.mediaCard} elevation={2}>
                        <TouchableWithoutFeedback onPress={() => { this.props.activateItem(this.props.index) }}>
                            <View style={styles.buttonView}>
                                <Icon name="play-circle" style={styles.buttonIcon} />
                            </View>
                        </TouchableWithoutFeedback>
                    </ElevatedView>
                );
            }
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


export default connect(mapStateToProps, mapDispatchToProps)(TagMedia);
