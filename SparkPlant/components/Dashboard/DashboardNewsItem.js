import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

let styles = StyleSheet.create({
    dashboardNewsItem: {
        flex:3,
        width: responsiveWidth(100),
        borderTopWidth: 0.5,
        borderTopColor: '#bdbdbd',
    },
    itemImage : {
        height: responsiveWidth(25),
        width : responsiveWidth(25),
    },
    itemData : {
        width : responsiveWidth(75),
        padding:10,
    },
    itemExcerpt : {
        color: '#000000',
        fontSize : responsiveFontSize(1.8),
        marginBottom : 16,
    },
    itemInfos : {
        flex:1,
        fontSize : responsiveFontSize(1.5),
        alignItems: 'baseline',
    },
    itemIcon : {
        fontSize : responsiveFontSize(3),
    }
});

export default class DashboardNewsItem extends Component {

    constructor(props) {
        super(props);
        this.state = { userIcon : null};
    }

    componentWillMount(){

    }

    render() {
        return (
            <View style={styles.dashboardNewsItem}>
                <TouchableWithoutFeedback>
                    <View style={{flexDirection : 'row'}}>
                        <Image style={styles.itemImage} source={{uri : this.props.imgSrc }} />
                        <View style={styles.itemData}>
                            <Text style={styles.itemExcerpt} numberOfLines={2} adjustsFontSizeToFit={true}>
                                {this.props.newsExcerpt}
                            </Text>
                            <View style={{flexDirection : 'row'}}>
                                <Text style={styles.itemInfos} adjustsFontSizeToFit={true}>
                                    {this.props.newsDate} {this.props.newsAuthor}
                                </Text>
                                <Icon name={this.props.iconName} style={styles.itemIcon} />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
};