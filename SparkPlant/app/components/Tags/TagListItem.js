import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
    Text,
} from 'react-native';
import ElevatedView from 'react-native-elevated-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

let styles = StyleSheet.create({
    item: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        margin: 5,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
    },
    main : {
        width:300,
        flexDirection: 'column',
        marginRight: 10,
    },
    aside : {
        width: 50,
        alignItems: 'center',
    },
    itemTitle : {
        flex : 1,
        color : '#212121',
        fontSize:20,
    },
    itemLocation : {
        flex : 1,
        color : '#757575',
        fontSize:18,
    },
    itemInfos : {
        flex : 1,
        flexDirection: 'row',
    },
    itemId : {
        color : '#757575',
        fontSize:16,
    },
    itemImage : {
        width:20,
        height:20,
        borderRadius : 10,
        marginLeft:3,
        marginRight:3,
    },
    itemFullname : {
        flex : 1,
        color : '#212121',
        fontSize:16,
    },
    itemType : {
        backgroundColor:'#00bcd4',
        width:30,
        height:30,
        borderRadius : 15,
    },
    itemStatus : {
        marginTop : 2,
    },
});

export default class TagListItem extends Component {

    constructor(props) {
        super(props);
    }

    getStatusIcon() {
        if (this.props.tag.status == "OK") {
            return 'comment-check-outline';
        }
        else if (this.props.tag.status == "New") {
            return 'comment-alert-outline';
        }
        else if (this.props.tag.status == "Abandoned") {
            return 'comment-remove-outline';
        }
        else if (this.props.tag.status == "NOK") {
            return 'comment-processing-outline';
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback>
                <ElevatedView style={styles.item} elevation={4}>
                    <View style={styles.main}>
                        <Text style={styles.itemTitle}>
                            {this.props.tag.title}
                        </Text>
                        <Text style={styles.itemLocation}>
                            {this.props.tag.location}
                        </Text>
                        <View style={styles.itemInfos}>
                            <Text style={styles.itemId}>
                                {this.props.tag.id}
                            </Text>
                            <Image style={styles.itemImage} source={ { uri : this.props.tag.author.avatar}} />
                            <Text style={styles.itemFullname}>
                                {this.props.tag.author.fullname}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.aside}>
                        <View style={styles.itemType}>
                            <Text style={{color: '#ffffff', fontSize : 20, textAlign: 'center'}}>
                                {this.props.tag.type}
                            </Text>
                        </View>
                        <View style={styles.itemStatus}>
                            <Icon name={this.getStatusIcon()} style={{fontSize: 34,}} />
                        </View>
                    </View>
                </ElevatedView>
            </TouchableWithoutFeedback>
        );
    }
};
