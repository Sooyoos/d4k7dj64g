import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as layout from "../../assets/layout";


let styles = StyleSheet.create({
    dashboardNewsItem: {
        flex:3,
        width: layout.fullWidth,
        borderTopWidth: 0.5,
        borderTopColor: '#bdbdbd',
    },
    itemImage : {
        height: Math.round(layout.width25),
        width : Math.round(layout.width25),
    },
    itemData : {
        width : layout.width75,
        padding:10,
    },
    itemExcerpt : {
        color: '#000000',
        fontSize : layout.fontSize1p8,
        marginBottom : 16,
    },
    itemInfos : {
        flex:1,
        fontSize : layout.fontSize1p5,
        alignItems: 'baseline',
    },
    itemIcon : {
        fontSize : layout.fontSize3,
    }
});

export default class DashboardNewsItem extends Component {

    constructor(props) {
        super(props);
        this.state = { userIcon : null, loadingImage : true};
    }

    render() {
        if(this.props.responsable)
        {
            return (
                <TouchableWithoutFeedback onPress={() => {this.props.route(this.props.item)}}>
                    <View style={styles.dashboardNewsItem}>
                        <View style={{flexDirection : 'row'}}>
                            <Image style={styles.itemImage} source={{uri : this.props.imgSrc }} resizeMethod="resize" onProgress={(e) => { if(e.nativeEvent.loaded === e.nativeEvent.total){ this.setState({loadingImage : false}) } }} />
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
                    </View>
                </TouchableWithoutFeedback>
            );
        }
        else
        {
            return (
                <TouchableWithoutFeedback onPress={() => {this.props.route(this.props.item)}}>
                    <View style={styles.dashboardNewsItem}>
                        <View style={{flexDirection : 'row'}}>
                            <Image style={styles.itemImage} source={{uri : this.props.imgSrc }} resizeMethod="resize" onProgress={(e) => { console.warn(e.nativeEvent.loaded); if(e.nativeEvent.loaded === e.nativeEvent.total){ this.setState({loadingImage : false}) } }} />
                            <View style={styles.itemData}>
                                <Text style={styles.itemExcerpt} numberOfLines={2} adjustsFontSizeToFit={true}>
                                    {this.props.newsExcerpt}
                                </Text>
                                <View style={{flexDirection : 'row'}}>
                                    <Text style={styles.itemInfos} adjustsFontSizeToFit={true}>
                                        {this.props.newsDate} {this.props.newsAuthor}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            );
        }

    }
};