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
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActionCreators } from '../../actions';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import HeaderTags from "../../components/Header/HeaderTags";
import FooterButton from "../../components/Footer/FooterButton";
import ElevatedView from "react-native-elevated-view";
import HeaderNews from "../../components/Header/HeaderNews";
import Moment from 'moment';

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
    footer: {
        height:responsiveHeight(10),
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
        paddingBottom : responsiveHeight(3),
    },
    slider : {
        height:responsiveHeight(93) * 0.45,
        backgroundColor: "#ffffff",
    },
    image : {
        width:responsiveWidth(100),
        height : responsiveHeight(40),
        marginRight:responsiveWidth(5),
    },
    content : {
        height:responsiveHeight(83) * 0.55 - responsiveHeight(2),
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
    }
});

class NewsDetail extends Component {

    constructor(props)
    {
        super(props);
    }

    buildMediaList()
    {
        let medias = this.props.news.currentNews.media;
        console.log(this.props.news.currentNews);
        let mediaList = [];

        if(medias)
        {
            if(medias.length > 0)
            {
                for(var i = 0; i < medias.length; i++)
                {
                    mediaList.push(
                        <Image key={i} style={styles.image} source={{uri : medias[i].path}} />
                    );
                }
            }
            else
            {
                mediaList.push(
                    <Image key={0} style={styles.image} source={{uri : "http://via.placeholder.com/1500x500"}} />
                );
            }
        }

        return mediaList;
    }

    render() {
        let item = this.props.news.currentNews;
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
                        <View style={styles.info}>
                            <Text style={styles.infoText}>
                                Le {Moment(item.createdAt).format('DD/MM/YYYY')} par {item.user.firstName} {item.user.lastName}
                            </Text>
                            <Image style={styles.infoImage} source={{uri : item.user.avatar ? item.user.avatar.path : "http://via.placeholder.com/50x50" }}/>
                        </View>
                        <Text style={styles.title}>
                            {item.title}
                        </Text>
                        <Text style={styles.contentText} numberOfLines={12}>
                            {item.content}
                        </Text>
                    </ElevatedView>
                </View>
                <View style={styles.footer}>
                    <FooterButton {...this.props} active={true} iconName="newspaper-o" text="Publiées" route={null}/>
                    <FooterButton {...this.props} active={false} iconName="clock-o" text="A valider" route={null}/>
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


export default connect(mapStateToProps, mapDispatchToProps)(NewsDetail);