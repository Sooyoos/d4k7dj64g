import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Image,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import FooterButton from "../../components/Footer/FooterButton";
import HeaderTagDetails from "../../components/Header/HeaderTags";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

let styles = StyleSheet.create({
    login: {
        flex:1,
    },
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
});

function lpad(value, padding) {
    var zeroes = new Array(padding+1).join("0");
    return (zeroes + value).slice(-padding);
}

class TagDetails extends Component {

    constructor(props) {
        super(props);
    }

    getStatusIcon() {
        let tag = this.props.tags.currentTag;

        if (tag.status === "closed_resolved") {
            return 'comment-check-outline';
        }
        else if (tag.status === "ongoing") {
            return 'comment-alert-outline';
        }
        else if (tag.status === "closed_unresolved") {
            return 'comment-remove-outline';
        }
    }

    render() {
        console.log(this.props);
        let tag = this.props.tags.currentTag;
        if(tag)
        {
            return (
                <View style={styles.login}>
                    <HeaderTagDetails {...this.props} headerTitle={"#" + lpad(tag["@id"].substr(tag["@id"].lastIndexOf("/") +1), 6)} />
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
                                            #{lpad(tag["@id"].substr(tag["@id"].lastIndexOf("/") +1), 6)} ouvert par {tag.supervisor.firstName} {tag.supervisor.lastName}
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
                                        <Text style={{fontSize:responsiveFontSize(1.4), color : '#757575'}}>
                                            Nature
                                        </Text>
                                        <Text style={{fontSize:responsiveFontSize(1.8), color : '#212121'}}>
                                            {tag.primaryAxis.name}
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
                                            {tag.place.name}
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
                    <HeaderTagDetails {...this.props} headerTitle={tag} />
                    <View style={styles.body}>

                    </View>
                    <View style={styles.footer}>
                        <FooterButton {...this.props} active={true} tag={tag} iconName="sticky-note-o" text="Contenu" route={this.props.goToTagDetails}/>
                        <FooterButton {...this.props} active={false} tag={tag} iconName="info" text="Historique" route={this.props.goToTagHistory}/>
                        <FooterButton {...this.props} active={false} tag={tag} iconName="exchange" text="Actions" route={this.props.goToTagAction}/>
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