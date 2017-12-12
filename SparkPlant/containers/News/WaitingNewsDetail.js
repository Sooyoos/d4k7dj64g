import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    Alert,
    ActivityIndicator,
    Picker,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActionCreators } from '../../actions';
import * as layout from "../../assets/layout";
import HeaderTags from "../../components/Header/HeaderTags";
import FooterButton from "../../components/Footer/FooterButton";
import ElevatedView from "react-native-elevated-view";
import Moment from 'moment';
import HeaderNews from "../../components/Header/HeaderNews";

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
        width:layout.fullWidth,
        height : layout.height40,
        marginRight:layout.width5,
    },
    content : {
        height:layout.height78 * 0.55 - layout.height2,
        width : layout.width80,
        backgroundColor : "#ffffff",
        marginVertical: layout.height1,
        paddingVertical:layout.height2,
        paddingHorizontal:layout.width2,
    },
    info : {
        height:layout.height5,
        width:layout.width80,
        paddingVertical:layout.height1,
        paddingHorizontal:layout.width1,
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
    publish : {
        backgroundColor: "#4caf50",
        width: layout.width13,
        height: layout.width13,
        borderRadius: layout.width6,
        alignItems:'center',
        justifyContent: 'center',
        marginHorizontal:layout.width2,
    },
    forward : {
        backgroundColor: "#00bcd4",
        width:layout.width13,
        height: layout.width13,
        borderRadius: layout.width6,
        alignItems:'center',
        justifyContent: 'center',
        marginHorizontal:layout.width2,
    },
    delete : {
        backgroundColor: "#f44336",
        width:layout.width13,
        height: layout.width13,
        borderRadius: layout.width6,
        alignItems:'center',
        justifyContent: 'center',
        marginHorizontal:layout.width2,
    },
    icon : {
        color: "#ffffff",
        fontSize: layout.fontSize4p75,
    },

});

class WaitingNewsDetail extends Component {

    static navigationOptions = {
        drawerLabel: 'NEWS',
        drawerIcon: ({tintColor}) => (
            <Icon name='newspaper-o' style={{fontSize : 24, color : '#757575'}}/>
        ),
    };

    constructor(props)
    {
        super(props);
        this.state = {transferInput : false, unit : null};
    }

    componentWillMount()
    {

    }

    buildMediaList()
    {
        let medias = this.props.news.currentNews.media;
        let mediaList = [];

        if(medias.length > 0)
        {
            for(var i = 0; i < medias.length; i++)
            {
                console.log(medias[i]);
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

        return mediaList;
    }

    publish()
    {
        Alert.alert(
            'Publier la news',
            'Êtes vous sûr de vouloir publier la news ?',
            [
                {text: 'Annuler', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Publier', onPress: () => {
                    this.props.tryPublishNews(this.props.login, this.props.news.currentNews);
                    this.props.goToWaitingNews(this.props.nav);
                }},
            ],
            { cancelable: false }
        );
    }

    forward()
    {
        Alert.alert(
            'Transférer la news',
            'Êtes vous sûr de vouloir transférer la news?',
            [
                {text: 'Annuler', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Transférer', onPress: () => {this.props.tryTransferNews(this.props.login, this.props.news.currentNews); this.props.goToWaitingNews(this.props.nav);}},
            ],
            { cancelable: false }
        );
    }

    delete()
    {
        Alert.alert(
            'Supprimer la news',
            'Êtes vous sûr de vouloir supprimer la news ?',
            [
                {text: 'Annuler', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Supprimer', onPress: () => {
                    this.props.tryDeleteNews(this.props.login, this.props.news.currentNews);
                    this.props.goToWaitingNews(this.props.nav);
                }},
            ],
            { cancelable: false }
        );
    }

    render()
    {
        let item = this.props.news.currentNews;
        if(this.props.news.loading === false && item)
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
                            <View style={styles.info}>
                                <Text style={styles.infoText}>
                                    Le {Moment(item.createdAt).format('DD/MM/YYYY')} par {item.user.firstName} {item.user.lastName}
                                </Text>
                                <Image style={styles.infoImage} source={{uri : item.user.avatar.path || "http://via.placeholder.com/50x50"}}/>
                            </View>
                            <Text style={styles.contentText} numberOfLines={12}>
                                {item.content}
                            </Text>
                        </ElevatedView>
                        <View style={styles.actions}>
                            <ElevatedView style={styles.publish} elevation={4}>
                                <TouchableWithoutFeedback onPress={this.publish.bind(this)}>
                                    <View>
                                        <Icon style={styles.icon} name="upload"/>
                                    </View>
                                </TouchableWithoutFeedback>
                            </ElevatedView>
                            <ElevatedView style={styles.forward} elevation={4}>
                                <TouchableWithoutFeedback onPress={this.forward.bind(this)}>
                                    <View>
                                        <Icon style={styles.icon} name="mail-forward"/>
                                    </View>
                                </TouchableWithoutFeedback>
                            </ElevatedView>
                            <ElevatedView style={styles.delete} elevation={4}>
                                <TouchableWithoutFeedback onPress={this.delete.bind(this)}>
                                    <View>
                                        <Icon style={styles.icon} name="trash-o"/>
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
            return(
                <View style={styles.login}>
                    <ActivityIndicator color="#3f51b5" size="large"/>
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
        utils : state.utils,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(WaitingNewsDetail);