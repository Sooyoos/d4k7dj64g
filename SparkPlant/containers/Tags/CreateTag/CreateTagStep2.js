import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Picker,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    Keyboard,
    Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import ElevatedView from 'react-native-elevated-view';
import * as layout from "../../../assets/layout";
import HeaderTagDetails from "../../../components/Header/HeaderTags";
import ImagePicker from 'react-native-image-picker';
import KeyboardSpacer from 'react-native-keyboard-spacer';

let styles = StyleSheet.create({
    card : {
        height : layout.height55,
        margin : 10,
        backgroundColor : '#ffffff',
    },
    cardHeader : {
        flex : 1,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardHeaderIconView : {
        width: layout.width15,
        height : layout.width15,
        borderRadius : layout.width7p5,
        backgroundColor: '#3f51b5',
        margin : layout.width1p5,
        alignItems : "center",
        justifyContent : "center",
    },
    cardHeaderIcon : {
        fontSize : layout.fontSize5,
        textAlign : 'center',
        color : '#ffffff',
    },
    cardHeaderTitle : {
        flex : 9,
        fontSize : layout.fontSize2,
        fontWeight: 'bold',
        color : '#212121',
    },
    cardContent : {
        flex : 4,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding : 5,
    },
    textInput : {
        marginTop : 20,
        fontSize : layout.fontSize1p8
    },
    actionButtonView : {
        width: layout.width12,
        height : layout.width12,
        borderRadius : layout.width6,
        backgroundColor: '#00bcd4',
        marginVertical : 10,
        marginHorizontal : 5,
        alignItems : "center",
        justifyContent: "center",
    },
    actionButtonIcon : {
        fontSize : layout.fontSize4,
        textAlign : 'center',
        color : '#ffffff',
    },
    buttonView : {
        width: layout.width23,
        height : layout.width23,
        borderRadius : layout.width11p5,
        backgroundColor: '#00bcd4',
        marginLeft:layout.width75,
        alignItems : "center",
        justifyContent: "center",
        marginBottom: layout.height1,
    },
    buttonIcon : {
        fontSize : layout.fontSize7p5,
        textAlign : 'center',
        color : '#ffffff',
    },
    mediaList : {
        flex : 5,
        padding : layout.height1,
        flexDirection : "row",
    },
    actions : {
        flex : 1,
        flexDirection : 'row',
        padding : 20,
    },
    mediaCard : {
        height : layout.height10,
        width : layout.width25,
        marginHorizontal: layout.width2,
        marginVertical : layout.width2,
        backgroundColor : "#ffffff",
    },
    media : {
        height : layout.height10,
        width : layout.width25,
    },
    audioIcon : {
        color : "#232323",
        fontSize : layout.fontSize3p5,
        marginHorizontal: layout.width5
    }
});

class CreateTagStep2 extends Component {

    static navigationOptions = {
        drawerLabel: 'TAGS',
        drawerIcon: ({tintColor}) => (
            <Icon name='tag' style={{fontSize : 24, color : '#757575'}}/>
        ),
    };

    constructor(props) {
        super(props);
        this.state = {
            tagTitle : null,
            tagDescription : null,
            tag : {
                media : this.props.tags.creation_current.media,
            }
        };

        this.error = null;
    }

    componentWillMount()
    {
        let newState = Object.assign({}, this.state.tag, {
            media : this.props.tags.creation_current.media
        });
        this.setState({
            tagTitle : null,
            tagDescription : null,
            tag : newState,
        });
    }

    saveTitle(title)
    {
        this.props.setCurrentCreationTitle(title);
    }

    saveDescription(description)
    {
        this.props.setCurrentCreationDescription(description);
    }

    goToTakeVideo()
    {
        var options = {
            title: 'Ajouter une vidéo',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            },
            mediaType : 'video',
            takePhotoButtonTitle : "Depuis l'appareil",
            chooseFromLibraryButtonTitle : "Depuis la gallerie",
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {

            }
            else if (response.error) {

            }
            else {
                let source = { uri: response.uri, type: "video/mp4", name: response.path.substring(response.path.lastIndexOf("/") +1 ) };

                let medias = this.state.tag.media;
                medias.push(source);
                this.setState(Object.assign({}, this.state.tag, {media : medias}));
            }
        });
    }

    goToTakePicture()
    {
            var options = {
                title: 'Ajouter une image',
                storageOptions: {
                    skipBackup: true,
                    path: 'images'
                },
                mediaType : 'photo',
                takePhotoButtonTitle : "Depuis l'appareil",
                chooseFromLibraryButtonTitle : "Depuis la gallerie",
            };

            ImagePicker.showImagePicker(options, (response) => {

                if (response.didCancel) {

                }
                else if (response.error) {

                }
                else {
                    let source = { uri: response.uri, type: response.type, name: response.fileName };

                    let medias = this.state.tag.media;
                    medias.push(source);
                    this.setState(Object.assign({}, this.state.tag, {media : medias}));
                }
            });
    }

    buildMediaList()
    {
        let medias = this.state.tag.media;

        let mediaList = [];

        if(medias && medias.length > 0)
        {
            for(var i = 0; i < medias.length; i++)
            {
                if(!medias[i].data)
                {
                    mediaList.push(
                        <ElevatedView key={i} style={styles.mediaCard} elevation={4}>
                            <Image style={styles.media} source={{uri : medias[i].uri}} />
                        </ElevatedView>
                    );
                }
                else
                {
                    mediaList.push(
                        <ElevatedView key={i} style={styles.mediaCard} elevation={4}>
                            <Image style={styles.media} source={{uri : 'http://via.placeholder.com/750x500/3f51b5/ffffff?text=Video'}} />
                        </ElevatedView>
                    );
                }
            }
        }
        else
        {
            mediaList.push(
                <ElevatedView key={0} style={styles.mediaCard} elevation={4}>
                    <Image style={styles.media} source={{uri : 'http://via.placeholder.com/750x500'}} />
                </ElevatedView>
            );
        }

        return mediaList;
    }


    checkRequiredFields()
    {
        let check = true;
        let message = "";

        if(this.props.tags.creation_current.title === null || this.props.tags.creation_current.title === "")
        {
            check = false;
            message += " Titre ";
        }

        if(this.props.tags.creation_current.description === "")
        {
            check = false;
            message += " Description ";
        }

        if(!check)
        {
            this.error = "Certains champs obligatoires sont manquants (" + message + ")";
        }

        return check;
    }

    next()
    {
        let medias = this.state.tag.media;
        for(var i = 0; i < medias.length; i++)
        {
            this.props.tryTagsUploadMedia(this.props.login, medias[i]);
        }
        Keyboard.dismiss();

        if(this.checkRequiredFields() === true)
        {
            this.props.goToCreateTagStep3();
        }
        else
        {
            Alert.alert(
                'Erreur',
                this.error,
                [
                    {text: 'OK', onPress: () => {this.error = null;}},
                ],
                { cancelable: false }
            );
        }
    }

    displayAudioIcon()
    {
        if(this.props.tags.creation_current.descriptionAudio)
        {
            return(<IconFA name="volume-up" style={styles.audioIcon} />);
        }
    }

    render() {
        return (
            <View style={{flex : 1}}>
                <HeaderTagDetails {...this.props} headerTitle="Créer un tag" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <ElevatedView style={styles.card} elevation={2}>
                        <ElevatedView style={styles.cardHeader} elevation={2}>
                            <View style={styles.cardHeaderIconView}>
                                <Icon name="information-outline" style={styles.cardHeaderIcon} />
                            </View>
                            <Text style={styles.cardHeaderTitle}>
                                Informations
                            </Text>
                        </ElevatedView>
                        <View style={styles.cardContent}>
                            <TextInput style={styles.textInput} placeholder="Titre" maxLength={40} value={this.state.tagTitle} onChangeText={(value) => this.saveTitle(value)}/>
                            <TextInput style={styles.textInput} placeholder="Description" maxLength={140} value={this.state.tagDescription} onChangeText={(value) => this.saveDescription(value)}/>
                            <View style={{flexDirection : "row", alignItems : "center"}}>
                                <TouchableOpacity onPress={() => {
                                    this.props.setToRecord("description");
                                    this.props.goToRecordAudio();
                                }}>
                                    <ElevatedView style={styles.actionButtonView} elevation={3}>
                                        <Icon name="microphone" style={styles.actionButtonIcon} />
                                    </ElevatedView>
                                </TouchableOpacity>
                                { this.displayAudioIcon() }
                            </View>
                        </View>
                    </ElevatedView>
                    <ElevatedView style={styles.card} elevation={2}>
                        <ElevatedView style={styles.cardHeader} elevation={2}>
                            <View style={styles.cardHeaderIconView}>
                                <Icon name="camera" style={styles.cardHeaderIcon} />
                            </View>
                            <Text style={styles.cardHeaderTitle}>
                                Photos et Vidéos
                            </Text>
                        </ElevatedView>
                        <View style={styles.cardContent}>
                            <ScrollView style={styles.mediaList} horizontal={true} showsHorizontalScrollIndicator={false}>
                                {this.buildMediaList()}
                            </ScrollView>
                            <View style={styles.actions}>
                                <TouchableOpacity onPress={this.goToTakePicture.bind(this)}>
                                    <ElevatedView style={styles.actionButtonView} elevation={3}>
                                        <Icon name="camera" style={styles.actionButtonIcon} />
                                    </ElevatedView>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.goToTakeVideo.bind(this)}>
                                    <ElevatedView style={styles.actionButtonView} elevation={3}>
                                        <Icon name="video" style={styles.actionButtonIcon} />
                                    </ElevatedView>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ElevatedView>
                    <View style={{flex : 0.5, alignItems:'flex-end', flexDirection:'row'}}>
                        <TouchableOpacity onPress={this.next.bind(this)}>
                            <ElevatedView style={styles.buttonView} elevation={7}>
                                <Icon name="arrow-right" style={styles.buttonIcon} />
                            </ElevatedView>
                        </TouchableOpacity>
                    </View>
                    <KeyboardSpacer/>
                </ScrollView>
            </View>
        );
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


export default connect(mapStateToProps, mapDispatchToProps)(CreateTagStep2);