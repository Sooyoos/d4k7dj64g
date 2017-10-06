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
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import ElevatedView from 'react-native-elevated-view';
import HeaderTagDetails from "../../../components/Header/HeaderTags";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconA from 'react-native-vector-icons/FontAwesome';
import VideoPlayer from 'react-native-video-player';
import Moment from 'moment';

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
        width: responsiveWidth(10),
        height: responsiveWidth(10),
        borderRadius: responsiveWidth(5),
        backgroundColor : '#00bcd4',
        alignItems : "center",
        justifyContent : "center",
    },
    buttonView : {
        width: responsiveWidth(23),
        height : responsiveWidth(23),
        borderRadius : responsiveWidth(11.5),
        backgroundColor: '#00bcd4',
        marginLeft:responsiveWidth(75),
        alignItems : "center",
        justifyContent: "center",
        marginBottom: responsiveHeight(1),
    },
    buttonIcon : {
        fontSize : responsiveFontSize(7.5),
        textAlign : 'center',
        color : '#ffffff',
    },
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
        this.props.goToTagsPage();
    }

    buildMediaList()
    {
        return(
            <Image style={styles.sliderImage} source={{uri : "http://via.placeholder.com/" + Math.round(responsiveWidth(70)) + "x" + Math.round(responsiveHeight(30)) + "/000000.jpg"}} />
        );
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
                                    <IconA name={this.getStatusIcon()} style={{fontSize:responsiveFontSize(3.2)}} />
                                </View>
                                <View style={styles.sectionContent}>
                                    <View>
                                        <Text style={{fontSize:responsiveFontSize(2.2), color : '#212121'}}>
                                            { Moment().format("DD/MM/YYYY") } ouvert par { this.props.users.loggedUser.firstName } { this.props.users.loggedUser.lastName }
                                        </Text>
                                        <Text style={{fontSize:responsiveFontSize(2.4), color : '#212121'}}>
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
                                        <Text style={{fontSize:responsiveFontSize(2.2), color : '#757575'}}>
                                            Responsable en charge
                                        </Text>
                                        <Text style={{fontSize:responsiveFontSize(2.4), color : '#212121'}}>
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
                                        <Text style={{color:'#ffffff', fontSize: responsiveFontSize(3.2), textAlign: 'center'}}>
                                            {
                                                tag.primaryAxis ? tag.primaryAxis.code : " "
                                            }
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.sectionContent}>
                                    <View>
                                        <Text style={{fontSize:responsiveFontSize(2.2), color : '#757575'}}>
                                            Nature
                                        </Text>
                                        <Text style={{fontSize:responsiveFontSize(2.4), color : '#212121'}}>
                                            {
                                                tag.primaryAxis ? tag.primaryAxis.code : " "
                                            }
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
                                            {
                                                tag.place ? tag.place.name : " "
                                            }
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.section}>
                                <View style={styles.sectionVisual}>
                                    <Icon name="clipboard-text" style={{fontSize:responsiveFontSize(3.2)}} />
                                </View>
                                <View style={styles.sectionContent}>
                                    <Text style={{fontSize:responsiveFontSize(2.2), color : '#212121'}}>
                                        {tag.description}
                                    </Text>
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