import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Image,
    Text,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Modal,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import * as layout from "../../assets/layout";
import FooterButton from "../../components/Footer/FooterButton";
import HeaderTagDetails from "../../components/Header/HeaderTags";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconA from 'react-native-vector-icons/FontAwesome';
import VideoPlayer from 'react-native-video-player';
import Sound from 'react-native-sound';

let styles = StyleSheet.create({
    login: {
        width : layout.fullWidth,
        height : layout.fullHeight,
    },
    header : {
        height : layout.height7,
    },
    body: {
        minHeight : layout.height80,
        backgroundColor: '#FFFFFF',
        alignItems:'center',
        justifyContent: 'center',
    },
    footer: {
        height : layout.height13,
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
        paddingBottom : layout.height3,
    },
    slider : {
        width : layout.fullWidth,
        height : layout.height30,
        flexDirection : 'row',
    },
    sliderImage : {
        width : layout.width70,
        height: layout.height30,
        marginHorizontal: 25,
    },
    infos : {
        width : layout.fullWidth,
        height : layout.height53,
        flexDirection : 'column',
        alignItems : "center",
        justifyContent : "center",
    },
    section : {
        width: layout.width80 ,
        flexDirection : 'row',
        borderTopWidth: 1,
        borderTopColor: '#bdbdbd',
        padding : 10,
    },
    sectionVisual : {
        width : layout.width15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionContent : {
        width : layout.width65,
    },
    sectionVisualType : {
        width: layout.width10,
        height: layout.width10,
        borderRadius: layout.width5,
        backgroundColor : '#00bcd4',
        alignItems : "center",
        justifyContent : "center",
    }
});

function lpad(value, padding) {
    var zeroes = new Array(padding+1).join("0");
    return (zeroes + value).slice(-padding);
}

class TagDetails extends Component {

    static navigationOptions = {
        title : 'TAGS',
        drawerLabel: "TAGS",
        drawerIcon: ({tintColor}) => (
            <IconA name='tag' style={{fontSize : layout.fontSize1p8, color : '#757575'}}/>
        ),
    };

    constructor(props) {
        super(props);

        this.state = {
            modalVisible : false,
            currentImage : {
                uri : null,
                width : null,
                height : null,
            },
        };
    }

    getStatusIcon() {
        let tag = this.props.tags.currentTag;
        if (tag.status === "closed_resolved") {
            return <IconA name="star" style={{fontSize: layout.fontSize3p2, color : "#4caf50"}} />;
        }
        else if(tag.status === "new")
        {
            return <IconA name="star-o" style={{fontSize: layout.fontSize3p2}} />;
        }
        else if (tag.status === "ongoing") {
            return <IconA name="star-half-o" style={{fontSize: layout.fontSize3p2}} />;
        }
        else if (tag.status === "closed_unresolved") {
            return <IconA name="star" style={{fontSize: layout.fontSize3p2}} />;
        }
    }

    buildMediaList()
    {
        let medias = this.props.tags.currentTag.media;
        let list = [];

        console.log(medias);

        if(medias.length > 0)
        {
            for(var i = 0; i < medias.length; i++)
            {
                if(medias[i].filetype.indexOf("video") === -1)
                {
                    let url = medias[i].path;
                    list.push(
                        <TouchableWithoutFeedback key={i} onPress={() => { this.selectImage(url) }}>
                            <Image style={styles.sliderImage} source={{uri : url}} />
                        </TouchableWithoutFeedback>
                    );
                }
                else
                {
                    let thumbnail = "http://via.placeholder.com/" + Math.round(layout.width70) + "x" + Math.round(layout.height30) + "000000/000000.png";
                    console.log(thumbnail);
                    list.push(
                        <VideoPlayer
                            style={{width : layout.width70, height : layout.height30, marginHorizontal: 25}}
                            key={i}
                            video={{ uri: medias[i].path }}
                            videoWidth={Math.round(layout.width70)}
                            videoHeight={Math.round(layout.height30)}
                            thumbnail={{uri : thumbnail}}
                            endWithThumbnail
                        />
                    );
                }
            }
        }
        else
        {
            list.push(
                <Image key={0} style={styles.sliderImage} source={{uri : "http://via.placeholder.com/750x500"}} />
            );
        }
        return list;
    }

    playAudio(file)
    {
        console.log("play audio");
        let sound = new Sound(file, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
            }

            sound.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                    sound.release();
                } else {
                    console.log('playback failed due to audio decoding errors');
                    sound.release();
                }
            });

        });
    }

    renderPlaceAudioIcon()
    {
        if(this.props.tags.currentTag.placeDetailsAudio !== null)
        {
            return(
                <TouchableWithoutFeedback onPress={() => {this.playAudio(this.props.tags.currentTag.placeDetailsAudio.path)}}>
                    <IconA name="volume-up" style={{ color : "#757575", fontSize : layout.fontSize2p5 }}/>
                </TouchableWithoutFeedback>
            );
        }
    }

    renderDescriptionAudioIcon()
    {
        if(this.props.tags.currentTag.descriptionAudio !== null)
        {
            return(
                <TouchableWithoutFeedback onPress={() => {this.playAudio(this.props.tags.currentTag.descriptionAudio.path)}}>
                    <IconA name="volume-up" style={{ color : "#757575", fontSize : layout.fontSize2p5 }}/>
                </TouchableWithoutFeedback>
            );
        }
    }

    selectImage(url)
    {
        Image.getSize(url, (width, height) => {
            this.setState({
                currentImage : {
                    uri : url,
                    width : width,
                    height : height,
                },
                modalVisible: true,
            });
        });
    }

    displayImage()
    {
        if(this.state.currentImage.height > this.state.currentImage.width)
        {
            return(
                <Image resizeMode="cover" source={{uri : this.state.currentImage.uri}} style={{ width : layout.fullWidth, height : layout.fullHeight }} />
            );
        }
        else
        {
            return(
                <ScrollView style={{ width : this.state.currentImage.width, height : this.state.currentImage.height }} horizontal={true}>
                    <Image resizeMode="contain" source={{uri : this.state.currentImage.uri}} />
                </ScrollView>
            );
        }
    }

    render() {
        let tag = this.props.tags.currentTag;
        if(tag)
        {
            return (
                <View style={styles.login}>
                    <HeaderTagDetails {...this.props} headerTitle={"#" + lpad(tag["@id"].substr(tag["@id"].lastIndexOf("/") +1), 6)} />
                    <Modal
                        animationType="fade"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => { this.setState({modalVisible : false}) }}
                    >
                        { this.displayImage() }
                    </Modal>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.body}>
                            <ScrollView style={styles.slider} horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{alignItems : "center", justifyContent : "center"}}>
                                {this.buildMediaList()}
                            </ScrollView>
                            <View style={styles.infos}>
                                <View style={styles.section}>
                                    <View style={styles.sectionVisual}>
                                        {this.getStatusIcon()}
                                    </View>
                                    <View style={styles.sectionContent}>
                                        <View>
                                            <Text style={{fontSize:layout.fontSize2p2, color : '#212121'}}>
                                                #{lpad(tag["@id"].substr(tag["@id"].lastIndexOf("/") +1), 6)} ouvert par {tag.supervisor.firstName} {tag.supervisor.lastName}
                                            </Text>
                                            <Text style={{fontSize:layout.fontSize2p4, color : '#212121'}}>
                                                {tag.title}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.section}>
                                    <View style={styles.sectionVisual}>
                                        <Image source={{uri : tag.supervisor.avatar ? tag.supervisor.avatar.path : "http://via.placeholder.com/50x50" }} style={{width:layout.width8, height:layout.width8, borderRadius:layout.width4}}/>
                                    </View>
                                    <View style={styles.sectionContent}>
                                        <View>
                                            <Text style={{fontSize:layout.fontSize2p2, color : '#757575'}}>
                                                En charge du tag
                                            </Text>
                                            <Text style={{fontSize:layout.fontSize2p4, color : '#212121'}}>
                                                {tag.supervisor.firstName} {tag.supervisor.lastName}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.section}>
                                    <View style={styles.sectionVisual}>
                                        <View style={styles.sectionVisualType}>
                                            <Text style={{color:'#ffffff', fontSize: layout.fontSize2p8, textAlign: 'center'}}>
                                                {tag.primaryAxis.code}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.sectionContent}>
                                        <View>
                                            <Text style={{fontSize:layout.fontSize2p2, color : '#757575'}}>
                                                Nature
                                            </Text>
                                            <Text style={{fontSize:layout.fontSize2p4, color : '#212121'}}>
                                                {tag.primaryAxis.name}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.section}>
                                    <View style={styles.sectionVisual}>
                                        <Icon name="map" style={{fontSize:layout.fontSize3p2}} />
                                    </View>
                                    <View style={styles.sectionContent}>
                                        <View>
                                            <Text style={{fontSize:layout.fontSize2p2, color : '#757575'}}>
                                                Lieu
                                            </Text>
                                            <Text style={{fontSize:layout.fontSize2p4, color : '#212121'}}>
                                                {tag.place.name}
                                            </Text>
                                            {this.renderPlaceAudioIcon()}
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.section}>
                                    <View style={styles.sectionVisual}>
                                        <Icon name="clipboard-text" style={{fontSize:layout.fontSize3p2}} />
                                    </View>
                                    <View style={styles.sectionContent}>
                                        <Text style={{fontSize:layout.fontSize1p4, color : '#212121'}}>
                                            {tag.description}
                                        </Text>
                                        {this.renderDescriptionAudioIcon()}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.footer}>
                        <FooterButton {...this.props} active={true} tag={tag} iconName="sticky-note-o" text="Contenu" route={() => { this.props.goToTagDetails(this.props.nav) }}/>
                        <FooterButton {...this.props} active={false} tag={tag} iconName="info" text="Historique" route={() => { this.props.goToTagHistory(this.props.nav) }}/>
                        <FooterButton {...this.props} active={false} tag={tag} iconName="exchange" text="Actions" route={() => { this.props.goToTagAction(this.props.nav) }}/>
                    </View>
                </View>
            );
        }
        else
        {
            return (
                <View style={styles.login}>
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


export default connect(mapStateToProps, mapDispatchToProps)(TagDetails);