import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Image,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../actions';
import * as layout from "../../../assets/layout";
import ElevatedView from 'react-native-elevated-view';
import HeaderTagDetails from "../../../components/Header/HeaderTags";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconA from 'react-native-vector-icons/FontAwesome';
import VideoPlayer from 'react-native-video-player';
import Moment from 'moment';

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
    slider : {
        flex :1,
        flexDirection : 'row',
    },
    sliderImage : {
        width : layout.width70,
        height: layout.height30,
        marginHorizontal: 25,
    },
    infos : {
        flex :1.5,
        flexDirection : 'column',
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
    audioIcon : {
        color : "#232323",
        fontSize : layout.fontSize3p5,
        marginHorizontal: layout.width5
    }
});

class CreateTagPreview extends Component {

    static navigationOptions = {
        drawerLabel: 'TAGS',
        drawerIcon: ({tintColor}) => (
            <IconA name='tag' style={{fontSize : 24, color : '#757575'}}/>
        ),
    };

    constructor(props) {
        super(props);
    }

    getStatusIcon() {
        let tag = this.props.tags.creation_current;

        if (tag.status == "new") {
            return 'star-o';
        }
        else if (tag.status == "ongoing") {
            return 'star-half-o';
        }
        else if (tag.status == "closed_resolved") {
            return 'star';
        }
        else if (tag.status == "closed_unresolved") {
            return 'star';
        }
    }

    create()
    {
        this.props.tryCreateTag(this.props.login, this.props.tags.creation_current);
        this.props.goToTagsPage(this.props.nav);
    }

    buildMediaList()
    {
        return(
            <Image style={styles.sliderImage} source={{uri : "http://via.placeholder.com/" + Math.round(layout.width70) + "x" + Math.round(layout.height30) + "/000000.jpg"}} />
        );
    }

    displayPlaceAudioIcon()
    {
        if(this.props.tags.creation_current.placeDetailsAudio)
        {
            return(<IconA name="volume-up" style={styles.audioIcon} />);
        }
    }

    displayDescriptionAudioIcon()
    {
        if(this.props.tags.creation_current.descriptionAudio)
        {
            return(<IconA name="volume-up" style={styles.audioIcon} />);
        }
    }

    render() {
        let tag = this.props.tags.creation_current;
        if(tag !== null)
        {
            return (
                <View style={{flex : 1, backgroundColor : "#ffffff"}}>
                    <HeaderTagDetails {...this.props} headerTitle="Créer un tag" />
                    <View style={styles.body}>
                        <ScrollView style={styles.slider} alignItems={'center'} horizontal={true} showsHorizontalScrollIndicator={false}>
                            {this.buildMediaList()}
                        </ScrollView>
                        <View style={styles.infos}>
                            <View style={styles.section}>
                                <View style={styles.sectionVisual}>
                                    <IconA name={this.getStatusIcon()} style={{fontSize:layout.fontSize3p2}} />
                                </View>
                                <View style={styles.sectionContent}>
                                    <View>
                                        <Text style={{fontSize:layout.fontSize2p2, color : '#212121'}}>
                                            { Moment().format("DD/MM/YYYY") } ouvert par { this.props.users.loggedUser.firstName } { this.props.users.loggedUser.lastName }
                                        </Text>
                                        <Text style={{fontSize:layout.fontSize2p4, color : '#212121'}}>
                                            {tag.title}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.section}>
                                <View style={styles.sectionVisual}>
                                    <Image source={{uri : tag.supervisor && tag.supervisor.avatar ? tag.supervisor.avatar.path : "http://placehold.it/200x200"}} style={{width:layout.width8, height:layout.width8, borderRadius:layout.width4}}/>
                                </View>
                                <View style={styles.sectionContent}>
                                    <View>
                                        <Text style={{fontSize:layout.fontSize2p2, color : '#757575'}}>
                                            En charge du tag
                                        </Text>
                                        <Text style={{fontSize:layout.fontSize2p4, color : '#212121'}}>
                                            {
                                                tag.supervisor ? tag.supervisor.firstName + " " + tag.supervisor.lastName : " "
                                            }
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.section}>
                                <View style={styles.sectionVisual}>
                                    <View style={styles.sectionVisualType}>
                                        <Text style={{color:'#ffffff', fontSize: layout.fontSize3p2, textAlign: 'center'}}>
                                            {
                                                tag.primaryAxis ? tag.primaryAxis.code : " "
                                            }
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.sectionContent}>
                                    <View>
                                        <Text style={{fontSize:layout.fontSize2p2, color : '#757575'}}>
                                            Nature
                                        </Text>
                                        <Text style={{fontSize:layout.fontSize2p4, color : '#212121'}}>
                                            {
                                                tag.primaryAxis ? tag.primaryAxis.code : " "
                                            }
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
                                            {
                                                tag.place ? tag.place.name : " "
                                            }
                                        </Text>
                                        { this.displayPlaceAudioIcon() }
                                    </View>
                                </View>
                            </View>
                            <View style={styles.section}>
                                <View style={styles.sectionVisual}>
                                    <Icon name="clipboard-text" style={{fontSize:layout.fontSize3p2}} />
                                </View>
                                <View style={styles.sectionContent}>
                                    <Text style={{fontSize: layout.fontSize2p2, color : '#212121'}}>
                                        {tag.description}
                                    </Text>
                                    { this.displayDescriptionAudioIcon() }
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{flex : 0.5, alignItems:'flex-end', flexDirection:'row'}}>
                        <TouchableOpacity onPress={this.create.bind(this)}>
                            <ElevatedView style={styles.buttonView} elevation={7}>
                                <Icon name="check" style={styles.buttonIcon} />
                            </ElevatedView>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        else
        {
            return (
                <View style={{flex : 1, backgroundColor : "#ffffff"}}>
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
        users : state.users,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateTagPreview);