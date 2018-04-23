import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import * as layout from "../../assets/layout";
import ElevatedView from 'react-native-elevated-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';

let styles = StyleSheet.create({
    item : {
        width : layout.width90,
        height : layout.height15,
        marginVertical : layout.height1p8,
        backgroundColor: "#ffffff",
        flexDirection: 'row',
    },
    image : {
        height : Math.round(layout.height15),
        width : Math.round(layout.height15),
    },
    main : {
        height : layout.height15,
        width : layout.width90 - layout.height15,
        paddingVertical: layout.height1,
        paddingHorizontal: layout.width2,
    },
    content : {
        height : layout.height7,
        width : layout.width90 - layout.height15 - layout.width4,
        paddingVertical: layout.height1,
        paddingHorizontal : layout.width1,
    },
    info : {
        height : layout.height6,
        width : layout.width90 - layout.height15 - layout.width4,
        paddingVertical: layout.height1,
        paddingHorizontal : layout.width1,
        flexDirection: 'row',
    },
    data : {
        height : layout.height4,
        width : layout.width90 - layout.height15 - layout.width4 - layout.width10,
    },
    status : {
        height : layout.height4,
        width : layout.width8,
    },
    textContent : {
        fontSize : layout.fontSize2p2,
        color : "#212121",
    },
    textInfos : {
        fontSize: layout.fontSize2,
        color : "#757575",
    },
    statusIcon : {
        fontSize : layout.fontSize2p2,
        color : "#757575",
    }
});

class NewsListItem extends Component {

    constructor(props)
    {
        super(props);
    }

    goToDetails()
    {
        this.props.tryNews(this.props.login, this.props.item);
        this.props.route(this.props.nav);
    }

    getVisiblityIcon()
    {
        switch(this.props.item.visibility)
        {
            case "private" :
                return "lock";
                break;
            case "restricted" :
                return "unlock-alt";
                break;
            case "public" :
                return "globe";
                break;
        }
    }

    getMainImage()
    {
        if(this.props.item.media && this.props.item.media.length > 0)
        {
            return this.props.item.media[0].path;
        }
        else
        {
            return "http://via.placeholder.com/500x500";
        }
    }

    isResponsable()
    {
        let roles = this.props.users.loggedUser.rolesByUnit;

        for(var i = 0; i < roles.length; i++)
        {
            if(roles[i].role.title === "Responsable")
            {
                return true;
            }
        }

        return false;
    }

    render() {
        let item = this.props.item;
        let responsable = this.isResponsable();

        if(responsable === false)
        {
            let author = "SparkPlant";
            if(item.user)
            {
                author = item.user.firstName + " " + item.user.lastName
            }
            return (
                <TouchableWithoutFeedback onPress={this.goToDetails.bind(this)}>
                    <ElevatedView style={styles.item} elevation={2}>
                        <Image style={styles.image} source={{uri : this.getMainImage()}} resizeMethod="resize" onProgress={(e) => { console.warn(e.nativeEvent.loaded); if(e.nativeEvent.loaded === e.nativeEvent.total){ this.setState({loadingImage : false}) } }}/>
                        <View style={styles.main}>
                            <View style={styles.content}>
                                <Text style={styles.textContent} numberOfLine={2}>
                                    {item.title}
                                </Text>
                            </View>
                            <View style={styles.info}>
                                <View style={styles.data}>
                                    <Text  style={styles.textInfos}>
                                        Le {Moment(item.createdAt).format('DD/MM/YYYY')} par {author}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </ElevatedView>
                </TouchableWithoutFeedback>
            );
        }
        else
        {
            let author = "SparkPlant";
            if(item.user)
            {
                author = item.user.firstName + " " + item.user.lastName
            }
            return (
                <TouchableWithoutFeedback onPress={this.goToDetails.bind(this)}>
                    <ElevatedView style={styles.item} elevation={2}>
                        <Image style={styles.image} source={{uri : this.getMainImage()}} resizeMethod="resize" onProgress={(e) => { console.warn(e.nativeEvent.loaded); if(e.nativeEvent.loaded === e.nativeEvent.total){ this.setState({loadingImage : false}) } }}/>
                        <View style={styles.main}>
                            <View style={styles.content}>
                                <Text style={styles.textContent} numberOfLine={2}>
                                    {item.title}
                                </Text>
                            </View>
                            <View style={styles.info}>
                                <View style={styles.data}>
                                    <Text  style={styles.textInfos}>
                                        Le {Moment(item.createdAt).format('DD/MM/YYYY')} par {author}
                                    </Text>
                                </View>
                                <View style={styles.status}>
                                    <Icon name={this.getVisiblityIcon()} style={styles.statusIcon} />
                                </View>
                            </View>
                        </View>
                    </ElevatedView>
                </TouchableWithoutFeedback>
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
        users : state.users,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(NewsListItem);