import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Image,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import ElevatedView from 'react-native-elevated-view';
import HeaderTagDetails from "../../../components/Header/HeaderTagDetails";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

export default class CreateTagPreview extends Component {

    constructor(props) {
        super(props);
    }

    getStatusIcon() {
        let tag = this.props.navigation.state.params.tag;

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
        this.props.navigation.navigate('Tags');
    }

    render() {
        let tag = this.props.navigation.state.params.tag;
        return (
            <View style={{flex : 1, backgroundColor : "#efefef"}}>
                <HeaderTagDetails {...this.props} headerTitle="Créer un tag" />
                <View style={styles.body}>
                    <ScrollView style={styles.slider} alignItems={'center'} horizontal={true} showsHorizontalScrollIndicator={false}>
                        <Image style={styles.sliderImage} source={{uri : "http://i1.go2yd.com/image.php?url=0GQ3kfitfC"}} />
                        <Image style={styles.sliderImage} source={{uri : "http://saporifineflavors.com/userfiles/image/Portafilter%20Handles.jpg"}} />
                        <Image style={styles.sliderImage} source={{uri : "https://i.ytimg.com/vi/PI96CzxFUPI/maxresdefault.jpg"}} />
                        <Image style={styles.sliderImage} source={{uri : "https://i.ytimg.com/vi/w5CuDdhdess/maxresdefault.jpg"}} />
                    </ScrollView>
                    <View style={styles.infos}>
                        <View style={styles.section}>
                            <View style={styles.sectionVisual}>
                                <Icon name={this.getStatusIcon()} style={{fontSize:responsiveFontSize(2.8)}} />
                            </View>
                            <View style={styles.sectionContent}>
                                <View>
                                    <Text style={{fontSize:responsiveFontSize(1.4), color : '#212121'}}>
                                        {tag.id} ouvert par {tag.manager.fullname}
                                    </Text>
                                    <Text style={{fontSize:responsiveFontSize(1.8), color : '#212121'}}>
                                        {tag.title}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.section}>
                            <View style={styles.sectionVisual}>
                                <Image source={{uri : tag.manager.avatar}} style={{width:responsiveWidth(8), height:responsiveWidth(8), borderRadius:responsiveWidth(4)}}/>
                            </View>
                            <View style={styles.sectionContent}>
                                <View>
                                    <Text style={{fontSize:responsiveFontSize(1.4), color : '#757575'}}>
                                        Responsable en charge
                                    </Text>
                                    <Text style={{fontSize:responsiveFontSize(1.8), color : '#212121'}}>
                                        {tag.manager.fullname}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.section}>
                            <View style={styles.sectionVisual}>
                                <View style={styles.sectionVisualType}>
                                    <Text style={{color:'#ffffff', fontSize: responsiveFontSize(2.8), textAlign: 'center'}}>
                                        {tag.primaryType}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.sectionContent}>
                                <View>
                                    <Text style={{fontSize:responsiveFontSize(1.4), color : '#757575'}}>
                                        Nature
                                    </Text>
                                    <Text style={{fontSize:responsiveFontSize(1.8), color : '#212121'}}>
                                        {tag.primaryType}
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
                                        {tag.location}
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
};