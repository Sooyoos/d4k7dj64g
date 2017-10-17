import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Image,
    Text,
    ActivityIndicator,
    TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import FooterButton from "../../components/Footer/FooterButton";
import HeaderTagDetails from "../../components/Header/HeaderTags";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconA from 'react-native-vector-icons/FontAwesome';
import VideoPlayer from 'react-native-video-player';
import Sound from 'react-native-sound';

let styles = StyleSheet.create({
    login: {
        flex:1,
    },
    header : {
        height : responsiveHeight(8),
    },
    body: {
        height : responsiveHeight(83),
        backgroundColor: '#FFFFFF',
        alignItems:'center',
        justifyContent: 'center',
    },
    footer: {
        height : responsiveHeight(10),
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
        paddingBottom : responsiveHeight(3),
    },
    slider : {
        flex :1,
        flexDirection : 'row',
    },
    sliderImage : {
        width : responsiveWidth(70),
        height: responsiveHeight(30),
        marginHorizontal: 25,
    },
    infos : {
        flex :1.5,
        flexDirection : 'column',
    },
    section : {
        width: responsiveWidth(80) ,
        flexDirection : 'row',
        borderTopWidth: 1,
        borderTopColor: '#bdbdbd',
        padding : 10,
    },
    sectionVisual : {
        width : responsiveWidth(15),
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionContent : {
        width : responsiveWidth(65),
    },
    sectionVisualType : {
        width: responsiveWidth(10),
        height: responsiveWidth(10),
        borderRadius: responsiveWidth(5),
        backgroundColor : '#00bcd4',
        alignItems : "center",
        justifyContent : "center",
    },
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
            <IconA name='tag' style={{fontSize : responsiveFontSize(1.8), color : '#757575'}}/>
        ),
    };

    constructor(props) {
        super(props);
    }

    getStatusIcon() {
        let tag = this.props.tags.currentTag;
        if (tag.status === "closed_resolved") {
            return <IconA name="star" style={{fontSize: responsiveFontSize(3.2), color : "#4caf50"}} />;
        }
        else if(tag.status === "new")
        {
            return <IconA name="star-o" style={{fontSize: responsiveFontSize(3.2)}} />;
        }
        else if (tag.status === "ongoing") {
            return <IconA name="star-half-o" style={{fontSize: responsiveFontSize(3.2)}} />;
        }
        else if (tag.status === "closed_unresolved") {
            return <IconA name="star" style={{fontSize: responsiveFontSize(3.2)}} />;
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
                    list.push(
                        <Image key={i} style={styles.sliderImage} source={{uri : medias[i].path}} />
                    );
                }
                else
                {
                    let thumbnail = "http://via.placeholder.com/" + Math.round(responsiveWidth(70)) + "x" + Math.round(responsiveHeight(30)) + "/000000.png";
                    console.log(thumbnail);
                    list.push(
                        <VideoPlayer
                            style={{width : responsiveWidth(70), height : responsiveHeight(30)}}
                            key={i}
                            video={{ uri: medias[i].path }}
                            videoWidth={Math.round(responsiveWidth(70))}
                            videoHeight={Math.round(responsiveHeight(30))}
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
                    <IconA name="volume-up" style={{ color : "#757575", fontSize : responsiveFontSize(2.5) }}/>
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
                    <IconA name="volume-up" style={{ color : "#757575", fontSize : responsiveFontSize(2.5) }}/>
                </TouchableWithoutFeedback>
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
                    <View style={styles.body}>
                        <ScrollView style={styles.slider} alignItems={'center'} horizontal={true} showsHorizontalScrollIndicator={false}>
                            {this.buildMediaList()}
                        </ScrollView>
                        <View style={styles.infos}>
                            <View style={styles.section}>
                                <View style={styles.sectionVisual}>
                                    {this.getStatusIcon()}
                                </View>
                                <View style={styles.sectionContent}>
                                    <View>
                                        <Text style={{fontSize:responsiveFontSize(2.2), color : '#212121'}}>
                                            #{lpad(tag["@id"].substr(tag["@id"].lastIndexOf("/") +1), 6)} ouvert par {tag.supervisor.firstName} {tag.supervisor.lastName}
                                        </Text>
                                        <Text style={{fontSize:responsiveFontSize(2.4), color : '#212121'}}>
                                            {tag.title}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.section}>
                                <View style={styles.sectionVisual}>
                                    <Image source={{uri : tag.supervisor.avatar ? tag.supervisor.avatar.path : "http://via.placeholder.com/50x50" }} style={{width:responsiveWidth(8), height:responsiveWidth(8), borderRadius:responsiveWidth(4)}}/>
                                </View>
                                <View style={styles.sectionContent}>
                                    <View>
                                        <Text style={{fontSize:responsiveFontSize(2.2), color : '#757575'}}>
                                            Responsable en charge
                                        </Text>
                                        <Text style={{fontSize:responsiveFontSize(2.4), color : '#212121'}}>
                                            {tag.supervisor.firstName} {tag.supervisor.lastName}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.section}>
                                <View style={styles.sectionVisual}>
                                    <View style={styles.sectionVisualType}>
                                        <Text style={{color:'#ffffff', fontSize: responsiveFontSize(2.8), textAlign: 'center'}}>
                                            {tag.primaryAxis.code}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.sectionContent}>
                                    <View>
                                        <Text style={{fontSize:responsiveFontSize(2.2), color : '#757575'}}>
                                            Nature
                                        </Text>
                                        <Text style={{fontSize:responsiveFontSize(2.4), color : '#212121'}}>
                                            {tag.primaryAxis.name}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.section}>
                                <View style={styles.sectionVisual}>
                                    <Icon name="map" style={{fontSize:responsiveFontSize(3.2)}} />
                                </View>
                                <View style={styles.sectionContent}>
                                    <View>
                                        <Text style={{fontSize:responsiveFontSize(2.2), color : '#757575'}}>
                                            Lieu
                                        </Text>
                                        <Text style={{fontSize:responsiveFontSize(2.4), color : '#212121'}}>
                                            {tag.place.name}
                                        </Text>
                                        {this.renderPlaceAudioIcon()}
                                    </View>
                                </View>
                            </View>
                            <View style={styles.section}>
                                <View style={styles.sectionVisual}>
                                    <Icon name="clipboard-text" style={{fontSize:responsiveFontSize(3.2)}} />
                                </View>
                                <View style={styles.sectionContent}>
                                    <Text style={{fontSize:responsiveFontSize(1.4), color : '#212121'}}>
                                        {tag.description}
                                    </Text>
                                    {this.renderDescriptionAudioIcon()}
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <FooterButton {...this.props} active={true} tag={tag} iconName="sticky-note-o" text="Contenu" route={this.props.goToTagDetails}/>
                        <FooterButton {...this.props} active={false} tag={tag} iconName="info" text="Historique" route={this.props.goToTagHistory}/>
                        <FooterButton {...this.props} active={false} tag={tag} iconName="exchange" text="Actions" route={this.props.goToTagAction}/>
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