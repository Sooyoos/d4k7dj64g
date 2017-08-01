import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    Alert,
    Modal,
    Picker,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActionCreators } from '../../actions';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import HeaderTags from "../../components/Header/HeaderTags";
import FooterButton from "../../components/Footer/FooterButton";
import ElevatedView from "react-native-elevated-view";
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
    publish : {
        backgroundColor: "#4caf50",
        width:responsiveWidth(13),
        height: responsiveWidth(13),
        borderRadius: responsiveWidth(6),
        alignItems:'center',
        justifyContent: 'center',
        marginHorizontal:responsiveWidth(2),
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
    delete : {
        backgroundColor: "#f44336",
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
    },

});

class WaitingNewsDetail extends Component {

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
                mediaList.push(
                    <Image key={i} style={styles.image} source={{uri : medias[i]}} />
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
                    this.props.goToWaitingNews();
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
                {text: 'Transférer', onPress: () => {this.props.tryTransferNews(this.props.login, this.props.news.currentNews); this.props.goToWaitingNews();}},
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
                    this.props.goToWaitingNews();
                }},
            ],
            { cancelable: false }
        );
    }

    render() {
        let item = this.props.news.currentNews;
            return (
                <View style={styles.login}>
                    <HeaderTags {...this.props} headerTitle="Mes tags"/>
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
                                <Image style={styles.infoImage} source={{uri : item.user.avatar || "https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/0b5/262/34e1dde.jpg"}}/>
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