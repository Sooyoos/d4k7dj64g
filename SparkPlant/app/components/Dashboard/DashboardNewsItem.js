import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
    Dimensions,
    PixelRatio,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Text from 'react-native-text';

let styles = StyleSheet.create({
    dashboardNewsItem: {
        flex:3,
        width:Dimensions.get('window').width,
        borderTopWidth: 0.5,
        borderTopColor: '#bdbdbd',
    },
    itemImage : {
        height:Dimensions.get('window').width / 4,
        width : Dimensions.get('window').width / 4,
    },
    itemData : {
        width : Dimensions.get('window').width * 0.75,
        padding:10,
    },
    itemExcerpt : {
        color: '#000000',
        fontSize : 16,
        marginBottom : 16,
    },
    itemInfos : {
        flex:1,
        fontSize : 12,
        alignItems: 'baseline',
    },
    itemIcon : {
        fontSize : PixelRatio.get() * 10,
    }
});

export default class DashboardNewsItem extends Component {

    constructor(props) {
        super(props);
        this.state = { userIcon : null};

    }

    componentWillMount(){
        Icon.getImageSource('user', 20, 'red').then((source) => this.setState({ userIcon: source }));
    }

    render() {
        Alert.alert(JSON.stringify(this.state.userIcon));
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
                                <Icon style={styles.itemIcon} name={this.props.iconName} />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
};