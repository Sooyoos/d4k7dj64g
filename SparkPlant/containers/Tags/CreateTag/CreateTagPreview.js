import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Image,
    Text,
    TouchableWithoutFeedback,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../actions';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import ElevatedView from 'react-native-elevated-view';
import HeaderTagDetails from "../../../components/Header/HeaderTags";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import VideoPlayer from 'react-native-video-player';

let styles = StyleSheet.create({
    header : {
        height : responsiveHeight(7),
    },
    body: {
        height : responsiveHeight(83),
        backgroundColor: '#FFFFFF',
        alignItems:'center',
        justifyContent: 'center',
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
        width: responsiveWidth(8),
        height: responsiveWidth(8),
        borderRadius: responsiveWidth(4),
        backgroundColor : '#00bcd4'
    },
    buttonView : {
        width: responsiveWidth(15),
        height : responsiveWidth(15),
        borderRadius : responsiveWidth(7.5),
        backgroundColor: '#00bcd4',
        padding : 3,
        margin : 15,
        marginLeft:responsiveWidth(80),
    },
    buttonIcon : {
        flex : 2,
        fontSize : responsiveFontSize(7.5),
        textAlign : 'center',
        color : '#ffffff',
    },
});

class CreateTagPreview extends Component {

    static navigationOptions = {
        drawerLabel: 'TAGS',
        drawerIcon: ({tintColor}) => (
            <Icon name='tag' style={{fontSize : 24, color : '#757575'}}/>
        ),
    };

    constructor(props) {
        super(props);
    }

    getStatusIcon() {
        let tag = this.props.tags.creation_current;

        if (tag.status == "OK") {
            return 'comment-check-outline';
        }
        else if (tag.status == "New") {
            return 'comment-alert-outline';
        }
        else if (tag.status == "Abandoned") {
            return 'comment-remove-outline';
        }
        else if (tag.status == "NOK") {
            return 'comment-processing-outline';
        }
    }

    create()
    {
        this.props.tryCreateTag(this.props.login, this.props.tags.creation_current);
        this.props.goToTagsPage();
    }

    buildMediaList()
    {
        let list = [];

        if(this.props.tags.currentTag)
        {
            let medias = this.props.tags.currentTag.media;

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
        }

        return list;
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
                                    <Icon name={this.getStatusIcon()} style={{fontSize:responsiveFontSize(2.8)}} />
                                </View>
                                <View style={styles.sectionContent}>
                                    <View>
                                        <Text style={{fontSize:responsiveFontSize(1.4), color : '#212121'}}>
                                            ? ouvert par "TBD"
                                        </Text>
                                        <Text style={{fontSize:responsiveFontSize(1.8), color : '#212121'}}>
                                            {tag.title}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.section}>
                                <View style={styles.sectionVisual}>
                                    <Image source={{uri : "https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg"}} style={{width:responsiveWidth(8), height:responsiveWidth(8), borderRadius:responsiveWidth(4)}}/>
                                </View>
                                <View style={styles.sectionContent}>
                                    <View>
                                        <Text style={{fontSize:responsiveFontSize(1.4), color : '#757575'}}>
                                            Responsable en charge
                                        </Text>
                                        <Text style={{fontSize:responsiveFontSize(1.8), color : '#212121'}}>
                                            {() => {
                                                if(tag.supervisor)
                                                {
                                                    return(
                                                        tag.supervisor.firstName + " " + tag.supervisor.lastName
                                                    );
                                                }
                                            }}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.section}>
                                <View style={styles.sectionVisual}>
                                    <View style={styles.sectionVisualType}>
                                        <Text style={{color:'#ffffff', fontSize: responsiveFontSize(2.8), textAlign: 'center'}}>
                                            {() => {
                                                if(tag.primaryAxis)
                                                {
                                                    return(
                                                        tag.primaryAxis.code
                                                    );
                                                }
                                            }}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.sectionContent}>
                                    <View>
                                        <Text style={{fontSize:responsiveFontSize(1.4), color : '#757575'}}>
                                            Nature
                                        </Text>
                                        <Text style={{fontSize:responsiveFontSize(1.8), color : '#212121'}}>
                                            {() => {
                                                if(tag.primaryAxis)
                                                {
                                                    return(
                                                        tag.primaryAxis.code
                                                    );
                                                }
                                            }}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.section}>
                                <View style={styles.sectionVisual}>
                                    <Icon name="map" style={{fontSize:responsiveFontSize(2.8)}} />
                                </View>
                                <View style={styles.sectionContent}>
                                    <View>
                                        <Text style={{fontSize:responsiveFontSize(1.4), color : '#757575'}}>
                                            Lieu
                                        </Text>
                                        <Text style={{fontSize:responsiveFontSize(1.8), color : '#212121'}}>
                                            {() => {
                                                if(tag.place)
                                                {
                                                    return(
                                                        tag.place.name
                                                    );
                                                }
                                            }}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.section}>
                                <View style={styles.sectionVisual}>
                                    <Icon name="clipboard-text" style={{fontSize:responsiveFontSize(2.8)}} />
                                </View>
                                <View style={styles.sectionContent}>
                                    <Text style={{fontSize:responsiveFontSize(1.4), color : '#212121'}}>
                                        {tag.description}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{flex : 0.5, alignItems:'flex-end', flexDirection:'row'}}>
                        <TouchableWithoutFeedback onPress={this.create.bind(this)}>
                            <ElevatedView style={styles.buttonView} elevation={7}>
                                <Icon name="check" style={styles.buttonIcon} />
                            </ElevatedView>
                        </TouchableWithoutFeedback>
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
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateTagPreview);