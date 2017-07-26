import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import FooterButton from "../../components/Footer/FooterButton";
import HeaderTagDetails from "../../components/Header/HeaderTags";
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
        padding : responsiveWidth(3),
        marginTop: responsiveHeight(0.5),
        marginBottom: responsiveHeight(0.5),
        marginLeft: responsiveWidth(2),
        marginRight: responsiveWidth(2),
    },
    buttonTransfer : {
        width:responsiveWidth(30),
        height:responsiveWidth(30),
        backgroundColor:'#00bcd4',
        borderRadius: responsiveWidth(15),
        padding : responsiveWidth(3),
        marginTop: responsiveHeight(0.5),
        marginBottom: responsiveHeight(0.5),
        marginLeft: responsiveWidth(2),
        marginRight: responsiveWidth(2),
    },
    buttonCheck : {
        width:responsiveWidth(30),
        height:responsiveWidth(30),
        backgroundColor:'#4caf50',
        borderRadius: responsiveWidth(15),
        padding : responsiveWidth(3),
        marginTop: responsiveHeight(0.5),
        marginBottom: responsiveHeight(0.5),
        marginLeft: responsiveWidth(2),
        marginRight: responsiveWidth(2),
    },
    buttonClose : {
        width:responsiveWidth(30),
        height:responsiveWidth(30),
        backgroundColor:'#f44336',
        borderRadius: responsiveWidth(15),
        padding : responsiveWidth(3),
        marginTop: responsiveHeight(0.5),
        marginBottom: responsiveHeight(0.5),
        marginLeft: responsiveWidth(2),
        marginRight: responsiveWidth(2),
    },
    footer: {
        height : responsiveHeight(10),
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
        paddingBottom : responsiveHeight(3),
    },
});

function lpad(value, padding) {
    var zeroes = new Array(padding+1).join("0");
    return (zeroes + value).slice(-padding);
}

class TagActions extends Component {

    constructor(props) {
        super(props);
    }

    goToComment()
    {
        this.props.goToTagComment(this.props.tags.currentTag);
    }

    goToTransfer()
    {
        this.props.goToTagTransfer(this.props.tags.currentTag);
    }

    resolve()
    {
        this.props.tryTagResolve(this.props.login, this.props.tags.currentTag);
    }

    abandon()
    {
        this.props.tryTagClose(this.props.login, this.props.tags.currentTag);
    }

    render() {
        let tag = this.props.tags.currentTag;
        return (
            <View style={styles.login}>
                <HeaderTagDetails {...this.props} headerTitle={"#" + lpad(tag["@id"].substr(tag["@id"].lastIndexOf("/") +1), 6)} />
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
                    <FooterButton {...this.props} active={false} tag={tag} iconName="sticky-note-o" text="Contenu" route={this.props.goToTagDetails}/>
                    <FooterButton {...this.props} active={false} tag={tag} iconName="info" text="Historique" route={this.props.goToTagHistory}/>
                    <FooterButton {...this.props} active={true} tag={tag} iconName="exchange" text="Actions" route={this.props.goToTagAction}/>
                </View>
            </View>
        );
    }
};

function mapStateToProps(state) {
    return {
        login: state.login,
        nav : state.nav,
        tags : state.tags,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(TagActions);