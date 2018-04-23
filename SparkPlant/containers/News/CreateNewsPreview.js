import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActionCreators } from '../../actions';
import * as layout from "../../assets/layout";
import HeaderTags from "../../components/Header/HeaderTags";
import ElevatedView from "react-native-elevated-view";
import HeaderNews from "../../components/Header/HeaderNews";
import Moment from 'moment';

let styles = StyleSheet.create({
    login: {
        height:layout.height7,
    },
    body: {
        height:layout.height93,
        backgroundColor : "#efefef",
        alignItems:'center',
        justifyContent: 'center',
    },
    slider : {
        height:layout.height83 * 0.45,
        backgroundColor: "#ffffff",
    },
    image : {
        width:Math.round(layout.fullWidth),
        height : Math.round(layout.height40),
        marginRight:layout.width5,
    },
    content : {
        height: layout.height78 * 0.55 - layout.height2,
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
    },
    actions : {
        flexDirection:'row',
        height : layout.height20,
    },
    forward : {
        backgroundColor: "#00bcd4",
        width: layout.width13,
        height: layout.width13,
        borderRadius: layout.width6,
        alignItems:'center',
        justifyContent: 'center',
        marginHorizontal:layout.width2,
    },
    icon : {
        color: "#ffffff",
        fontSize: layout.fontSize4p75,
    }
});

let mediaTMP = [
    "http://via.placeholder.com/1500x500",
];

class CreateNewsPreview extends Component {

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
        let medias = this.props.news.creation_current.media;
        let mediaList = [];

        if(medias && medias.length > 0)
        {
            for(var i = 0; i < medias.length; i++)
            {
                if(medias[i])
                {
                    mediaList.push(
                        <Image key={i} style={styles.image} source={{uri : medias[i].uri}} resizeMethod="resize" onProgress={(e) => { console.warn(e.nativeEvent.loaded); if(e.nativeEvent.loaded === e.nativeEvent.total){ this.setState({loadingImage : false}) } }}/>
                    );
                }
            }
        }
        else
        {
            medias = mediaTMP;
            for(var i = 0; i < medias.length; i++)
            {
                mediaList.push(
                    <Image key={i} style={styles.image} source={{uri : medias[i]}} resizeMethod="resize" onProgress={(e) => { console.warn(e.nativeEvent.loaded); if(e.nativeEvent.loaded === e.nativeEvent.total){ this.setState({loadingImage : false}) } }}/>
                );
            }
        }

        return mediaList;
    }

    create()
    {
        this.props.tryCreateNews(this.props.login, this.props.news.creation_current);
        this.props.goToNewsPage(this.props.nav);
    }

    render() {
        let item = this.props.news.creation_current;
        if(this.props.news.loading === false && this.props.news.creation_current.uploadedMedias === this.props.news.creation_current.media.length)
        {
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
                                {item.title}
                            </Text>
                            <Text style={styles.contentText} numberOfLines={12}>
                                {item.content}
                            </Text>
                        </ElevatedView>
                        <View style={styles.actions}>
                            <ElevatedView style={styles.forward} elevation={4}>
                                <TouchableWithoutFeedback onPress={this.create.bind(this)}>
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
        else
        {
            return (
                <View style={styles.login}>
                    <HeaderNews {...this.props} headerTitle="News"/>
                    <View style={styles.body}>
                        <ActivityIndicator color="#3f51b5" size="large"/>
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


export default connect(mapStateToProps, mapDispatchToProps)(CreateNewsPreview);