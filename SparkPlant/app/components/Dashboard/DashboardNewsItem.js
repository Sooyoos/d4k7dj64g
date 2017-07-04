import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

let styles = StyleSheet.create({
    dashboardNewsItem: {
        flex:3,
        width:414,
        borderTopWidth: 0.5,
        borderTopColor: '#bdbdbd',
    },
    itemImage : {
        height:104,
        width : 104,
    },
    itemData : {
        width : 300,
        padding:10,
    },
    itemExcerpt : {
        color: '#000000',
        fontSize : 18,
        marginBottom : 16,
    },
    itemInfos : {
        flex:1,
        fontSize : 15,
        alignItems: 'baseline',
    },
    itemIcon : {
        fontSize : 20,
    }
});

export default class DashboardNewsItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.dashboardNewsItem}>
                <TouchableWithoutFeedback>
                    <View style={{flexDirection : 'row'}}>
                        <Image style={styles.itemImage} source={{uri : this.props.imgSrc }} />
                        <View style={styles.itemData}>
                            <Text style={styles.itemExcerpt} numberOfLines={2}>
                                {this.props.newsExcerpt}
                            </Text>
                            <View style={{flexDirection : 'row'}}>
                                <Text style={styles.itemInfos}>
                                    {this.props.newsDate} {this.props.newsAuthor}
                                </Text>
                                <Icon style={styles.itemIcon} name={this.props.iconName} />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
};