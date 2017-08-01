import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActionCreators } from '../../actions';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import HeaderTags from "../../components/Header/HeaderTags";
import ElevatedView from "react-native-elevated-view";

let styles = StyleSheet.create({
    login: {
        height:responsiveHeight(7),
    },
    body: {
        height:responsiveHeight(93),
        backgroundColor : "#efefef",
        alignItems:'center',
        justifyContent: 'center',
    },
    slider : {
        height:responsiveHeight(83) * 0.45,
        backgroundColor: "#ffffff",
    },
    image : {
        width:responsiveWidth(100),
        height : responsiveHeight(40),
        marginRight:responsiveWidth(5),
    },
    content : {
        height:responsiveHeight(78) * 0.55 - responsiveHeight(2),
        width : responsiveWidth(80),
        backgroundColor : "#ffffff",
        marginVertical: responsiveHeight(1),
        paddingVertical:responsiveHeight(2),
        paddingHorizontal:responsiveWidth(2),
    },
    info : {
        height:responsiveHeight(5),
        width:responsiveWidth(80),
        paddingVertical:responsiveHeight(1),
        paddingHorizontal:responsiveWidth(1),
        flexDirection: 'row',
        justifyContent: 'center',
    },
    infoText : {
        fontSize: responsiveFontSize(1.6),
        color : "#757575",
        textAlign: 'center',
        justifyContent: 'center',
    },
    infoImage : {
        height: responsiveHeight(3.5),
        width : responsiveHeight(3.5),
        borderRadius : responsiveHeight(1.75),
        marginHorizontal:responsiveWidth(1),
    },
    title : {
        fontSize: responsiveFontSize(2),
        color : "#212121",
        textAlign: 'center',
        justifyContent: 'center',
    },
    contentText : {
        marginTop : responsiveHeight(2.5),
        fontSize: responsiveFontSize(1.6),
        color : "#212121",
        justifyContent: 'center',
    },
    actions : {
        flexDirection:'row',
        flex : 0.5
    },
    forward : {
        backgroundColor: "#00bcd4",
        width:responsiveWidth(13),
        height: responsiveWidth(13),
        borderRadius: responsiveWidth(6),
        alignItems:'center',
        justifyContent: 'center',
        marginHorizontal:responsiveWidth(2),
    },
    icon : {
        color: "#ffffff",
        fontSize: responsiveFontSize(4.75),
    }
});

let mediaTMP = [
    "http://i1.go2yd.com/image.php?url=0GQ3kfitfC",
    "http://saporifineflavors.com/userfiles/image/Portafilter%20Handles.jpg",
    "https://i.ytimg.com/vi/PI96CzxFUPI/maxresdefault.jpg",
    "https://i.ytimg.com/vi/w5CuDdhdess/maxresdefault.jpg",
];

class CreateNewsPreview extends Component {

    constructor(props)
    {
        super(props);
    }

    buildMediaList()
    {
        let medias = this.props.news.creation_current.media;
        let mediaList = [];

        if(medias)
        {
            for(var i = 0; i < medias.length; i++)
            {
                mediaList.push(
                    <Image key={i} style={styles.image} source={{uri : medias[i]}} />
                );
            }
        }
        else
        {
            medias = mediaTMP;
            for(var i = 0; i < medias.length; i++)
            {
                mediaList.push(
                    <Image key={i} style={styles.image} source={{uri : medias[i]}} />
                );
            }
        }

        return mediaList;
    }

    render() {
        return (
            <View style={styles.login}>
                <HeaderNews {...this.props} headerTitle="News"/>
                <View style={styles.body}>
                    <ElevatedView elevation={2} style={styles.slider}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={{flexDirection:'row'}}>
                                {this.buildMediaList()}
                            </View>
                        </ScrollView>
                    </ElevatedView>
                    <ElevatedView style={styles.content} elevation={2}>
                        <Text style={styles.title}>
                            Titre de la News
                        </Text>
                        <View style={styles.info}>
                            <Text style={styles.infoText}>
                                Le 24/06/2017 par Mari Doucet
                            </Text>
                            <Image style={styles.infoImage} source={{uri : "https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg"}}/>
                        </View>
                        <Text style={styles.contentText} numberOfLines={12}>
                            We're acquainted with the wormhole phenomenon, but this...{"\n\n"}Is a remarkable piece of bio-electronic engineering by which I see much of the EM spectrum ranging from heat and infrared through radio waves, et cetera, and forgive me if I've said and listened to this a thousand times. This planet's interior heat provides an abundance of geothermal energy. We need to neutralize the homing signal.
                        </Text>
                    </ElevatedView>
                    <View style={styles.actions}>
                        <ElevatedView style={styles.forward} elevation={4}>
                            <TouchableWithoutFeedback onPress={null}>
                                <View>
                                    <Icon style={styles.icon} name="check"/>
                                </View>
                            </TouchableWithoutFeedback>
                        </ElevatedView>
                    </View>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        login: state.login,
        nav : state.nav,
        tags : state.tags,
        news : state.news,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateNewsPreview);