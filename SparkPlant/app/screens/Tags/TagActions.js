import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Text,
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import FooterButton from "../../components/FooterButton/FooterButton";
import HeaderTagDetails from "../../components/Header/HeaderTagDetails";
import Icon from 'react-native-vector-icons/FontAwesome';
import ElevatedView from "react-native-elevated-view";

let styles = StyleSheet.create({
    login: {
        flex:1,
    },
    header : {
        height : responsiveHeight(7),
    },
    list: {
        height : responsiveHeight(83),
        backgroundColor: '#FFFFFF',
        alignItems:'center',
        justifyContent: 'center',
    },
    listLine : {
        flexDirection: 'row',
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
    },
    icon : {
        color: '#ffffff',
        fontSize : responsiveFontSize(11),
        textAlign: 'center',
    },
    buttonComment : {
        width:responsiveWidth(30),
        height:responsiveWidth(30),
        backgroundColor:'#9c27b0',
        borderRadius: responsiveWidth(15),
        padding : 30,
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    buttonTransfer : {
        width:responsiveWidth(30),
        height:responsiveWidth(30),
        backgroundColor:'#00bcd4',
        borderRadius: responsiveWidth(15),
        padding : 30,
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    buttonCheck : {
        width:responsiveWidth(30),
        height:responsiveWidth(30),
        backgroundColor:'#4caf50',
        borderRadius: responsiveWidth(15),
        padding : 30,
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
    },
    buttonClose : {
        width:responsiveWidth(30),
        height:responsiveWidth(30),
        backgroundColor:'#f44336',
        borderRadius: responsiveWidth(15),
        padding : 30,
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
    },
    footer: {
        height : responsiveHeight(10),
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
    },
});

export default class TagActions extends Component {

    constructor(props) {
        super(props);
    }

    goToComment()
    {
        this.props.navigation.navigate('CommentTag', {tag : this.props.navigation.state.params.tag});
    }

    goToTransfer()
    {
        this.props.navigation.navigate('TransferTag', {tag : this.props.navigation.state.params.tag});
    }

    resolve()
    {
        this.props.navigation.state.params.tag.status = 'OK';
        this.props.navigation.goBack(null);
    }

    abandon()
    {
        this.props.navigation.state.params.tag.status = 'NOK';
        this.props.navigation.goBack(null);
    }

    render() {
        let tag = this.props.navigation.state.params.tag;
        return (
            <View style={styles.login}>
                <HeaderTagDetails {...this.props} headerTitle={tag.id + ' : actions disponibles'} />
                <View style={styles.list}>
                    <View style={styles.listLine}>
                        <TouchableWithoutFeedback onPress={this.goToComment.bind(this)}>
                            <View>
                                <ElevatedView elevation={10} style={styles.buttonComment}>
                                    <Icon name="comment-o" style={styles.icon}/>
                                </ElevatedView>
                                <Text style={{textAlign: 'center', color : '#212121', fontSize : responsiveFontSize(1.8)}}>
                                    Commenter
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.goToTransfer.bind(this)}>
                            <View>
                                <ElevatedView elevation={10} style={styles.buttonTransfer}>
                                    <Icon name="mail-forward" style={styles.icon}/>
                                </ElevatedView>
                                <Text style={{textAlign: 'center', color : '#212121', fontSize : responsiveFontSize(1.8)}}>
                                    Transférer
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.listLine}>
                        <TouchableWithoutFeedback onPress={this.resolve.bind(this)}>
                            <View>
                                <ElevatedView elevation={10} style={styles.buttonCheck}>
                                    <Icon name="check" style={styles.icon}/>
                                </ElevatedView>
                                <Text style={{textAlign: 'center', color : '#212121', fontSize : responsiveFontSize(1.8)}}>
                                    Résolu
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.abandon.bind(this)}>
                            <View>
                                <ElevatedView elevation={10} style={styles.buttonClose}>
                                    <Icon name="close" style={styles.icon}/>
                                </ElevatedView>
                                <Text style={{textAlign: 'center', color : '#212121', fontSize : responsiveFontSize(1.8)}}>
                                    Non Résolu
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={styles.footer}>
                    <FooterButton {...this.props} active={false} tag={tag} iconName="sticky-note-o" text="Contenu" route="TagDetails"/>
                    <FooterButton {...this.props} active={false} tag={tag} iconName="info" text="Historique" route="TagHistory"/>
                    <FooterButton {...this.props} active={true} tag={tag} iconName="exchange" text="Actions" route="TagActions"/>
                </View>
            </View>
        );
    }
};