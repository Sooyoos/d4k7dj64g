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
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import ElevatedView from 'react-native-elevated-view';
import Icon from 'react-native-vector-icons/FontAwesome';

let styles = StyleSheet.create({
    item : {
        width : responsiveWidth(90),
        height : responsiveHeight(15),
        marginVertical : responsiveHeight(1.8),
        backgroundColor: "#ffffff",
        flexDirection: 'row',
    },
    image : {
        height : responsiveHeight(15),
        width : responsiveHeight(15),
    },
    main : {
        height : responsiveHeight(15),
        width : responsiveWidth(90) - responsiveHeight(15),
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(2),
    },
    content : {
        height : responsiveHeight(7),
        width : responsiveWidth(90) - responsiveHeight(15) - responsiveWidth(4),
        paddingVertical: responsiveHeight(1),
        paddingHorizontal : responsiveWidth(1),
    },
    info : {
        height : responsiveHeight(6),
        width : responsiveWidth(90) - responsiveHeight(15) - responsiveWidth(4),
        paddingVertical: responsiveHeight(1),
        paddingHorizontal : responsiveWidth(1),
        flexDirection: 'row',
    },
    data : {
        height : responsiveHeight(4),
        width : responsiveWidth(90) - responsiveHeight(15) - responsiveWidth(4)- responsiveWidth(10),
    },
    status : {
        height : responsiveHeight(4),
        width : responsiveWidth(8),
    },
    textContent : {
        fontSize : responsiveFontSize(1.7),
        color : "#212121",
    },
    textInfos : {
        fontSize: responsiveFontSize(1.4),
        color : "#757575",
    },
    statusIcon : {
        fontSize : responsiveFontSize(2.2),
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
        this.props.setCurrentNews(this.props.item);
        this.props.goToWaitingNewsDetail();
    }

    getVisiblityIcon()
    {
        switch(this.props.item.visibility)
        {
            case "private" :
                return "lock";
                break;
            case "open" :
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
            return this.props.item.media[0];
        }
        else
        {
            return "http://via.placeholder.com/500x500";
        }
    }

    render() {
        let item = this.props.item;
        return (
            <TouchableWithoutFeedback onPress={this.goToDetails.bind(this)}>
                <ElevatedView style={styles.item} elevation={2}>
                    <Image style={styles.image} source={{uri : this.getMainImage()}} />
                    <View style={styles.main}>
                        <View style={styles.content}>
                            <Text style={styles.textContent} numberOfLine={2}>
                                {item.title}
                            </Text>
                        </View>
                        <View style={styles.info}>
                            <View style={styles.data}>
                                <Text  style={styles.textInfos}>
                                    dd/mm/yyyy Prénom Nom
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


export default connect(mapStateToProps, mapDispatchToProps)(NewsListItem);