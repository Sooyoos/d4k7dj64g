import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Image,
    Text,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActionCreators } from '../../actions';
import * as layout from "../../assets/layout";
import HeaderTags from "../../components/Header/HeaderTags";
import FooterButton from "../../components/Footer/FooterButton";
import ElevatedView from "react-native-elevated-view";
import HeaderNews from "../../components/Header/HeaderNews";
import Moment from 'moment';

let styles = StyleSheet.create({
    login: {
        height: layout.height7,
    },
    body: {
        height: layout.height93,
        backgroundColor : "#efefef",
        alignItems:'center',
        justifyContent: 'center',
    },
    footer: {
        height: layout.height10,
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
        paddingBottom : layout.height3,
    },
    slider : {
        height: layout.height93 * 0.45,
        backgroundColor: "#ffffff",
    },
    image : {
        width: layout.fullWidth,
        height : layout.height40,
        marginRight: layout.width5,
    },
    content : {
        height: layout.height83 * 0.55 - layout.height2,
        width : layout.width80,
        backgroundColor : "#ffffff",
        marginVertical: layout.height1,
        paddingVertical: layout.height2,
        paddingHorizontal: layout.width2,
    },
    info : {
        height: layout.height5,
        width: layout.width80,
        paddingVertical: layout.height1,
        paddingHorizontal: layout.width1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    infoText : {
        fontSize: layout.fontSize1p6,
        color : "#757575",
        textAlign: 'center',
        justifyContent: 'center',
    },
    infoImage : {
        height: layout.height3p5,
        width : layout.height3p5,
        borderRadius : layout.height1p75,
        marginHorizontal: layout.width1,
    },
    title : {
        fontSize: layout.fontSize2,
        color : "#212121",
        textAlign: 'center',
        justifyContent: 'center',
    },
    contentText : {
        marginTop : layout.height2p5,
        fontSize: layout.fontSize1p6,
        color : "#212121",
        justifyContent: 'center',
    }
});

class NewsDetail extends Component {

    static navigationOptions = {
        drawerLabel: 'NEWS',
        drawerIcon: ({tintColor}) => (
            <Icon name='newspaper-o' style={{fontSize : 24, color : '#757575'}}/>
        ),
    };

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
        let author = "";

        if(item)
        {
            if(item.user)
            {
                author = item.user.firstName + " " + item.user.lastName;
            }
            else
            {
                author = "SparkPlant";
            }

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
                                    Le {Moment(item.createdAt).format('DD/MM/YYYY')} par {author}
                                </Text>
                                <Image style={styles.infoImage} source={{uri : item.user && item.user.avatar ? item.user.avatar.path : "http://via.placeholder.com/50x50" }}/>
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
        else
        {
            return (
                <View style={styles.login}>
                    <HeaderNews {...this.props} headerTitle="News"/>
                    <View style={styles.body}>
                        <ActivityIndicator color="#3f51b5" size="large"/>
                    </View>
                    <View style={styles.footer}>
                        <FooterButton {...this.props} active={true} iconName="newspaper-o" text="Publiées" route={null}/>
                        <FooterButton {...this.props} active={false} iconName="clock-o" text="A valider" route={null}/>
                    </View>
                </View>
            );
        }

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